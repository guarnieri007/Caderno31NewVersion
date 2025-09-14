import { FooterContainer } from "../../AppStyled";
import { useI18n } from "../../i18n";

export const Footer = () => {
    const { t } = useI18n();
    return (
        <FooterContainer>
            <div className="footerContainer">
                <div className="footerLeft">
                    <div className="top">
                        <h1>
                            {t('component.common.footer.headline', undefined, 'Your secret is safe with us ;)')}
                        </h1>
                        <p>
                            {t('component.common.footer.tagline', undefined, 'The place you can be yourself')}
                        </p>
                    </div>
                    <div className="bottom">
                        <span>Caderno31 © 2024</span>
                    </div>
                </div>
                <div className="footerRight">
                    <a>{t('component.common.footer.support', undefined, 'Support')}</a>
                    <a>{t('component.common.footer.helpCenter', undefined, 'Help Center')}</a>
                    <a>{t('component.common.footer.assistanceTeam', undefined, 'Assistance Team')}</a>
                    <a>{t('component.common.footer.instruction', undefined, 'Instruction')}</a>
                    <a>{t('component.common.footer.reachOutFor', undefined, 'Reach out for')}</a>
                </div>
            </div>
        </FooterContainer>
    )
}
