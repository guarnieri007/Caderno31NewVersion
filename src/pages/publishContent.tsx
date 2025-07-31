import { ReactElement, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { InputFIeld } from "../component/common/input-field";
import { UIIcons } from "../component/icons";
import { PublishContentStyle } from "../component/styles/pages/publishContent";
import { CategorySelector } from "../component/common/categorySelector";
import { ResponseCategory, ResponseLanguage, ResponsePostType } from "../interfaces";
import { z } from "zod";
import { extractMinMaxLengths, publishContentSchemaZOD, validateFormData, categoriesQuantity } from "../helper/zod-helper";
import { Button } from "../component/common/button";
import { UploadArea } from "../component/common/uploadArea";
import { useUploadFiles } from "../context/UploadFiles";
import { PublishContentAPI } from "../api/publishContent";
import { Spinner } from "../component/styles/common/common-styles";
import { PostTypeCheckbox } from "../component/common/postTypeCheckbox";

// Schema do formulário
const publishContentSchema = publishContentSchemaZOD();

// Extract max lengths using schema.innerType.shape.fieldName._def.checks
const maxLengths = extractMinMaxLengths(publishContentSchema);
type PublishContentForm = z.infer<typeof publishContentSchema>; // Inferir o tipo do esquema

export const PublishContent = (): ReactElement => {
    const { getCompletedUploads } = useUploadFiles();
    const { ListCategories, ListLanguage, ListPostTypes } = PublishContentAPI();

    const [errors, setErrors] = useState<{ [key in keyof PublishContentForm]?: string[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [languages, setLanguages] = useState<ResponseLanguage[]>([]);
    const [categories, setCategories] = useState<ResponseCategory[]>([]);
    const [postTypes, setPostTypes] = useState<ResponsePostType[]>([]);
    const [selectedPostTypes, setSelectedPostTypes] = useState<ResponsePostType[]>([]);

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

        async function fetchPostTypes() {
            try {
                const types = await ListPostTypes();
                if (types) setPostTypes(types);
            } catch (err) {
                console.log('Failed to fetch publish content data:', err);
            }
        }

        fetchPostTypes()
        fetchLanguages();
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("postTypes:", postTypes);
    }, [postTypes])

    async function sendForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const filesUploaded = await getCompletedUploads();

        let parsedCategories: ResponseCategory[] = [];
        let price: string | null = null;
        let parsedPostTypes: unknown[] = [];

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
            const raw = formData.get("postTypes");
            if (typeof raw === "string") {
                parsedPostTypes = JSON.parse(raw);
            }
        } catch (error) {
            console.error("Failed to parse post types:", error);
        }

        const priceRaw = formData.get("price");
        if (typeof priceRaw === "string" && priceRaw.trim() !== "") {
            price = priceRaw;
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

        const description = (formData.get("description") as string) || null;
        const data = {
            description,
            postTypes: parsedPostTypes,
            price,
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

                    {(postTypes.length > 0 && languages.length > 0) ? (
                        <PostTypeCheckbox
                            label="Post Type"
                            languages={languages}
                            name="postTypes"
                            options={postTypes}
                            onChange={setSelectedPostTypes}
                            errors={errors.postTypes}

                        />
                    ) :
                        (
                            <p style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}><Spinner /></p>
                        )}

                    <AnimatePresence mode="wait">
                        {selectedPostTypes.some(pt => pt.cd_post_type === 2) && (
                            <motion.div
                                key="price-field"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                style={{ width: '100%' }}
                            >
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
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {(categoriesQuantity > 0 && categories.length > 0 && languages.length > 0) ? (

                        <CategorySelector
                            name="categories"
                            max_selection={categoriesQuantity}
                            placeHolder="Select the desired categories"
                            selected_categories={[
                            ] as ResponseCategory[]}
                            all_categories={categories}
                            languages={languages}
                        />
                    ) : (
                        <p style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}><Spinner /></p>
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