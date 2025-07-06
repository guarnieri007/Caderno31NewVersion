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
import { useUploadFiles } from "../../context/UploadFiles";

const categorySchema = z.object({
    ds_category: z.string(),      // Nome da categoria
    cd_category: z.string(),      // Código numérico
    status: z.string(),           // Status (ex: "A")
    price: z.number(),
});

const categoriesQuantity = 5;
// Schema do formulário
const publishContentSchema = z.object({
    description: z.string().max(300, "Description is too long"),
    categories: z.array(categorySchema).max(categoriesQuantity, `You must select up to ${categoriesQuantity} categories`), // Array de categorias válidas
    price: z.number().max(999999),

});

// Extract max lengths using schema.innerType.shape.fieldName._def.checks
const maxLengths = extractMinMaxLengths(publishContentSchema);
type PublishContentForm = z.infer<typeof publishContentSchema>; // Inferir o tipo do esquema

export const PublishContent = (): ReactElement => {
    const { getCompletedUploads } = useUploadFiles();

    const [errors, setErrors] = useState<{ [key in keyof PublishContentForm]?: string[] }>({});
    const [loading, setLoading] = useState<boolean>(false);

    async function sendForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const filesUploaded = await getCompletedUploads();

        let parsedCategories: CategoryProps[] = [];
        let price: number = 0;

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

        try {
            price = parseFloat(formData.get("price") as string);
        } catch (error) {
            console.error("Failed to parse price:", error);
            setErrors({ price: ["Invalid price format"] });
            setLoading(false);
            return;
        }

        try {
            if(filesUploaded.length > 0) {
                const filesWithError = filesUploaded.filter(file => file.status === "error");
                console.log(filesUploaded);
                if (filesWithError.length > 0) {
                    setErrors({description: ["Files with error"]})
                }
            }            
        }

        catch(error) {
            console.error("Failed to parse categories:", error);
        }

        const data = {
            description: formData.get("description") as string,
            categories: parsedCategories,
            price: price,
            files: filesUploaded,
        };
        console.log(data);


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

                    <InputFIeld
                        label="Price"
                        maxLength={maxLengths.price?.max ? maxLengths.price.max : 0}
                        name="price"
                        placeholder="Tokens"
                        type="number"
                        icon={UIIcons.Lock}
                        errors={errors.price}
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