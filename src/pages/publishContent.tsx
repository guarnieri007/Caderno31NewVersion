import { ReactElement, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { z } from 'zod'

import { PublishContentAPI } from '../api/publishContent'
import { Button } from '../component/common/button'
import { CategorySelector } from '../component/common/categorySelector'
import { InputFIeld } from '../component/common/input-field'
import { PostTypeCheckbox } from '../component/common/postTypeCheckbox'
import Icon from '../component/icons/icon'
import { UIIcons } from '../component/icons'
import { PublishContentStyle } from '../component/styles/pages/publishContent'
import { Spinner } from '../component/styles/common/common-styles'
import { useUploadFiles } from '../context/UploadFiles'
import { extractMinMaxLengths, publishContentSchemaZOD, validateFormData, categoriesQuantity } from '../helper/zod-helper'
import { ResponseCategory, ResponseLanguage, ResponsePostType } from '../interfaces'
import { UploadArea } from '../component/common/uploadArea'
import { useLanguage } from '../context/Language'

// Schema do formulário
const publishContentSchema = publishContentSchemaZOD();

// Extract max lengths using schema.innerType.shape.fieldName._def.checks
const maxLengths = extractMinMaxLengths(publishContentSchema);
const maxDescriptionLength = 300;
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
    const { language } = useLanguage();

    const [errors, setErrors] = useState<{ [key in keyof PublishContentForm]?: string[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [languages, setLanguages] = useState<ResponseLanguage[]>([]);
    const [categories, setCategories] = useState<ResponseCategory[]>([]);
    const [postTypes, setPostTypes] = useState<ResponsePostType[]>([]);
    const [selectedPostTypes, setSelectedPostTypes] = useState<ResponsePostType[]>([]);
    interface DescriptionField { id: number; language: number | null }
    const [descriptionFields, setDescriptionFields] = useState<DescriptionField[]>([]);

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

    useEffect(() => {
        if (languages.length === 0) return
        const currentLang = languages.find(l => l.slug === language)
        setDescriptionFields(prev => {
            if (prev.length === 0) {
                return [{ id: Date.now(), language: currentLang?.cd_language ?? null }]
            }
            return prev.map((field, index) => ({
                ...field,
                language: index === 0 ? currentLang?.cd_language ?? null : null,
            }))
        })
    }, [language, languages])

    const handleLangChange = (index: number, value: string) => {
        setDescriptionFields(fields =>
            fields.map((field, i) => i === index ? { ...field, language: value ? parseInt(value, 10) : null } : field)
        )
    }

    const addDescriptionField = () => {
        const usedLangs = descriptionFields.map(f => f.language).filter((l): l is number => l !== null)
        const available = languages
            .filter(l => !usedLangs.includes(l.cd_language))
            .sort((a, b) => a.ds_language_short.localeCompare(b.ds_language_short))
        if (available.length === 0) return
        setDescriptionFields([...descriptionFields, { id: Date.now(), language: available[0].cd_language }])
    }

    const removeDescriptionField = (index: number) => {
        if (index === 0) return
        setDescriptionFields(fields => fields.filter((_, i) => i !== index))
    }

    const getAvailableLanguages = (index: number) => {
        const selected = descriptionFields
            .map((f, i) => (i === index ? null : f.language))
            .filter((l): l is number => l !== null)
        return languages
            .filter(l => !selected.includes(l.cd_language))
            .sort((a, b) => a.ds_language_short.localeCompare(b.ds_language_short))
    }

    const remainingLangs = languages.filter(l => !descriptionFields.some(df => df.language === l.cd_language))

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
            setErrors({ translations: ['Files with error'] })
        }

        const translations: { cd_language: number; ds_post: string }[] = []
        for (let i = 0; i < descriptionFields.length; i++) {
            const text = parseOptionalString(formData.get(`description-${i}`))
            const langVal = formData.get(`description-lang-${i}`)
            const lang = typeof langVal === 'string' && langVal !== '' ? parseInt(langVal, 10) : null
            if (text && lang !== null) {
                translations.push({ cd_language: lang, ds_post: text })
            } else if (text || lang !== null) {
                setErrors({ translations: ['Language and description must be provided together'] })
                setLoading(false)
                return
            }
        }

        const data = {
            translations,
            postTypes: parsedPostTypes,
            price,
            categories: parsedCategories ?? [],
            files: filesUploaded,
        }
        console.log(data)

        const validation = validateFormData(publishContentSchema, data)

        if (!validation.success) {
            setErrors(validation.errors)
            setLoading(false)
            console.log('Form is not valid', validation.errors)
            return
        }

        // Se passou na validação
        setErrors({})
        setLoading(false)
        console.log('Form is valid', data)
    }

    return (
        <PublishContentStyle>
            <div className="card_style">
                <h1 className="title_style">Post a new content</h1>
                <form onSubmit={sendForm}>
                    <div className='input-descriptions'>
                        <Button
                            type='button'
                            color='secondary'
                            onClick={addDescriptionField}
                            disabled={remainingLangs.length === 0}
                        >
                            Add Lang
                        </Button>
                        <div className='description-inputs'>
                            {descriptionFields.map((field, index) => (
                                <div className='description-item' key={field.id}>
                                    <div className='lang-selector'>
                                        <label htmlFor={`description-lang-${index}`}>Lang</label>
                                        <select
                                            id={`description-lang-${index}`}
                                            name={`description-lang-${index}`}
                                            value={field.language ?? ''}
                                            onChange={(e) => handleLangChange(index, e.target.value)}
                                        >
                                            <option value="" disabled hidden>Select</option>
                                            {getAvailableLanguages(index).map(lang => (
                                                <option key={lang.cd_language} value={lang.cd_language}>{lang.ds_language_short}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='input-item'>
                                        <InputFIeld
                                            label="Description"
                                            maxLength={maxDescriptionLength}
                                            name={`description-${index}`}
                                            placeholder="Put here the description of your content"
                                            type="text"
                                            icon={UIIcons.Book}
                                            errors={errors.translations}
                                        />
                                    </div>
                                    <button
                                        type='button'
                                        className='remove-description'
                                        onClick={() => removeDescriptionField(index)}
                                        disabled={index === 0}
                                    >
                                        <Icon icon={UIIcons.Trash} size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

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

