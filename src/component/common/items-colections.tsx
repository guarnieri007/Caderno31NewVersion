import { ReactElement } from "react";
import { ItemsColectionsProps } from "../../interfaces"
import { Button } from "./button";
import { ItemsColectionsDiv } from "../styles/common/common-styles";
import { useI18n } from "../../i18n";

export const ItemsColections = ({ title, children }: ItemsColectionsProps): ReactElement => {
    const { t } = useI18n();
    return (
        <ItemsColectionsDiv>
            <h2>{title}</h2>
            <div className="collectionContainer">
                {children}
                <div className="containerButton">
                    <Button color="secondary">{t('component.common.items-collections.seeMore', undefined, 'See more')}</Button>
                </div>
            </div>
        </ItemsColectionsDiv>
    )
}
