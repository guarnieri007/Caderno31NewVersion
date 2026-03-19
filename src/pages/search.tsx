import { ChangeEvent, ReactElement, useEffect, useMemo, useRef, useState } from "react";
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


export const Page_search = (): ReactElement => {
    //const navigate = useNavigate();
    
    const theme: DefaultTheme = useTheme();
    const { t, language } = useI18n();
    const searchFiltersAPI = useMemo(() => SearchFilters(), []);
    const { fetchFiltersAvailables, searchCategoryItems } = searchFiltersAPI;
    
    const [searchTerms, setSearchTerms] = useState<Record<SearchCategoryKey, string>>({
        creators: '',
        languages: '',
        postCategories: '',
        postTypes: '',
    });
    
    const SECTION_CONFIG: { key: SearchCategoryKey; label: string; inputName: string }[] = [
        { key: 'creators', label: 'creators', inputName: 'search-creators' },
        { key: 'postCategories', label: 'categories', inputName: 'search-categories' },
        { key: 'languages', label: 'languages', inputName: 'search-languages' },
        { key: 'postTypes', label: 'types', inputName: 'search-types' },
    ];
    
    const EMPTY_RESULTS: SearchResults = {
        creators: [],
        languages: [],
        postCategories: [],
        postTypes: [],
    };
    
    const [categories, setCategories] = useState<SearchResults>(EMPTY_RESULTS);
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        const fetchCategories = async () => {
            const filters = await fetchFiltersAvailables({ lang: language });
            setCategories(filters);
            console.log('Filters fetched:', filters);
        };
        fetchCategories();
    }, [language]);

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

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const requests = SECTION_CONFIG.map(async ({ key }) => {
                const query = searchTerms[key].trim();
                if (!query) {
                    return null;
                }

                const items = await searchCategoryItems({
                    category: key,
                    search: query,
                    lang: language,
                });

                return { key, items };
            });

            const updates = (await Promise.all(requests)).filter(Boolean) as {
                key: SearchCategoryKey;
                items: SearchFilterItem[];
            }[];

            if (!updates.length) {
                return;
            }

            setCategories((previous) => {
                const next = { ...previous };
                updates.forEach(({ key, items }) => {
                    next[key] = items;
                });
                return next;
            });
        }, 350);

        return () => clearTimeout(timeout);
    }, [searchCategoryItems, searchTerms, language]);

    const visibleSections = useMemo(() => {
        return SECTION_CONFIG.filter(({ key }) => categories[key].length > 0);
    }, [categories]);

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

    return (
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
                        {visibleSections.map(({ key, label, inputName }) => (
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
                                {categories[key].map((item) => (
                                    <div className="optionItem" key={item.id}>
                                        <div className="checkBox"> <Icon icon={UIIcons.Close} size={14} color="red" /> </div>
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </MobileSidebar>
            <PageSearchContainer>
                <div className="filter" onClick={() => openMobileSidebar()}>
                    <Icon icon={UIIcons.MeltStudio} size={25} />
                    <span>{t('component.common.filter.title')}</span>
                </div>

            </PageSearchContainer>
        </>
    );
}
