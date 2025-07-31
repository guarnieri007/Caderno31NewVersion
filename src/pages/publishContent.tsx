import { ReactElement, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { z } from 'zod'

import { PublishContentAPI } from '../api/publishContent'
import { Button } from '../component/common/button'
import { CategorySelector } from '../component/common/categorySelector'
import { InputFIeld } from '../component/common/input-field'
import { PostTypeCheckbox } from '../component/common/postTypeCheckbox'
import { UIIcons } from '../component/icons'
import { PublishContentStyle } from '../component/styles/pages/publishContent'
import { Spinner } from '../component/styles/common/common-styles'
import { useUploadFiles } from '../context/UploadFiles'
import { extractMinMaxLengths, publishContentSchemaZOD, validateFormData, categoriesQuantity } from '../helper/zod-helper'
import { ResponseCategory, ResponseLanguage, ResponsePostType } from '../interfaces'
import { UploadArea } from '../component/common/uploadArea'

// Schema do formulário
const publishContentSchema = publishContentSchemaZOD();

// Extract max lengths using schema.innerType.shape.fieldName._def.checks
const maxLengths = extractMinMaxLengths(publishContentSchema);
type PublishContentForm = z.infer<typeof publishContentSchema>; // Inferir o tipo do esquema

function parseJSON<T>(value: FormDataEntryValue | null): T | null {
    if (typeof value !== 'string') return null
    try {
        return JSON.parse(value) as T
    } catch {
        return null
    }
}

function parseOptionalString(value: FormDataEntryValue | null): string | null {
    return typeof value === 'string' && value.trim() !== '' ? value : null
}

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
                const [cats, langs, types] = await Promise.all([
                    ListCategories(),
                    ListLanguage(),
                    ListPostTypes(),
                ])
                if (cats) setCategories(cats)
                if (langs) setLanguages(langs)
                if (types) setPostTypes(types)
            } catch (err) {
                console.error('Failed to fetch publish content data:', err)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function sendForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.currentTarget)
        const filesUploaded = await getCompletedUploads()

        const parsedCategories = parseJSON<ResponseCategory[]>(formData.get('categories'))
        if (formData.get('categories') && !parsedCategories) {
            setErrors({ categories: ['Invalid categories format'] })
            setLoading(false)
            return
        }

        const parsedPostTypes = parseJSON<unknown[]>(formData.get('postTypes')) ?? []
        const price = parseOptionalString(formData.get('price'))

        if (filesUploaded.some(file => file.status === 'error')) {
            setErrors({ description: ['Files with error'] })
        }

        const data = {
            description: parseOptionalString(formData.get('description')),
            postTypes: parsedPostTypes,
            price,
            categories: parsedCategories ?? [],
            files: filesUploaded,
        }
        console.log(data)


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

