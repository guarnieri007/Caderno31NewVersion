import { z } from "zod";

const categorySchema = z.object({
    cd_category: z.number(),      // Código numérico
}).passthrough();

const postTypeSchema = z.object({
    cd_post_type: z.number(),
}).passthrough();

export const categoriesQuantity = 5;


export function extractMinMaxLengths<T extends z.ZodRawShape>(schema: z.ZodTypeAny) {
    // Se houver refinamentos encadeados, precisamos extrair recursivamente o schema interno
    let realSchema = schema;
    while (realSchema instanceof z.ZodEffects) {
        realSchema = realSchema._def.schema;
    }

    if (!(realSchema instanceof z.ZodObject)) {
        throw new Error("Schema fornecido não é um ZodObject");
    }

    const result: { [K in keyof T]?: { min?: number; max?: number } } = {};

    for (const key in realSchema.shape as Record<keyof T, unknown>) {
        let field = (realSchema.shape as Record<string, z.ZodTypeAny>)[key];

        while (
            field instanceof z.ZodEffects ||
            field instanceof z.ZodOptional ||
            field instanceof z.ZodNullable ||
            field instanceof z.ZodDefault ||
            field instanceof z.ZodCatch
        ) {
            if (field instanceof z.ZodEffects) {
                field = field._def.schema;
            } else {
                field = field._def.innerType;
            }
        }

        if (field instanceof z.ZodString) {
            const checks = field._def.checks as { kind: string; value: number }[];

            const minCheck = checks.find(check => check.kind === 'min');
            const maxCheck = checks.find(check => check.kind === 'max');

            result[key] = {};

            if (minCheck) {
                result[key]!.min = minCheck.value;
            }
            if (maxCheck) {
                result[key]!.max = maxCheck.value;
            }
        }
    }

    return result;
}

export function validateFormData<T extends z.ZodTypeAny>(
    schema: T,
    data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: { [key: string]: string[] } } {

    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    const formattedErrors: { [key: string]: string[] } = {};
    const fieldErrors = result.error.format();

    for (const key in fieldErrors) {
        if (key !== "_errors") {
            const field = fieldErrors[key as keyof typeof fieldErrors];
            if (field && "_errors" in field && Array.isArray(field._errors)) {
                formattedErrors[key] = field._errors;
            }
        }
    }

    return { success: false, errors: formattedErrors };
}

export function publishContentSchemaZOD() {
    const translationSchema = z.object({
        cd_language: z.number(),
        ds_post: z.string().max(300, "Description is too long"),
    })

    return (z.object({
        translations: z.array(translationSchema),
        categories: z.array(categorySchema).max(categoriesQuantity, `You must select up to ${categoriesQuantity} categories`).nullable(),
        postTypes: z.array(postTypeSchema).min(1, "At least one post type is required"),
        price: z.preprocess((val) => {
            if (val === "" || val === undefined || val === null) return null;
            if (typeof val === "number") return val;
            if (typeof val === "string" && /^\d+$/.test(val)) return parseInt(val, 10);
            return NaN;
        }, z.number().int().max(999999).nullable()),
        files: z.array(z.any()).nullable(),
    }).refine((data) => {
        if (data.postTypes.some((pt) => pt.cd_post_type === 2)) {
            return typeof data.price === "number" && !Number.isNaN(data.price);
        }
        return true;
    }, {
        path: ["price"],
        message: "Price is required when paid is selected",
    }).refine((data) => {
        const otherFields = (
            (Array.isArray(data.translations) && data.translations.length > 0) ||
            (Array.isArray(data.files) && data.files.length > 0)
        );
        return otherFields;
    }, {
        path: ["postTypes"],
        message: "Provide at least one additional field besides Post Types and/or Categories",
    }))
}