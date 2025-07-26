import { ReactElement, useEffect, useState } from "react"
import { InputFIeld } from "../common/input-field";
import { UIIcons } from "../icons";
import { PublishContentStyle } from "../styles/pages/publishContent";
import { CategorySelector } from "../common/categorySelector";
import { ResponseCategory, ResponseLanguage } from "../../interfaces";
import { z } from "zod";
import { extractMinMaxLengths, validateFormData } from "../../helper/zod-helper";
import { Button } from "../common/button";
import { UploadArea } from "../common/uploadArea";
import { useUploadFiles } from "../../context/UploadFiles";
import { PublishContentAPI } from "../../api/publishContent";
import { Spinner } from "../styles/common/common-styles";

const categorySchema = z.object({
    ds_category: z.string(),      // Nome da categoria
    cd_category: z.string(),      // Código numérico
    translations: z.array(z.object({
        cd_category: z.number(),
        cd_language: z.number(),
        ds_category: z.string(),
    })),
});

const categoriesQuantity = 5;
// Schema do formulário
const publishContentSchema = z.object({
    description: z.string().max(300, "Description is too long"),
    categories: z.array(categorySchema).max(categoriesQuantity, `You must select up to ${categoriesQuantity} categories`).nullable(), // Array de categorias válidas
    price: z.number().max(999999).nullable(),
    files: z.array(z.any()).nullable(), // Array de arquivos
});

// Extract max lengths using schema.innerType.shape.fieldName._def.checks
const maxLengths = extractMinMaxLengths(publishContentSchema);
type PublishContentForm = z.infer<typeof publishContentSchema>; // Inferir o tipo do esquema

export const PublishContent = (): ReactElement => {
    const { getCompletedUploads } = useUploadFiles();
    const { ListCategories, ListLanguage } = PublishContentAPI();

    const [errors, setErrors] = useState<{ [key in keyof PublishContentForm]?: string[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [languages, setLanguages] = useState<ResponseLanguage[]>([]);
    const [categories, setCategories] = useState<ResponseCategory[]>([]);
    //const postTypes = ListPostTypes();

    useEffect(() => {
        async function fetchData() {
            try {
                const cats = await ListCategories();
                if (cats) setCategories(cats);
            } catch (err) {
                console.error('Failed to fetch publish content data:', err);
            }
        }

        async function fetchLanguages() {
            try {
                const langs = await ListLanguage();
                if (langs) setLanguages(langs);
            } catch (err) {
                console.log('Failed to fetch publish content data:', err);
            }
        }


        fetchLanguages();
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function sendForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const filesUploaded = await getCompletedUploads();

        let parsedCategories: ResponseCategory[] = [];
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
            price = Number.isNaN(parseFloat(formData.get("price") as string)) ? 0 : parseFloat(formData.get("price") as string);
        } catch (error) {
            console.error("Failed to parse price:", error);
            setErrors({ price: ["Invalid price format"] });
            setLoading(false);
            return;
        }

        try {
            if (filesUploaded.length > 0) {
                const filesWithError = filesUploaded.filter(file => file.status === "error");
                if (filesWithError.length > 0) {
                    setErrors({ description: ["Files with error"] })
                }
            }
        }

        catch (error) {
            console.error("Failed to parse categories:", error);
        }

        const description = formData.get("description") as string;
        const data = {
            description,
            price: price,
            categories: parsedCategories,
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
                        icon={UIIcons.Key}
                        errors={errors.price}
                        instructions={["Max value 999999 tokens"]}
                    />

                    {(categoriesQuantity > 0 && categories.length > 0 && languages.length > 0 ) ? (

                        <CategorySelector
                            name="categories"
                            max_selection={categoriesQuantity}
                            placeHolder="Select the desired categories"
                            selected_categories={[
                            ] as ResponseCategory[]}
                            all_categories={categories}
                            languages={languages}
                        />
                    ): (
                        <p style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}><Spinner/></p>
                    )}

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