import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { useI18n } from "../i18n";
import Icon from "../component/icons/icon";
import { UIIcons } from "../component/icons";
import { MobileSidebar, PageSearchContainer } from "../component/styles/pages/searchStyle";
import { InputFIeld } from "../component/common/input-field";
import { setRemoveScroll } from "../context/RemoveScrollSingleton";
import { SearchCategoryKey, SearchFilters } from "../api/searchMidias";
import { SearchFilterItem, SearchResults } from "../interfaces/searchFilters.odt";
import { useLanguage } from "../context/Language";
import { Spinner } from "../component/styles/common/common-styles";


export const Page_search = (): ReactElement => {
    //const navigate = useNavigate();

    const theme: DefaultTheme = useTheme();
    const { t } = useI18n();
    const { language } = useLanguage();
    const { fetchFiltersAvailables, /* searchCategoryItems */ } = SearchFilters();

    const [searchTerms, setSearchTerms] = useState<Record<SearchCategoryKey, string>>({
        creators: '',
        languages: '',
        postCategories: '',
        postTypes: '',
    });

    const SECTION_CONFIG: { key: SearchCategoryKey; label: string; inputName: string }[] = [
        { key: 'creators', label: t('component.complex.search.creators'), inputName: 'search-creators' },
        { key: 'postCategories', label: t('component.complex.search.categories'), inputName: 'search-categories' },
        { key: 'languages', label: t('component.complex.search.languages'), inputName: 'search-languages' },
        { key: 'postTypes', label: t('component.complex.search.types'), inputName: 'search-types' },
    ];

    const EMPTY_RESULTS: SearchResults = {
        creators: [],
        languages: [],
        postCategories: [],
        postTypes: [],
    };

    const [categories, setCategories] = useState<SearchResults>(EMPTY_RESULTS);
    const [categoriesFiltered, setCategoriesFiltered] = useState<SearchResults>(EMPTY_RESULTS);
    const [categoriesSelected, setCategoriesSelected] = useState<SearchResults>(EMPTY_RESULTS);
    const [open, setOpen] = useState(false);

    const fetchCategories = async () => {
        const filters = await fetchFiltersAvailables({ lang: language });
        setCategories(filters);
        setCategoriesFiltered(filters);
    };

    useEffect(() => {
        fetchCategories();
    }, [language]);

    useEffect(() => {
        fetchCategories();
    }, []);

    // ref do sidebar
    const sidebarRef = useRef<HTMLDivElement | null>(null);

    // detect click outside + ESC
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            // if click is outside sidebar
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                closeMobileSidebar();
            }
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeMobileSidebar();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [open]);

    const filterCategories = () => {
        setCategoriesFiltered((previous) => {
            const next = { ...previous };
            SECTION_CONFIG.forEach(({ key }) => {
                const query = searchTerms[key].trim().toLowerCase();
                if (!query) {
                    next[key] = categories[key];
                    return;
                }

                next[key] = categories[key].filter((item) =>
                    item.name.toLowerCase().includes(query)
                );
            });
            return next;
        });
    };

    useEffect(() => {
        filterCategories();
        // const timeout = setTimeout(async () => {
        //     const requests = SECTION_CONFIG.map(async ({ key }) => {
        //         const query = searchTerms[key].trim();
        //         if (!query) {
        //             return null;
        //         }

        //         const items = await searchCategoryItems({
        //             category: key,
        //             search: query,
        //             lang: language,
        //         });

        //         return { key, items };
        //     });

        //     const updates = (await Promise.all(requests)).filter(Boolean) as {
        //         key: SearchCategoryKey;
        //         items: SearchFilterItem[];
        //     }[];

        //     if (!updates.length) {
        //         return;
        //     }

        //     setCategories((previous) => {
        //         const next = { ...previous };
        //         updates.forEach(({ key, items }) => {
        //             next[key] = items;
        //         });
        //         return next;
        //     });
        // }, 350);

        //return () => clearTimeout(timeout);

    }, [searchTerms]);

    const openMobileSidebar = async () => {
        setRemoveScroll(true);
        setOpen(true);
    };

    const closeMobileSidebar = () => {
        setRemoveScroll(false);
        setOpen(false);
    };

    const handleSearchChange = (key: SearchCategoryKey) => (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerms((previous) => ({
            ...previous,
            [key]: value,
        }));
    };
    const loadedAllCategories = Object.values(categories).every((items) => items.length > 0);
    const handleOptionToggle = (categoryKey: SearchCategoryKey, item: SearchFilterItem) => {
        setCategoriesSelected((previous) => {
            const isSelected = previous[categoryKey].some((selected) => selected.id === item.id);
            const nextItems = isSelected
                ? previous[categoryKey].filter((selected) => selected.id !== item.id)
                : [...previous[categoryKey], item];

            return {
                ...previous,
                [categoryKey]: nextItems,
            };
        });
    };

    return (
        <>
            {loadedAllCategories ? (
                <>
                    <MobileSidebar $open={open}>
                        <div className="content" ref={sidebarRef}>
                            <div className="sidebarHeader">
                                <div className="titles">
                                    <h2>{t('component.common.filter.search_filters')}</h2>
                                    <p>{t('component.common.filter.search_description')}</p>
                                </div>
                                <div className="closeButton" onClick={() => closeMobileSidebar()}>
                                    <Icon icon={UIIcons.Close} size={35} color={theme.colors.text} />
                                </div>
                            </div>

                            <div className="fieldSelector">
                                {SECTION_CONFIG.map(({ key, label, inputName }) => (
                                    <div className="section" key={key}>
                                        <InputFIeld
                                            icon={UIIcons.MagnifierPlus}
                                            label={label}
                                            name={inputName}
                                            placeholder="search itens"
                                            maxLength={150}
                                            value={searchTerms[key]}
                                            onChange={handleSearchChange(key)}
                                        />
                                        {categoriesFiltered[key].map((item) => (
                                            <div className="optionItem" key={item.id} onClick={() => handleOptionToggle(key, item)}>
                                                <div className="checkBox">
                                                    {categoriesSelected[key].some((selected) => selected.id === item.id) && (
                                                        <Icon icon={UIIcons.Close} size={14} color={theme.colors.text} />
                                                    )}
                                                </div>
                                                <span className="noSelection">{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MobileSidebar>
                    <PageSearchContainer>
                        <div className="filter" onClick={() => openMobileSidebar()}>
                            <Icon icon={UIIcons.Magnifier} size={25} color={theme.colors.button_text} />
                            <span>{t('component.common.filter.title')}</span>
                        </div>

                    </PageSearchContainer>
                </>
            )
                : (
                    <PageSearchContainer>
                        <div className="filter" >
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Spinner />
                            </span>
                        </div>
                    </PageSearchContainer>
                )
            }
        </>
    );
}
