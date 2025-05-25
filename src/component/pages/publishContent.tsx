import { ReactElement, useState } from "react"
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { PublishContentStyle } from "../styles/pages/publishContent";
import { CategorySelector } from "../common/categorySelector";
import { CategoryProps } from "../../interfaces";
import { z } from "zod";
import { extractMinMaxLengths, validateFormData } from "../../helper/zod-helper";
import { Button } from "../common/button";
import { UploadArea } from "../common/uploadArea";

const categorySchema = z.object({
    ds_category: z.string(),      // Nome da categoria
    cd_category: z.string(),      // Código numérico
    status: z.string()            // Status (ex: "A")
});

const categoriesQuantity = 5;
// Schema do formulário
const publishContentSchema = z.object({
    description: z.string().max(300, "Description is too long"),
    categories: z.array(categorySchema).max(categoriesQuantity, `You must select up to ${categoriesQuantity} categories`) // Array de categorias válidas
});

// Extract max lengths using schema.innerType.shape.fieldName._def.checks
const maxLengths = extractMinMaxLengths(publishContentSchema);
type PublishContentForm = z.infer<typeof publishContentSchema>; // Inferir o tipo do esquema

export const PublishContent = (): ReactElement => {
    const [errors, setErrors] = useState<{ [key in keyof PublishContentForm]?: string[] }>({});
    const [loading, setLoading] = useState<boolean>(false);

    async function sendForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);

        let parsedCategories: CategoryProps[] = [];

        try {
            const raw = formData.get("categories");
            if (typeof raw === "string") {
                parsedCategories = JSON.parse(raw);
            }
        } catch (error) {
            console.error("Failed to parse categories:", error);
            setErrors({ categories: ["Invalid categories format"] });
            setLoading(false);
            return;
        }

        const data = {
            description: formData.get("description") as string,
            categories: parsedCategories,
        };

        const validation = validateFormData(publishContentSchema, data);

        if (!validation.success) {
            setErrors(validation.errors); // Agora sim
            setLoading(false);
            console.log("Form is not valid", validation.errors)
            return;
        }

        // Se passou na validação
        setErrors({});
        setLoading(false);
        console.log("Form is valid", data);
    }

    return (
        <PublishContentStyle>
            <div className="card_style">
                <h1 className="title_style">Post a new content</h1>
                <form onSubmit={sendForm}>
                    <InputFIeld
                        label="Description"
                        maxLength={maxLengths.description?.max ? maxLengths.description.max : 0}
                        name="description"
                        placeholder="Put here the description of your content"
                        type="text"
                        icon={UIIcons.Book}
                        errors={errors.description}
                    />

                    <CategorySelector
                        name="categories"
                        max_selection={categoriesQuantity}
                        placeHolder="Select the desired categories"
                        selected_categories={[
                            {
                                cd_category: "1",
                                ds_category: "Tech",
                                status: "A"
                            },
                        ] as CategoryProps[]}
                        all_categories={
                            [
                                {
                                    cd_category: "1",
                                    ds_category: "Tech",
                                    status: "A"
                                },
                                {
                                    cd_category: "2",
                                    ds_category: "Religion",
                                    status: "A"
                                },
                                {
                                    cd_category: "3",
                                    ds_category: "Food",
                                    status: "A"
                                },
                                {
                                    cd_category: "4",
                                    ds_category: "Futebol",
                                    status: "A"
                                },
                                {
                                    cd_category: "5",
                                    ds_category: "Dance",
                                    status: "A"
                                },
                                {
                                    cd_category: "6",
                                    ds_category: "Computer",
                                    status: "A"
                                },

                            ].sort((a, b) => a.ds_category.localeCompare(b.ds_category)) as CategoryProps[]}
                    />

                    <UploadArea />

                    <Button
                        color="primary"
                        type="submit"
                        clicable={!loading}
                        loading={loading}
                    >
                        Publish
                    </Button>
                </form>
            </div>

        </PublishContentStyle>
    )
}