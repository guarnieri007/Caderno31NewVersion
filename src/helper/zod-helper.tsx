import { z } from "zod";


export function extractMinMaxLengths<T extends z.ZodRawShape>(schema: z.ZodTypeAny) {
    // Se for um ZodEffects (por ter .refine() ou .transform()), extrai o schema interno
    const realSchema = (schema instanceof z.ZodEffects) ? schema._def.schema : schema;

    if (!(realSchema instanceof z.ZodObject)) {
        throw new Error("Schema fornecido não é um ZodObject");
    }

    const result: { [K in keyof T]?: { min?: number; max?: number } } = {};

    for (const key in realSchema.shape as Record<keyof T, unknown>) {
        const field = realSchema.shape[key];

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
