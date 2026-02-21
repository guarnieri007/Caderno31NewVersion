import React, { ReactElement, useEffect, useRef, useState } from "react";
import littleMonkey from "../assets/images/notFound/macaquito.png";
import { useTheme } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { Button } from "../component/common/button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useI18n } from "../i18n";
import Icon from "../component/icons/icon";
import { UIIcons } from "../component/icons";
import { MobileSidebar, PageSearchContainer } from "../component/styles/pages/searchStyle";
import Overlay from "../component/common/overlay";

export const Page_search = (): ReactElement => {
    const navigate = useNavigate();
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

    const toggleMobileSidebar = () => {
        setOpen(() => {
            return !open;
        })
    }

    const closeMobileSidebar = () => {
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
                            <Icon icon={UIIcons.Close} size={35} color="#8f2323" />
                        </div>
                    </div>
                    Mobile options
                    <p>more options</p>
                    <p>more options</p>
                    <p>more options</p>
                    <p>more options</p>
                    <p>more options</p>
                </div>
            </MobileSidebar>
            <PageSearchContainer>
                <div className="filter" onClick={() => toggleMobileSidebar()}>
                    <Icon icon={UIIcons.MeltStudio} size={25} />
                    <span>{t('component.common.filter.title')}</span>
                </div>

            </PageSearchContainer>
        </>
    )
}
