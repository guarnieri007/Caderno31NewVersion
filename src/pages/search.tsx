import { ReactElement, useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { useI18n } from "../i18n";
import Icon from "../component/icons/icon";
import { UIIcons } from "../component/icons";
import { MobileSidebar, PageSearchContainer } from "../component/styles/pages/searchStyle";
import { InputFIeld } from "../component/common/input-field";
import { setRemoveScroll } from "../context/RemoveScrollSingleton";

export const Page_search = (): ReactElement => {
    //const navigate = useNavigate();
    const theme: DefaultTheme = useTheme();
    const { t } = useI18n();

    const [open, setOpen] = useState(false);

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

    const openMobileSidebar = () => {
        setRemoveScroll(true);
        setOpen(true);
    }

    const closeMobileSidebar = () => {
        setRemoveScroll(false);
        setOpen(false);
    }

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
                        <div className="section">
                            <InputFIeld icon={UIIcons.MagnifierPlus} label="Criadores" name="searchField" placeholder="search itens" maxLength={150} />
                            <div className="optionItem">
                                <div className="checkBox" > <Icon icon={UIIcons.Close} size={14} color="red" /> </div>
                                <span>Luara Franca de azevedo silva santos e marina da oliveira malesca de andrade alves marítimo franco</span>
                            </div>

                            <div className="optionItem">
                                <div className="checkBox" > <Icon icon={UIIcons.Close} size={14} color="red" /> </div>
                                <span>Luara Franca de azevedo silva santos e marina da oliveira malesca de andrade alves marítimo franco</span>
                            </div>
                        </div>

                        <div className="section">
                            <InputFIeld icon={UIIcons.MagnifierPlus} label="Categorias" name="searchField" placeholder="search itens" maxLength={150} />
                            <div className="optionItem">
                                <div className="checkBox" > <Icon icon={UIIcons.Close} size={14} color="red" /> </div>
                                <span>Frutas</span>
                            </div>

                            <div className="optionItem">
                                <div className="checkBox" > <Icon icon={UIIcons.Close} size={14} color="red" /> </div>
                                <span>Legumes</span>
                            </div>
                        </div>
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
    )
}
