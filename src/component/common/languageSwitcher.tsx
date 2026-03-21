import { ReactElement, useEffect, useRef, useState } from 'react';
import { Button } from './button';
import { Language, useLanguage, languages } from '../../context/Language';
import { LanguageSwitcherStyles } from '../styles/common/languageSwitcher-styles';
import { useI18n } from '../../i18n';
import Icon from '../icons/icon';
import { UIIcons } from '../icons';

export const LanguageSwitcher = (): ReactElement => {
  const { language, changeLanguage } = useLanguage();
  const [availableLanguages, setAvailableLanguages] = useState<Map<string, Language>>(new Map());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();

  const HandleChangingLanguage = (lang: string) => {
    setIsOpen(false);
    changeLanguage(lang);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    setAvailableLanguages(languages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <LanguageSwitcherStyles isOpen={isOpen} isHovered={isHovered} ref={dropdownRef}>
      <div className='SelectedLanguage' onClick={() => setIsOpen(!isOpen)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <span className='noSelection'>{languages.get(language)?.flag}</span>
        <span className='noSelection'>{t(`component.common.header.${language}`)}</span>
        <Icon icon={isOpen ? UIIcons.ChevronUp : UIIcons.ChevronDown} size={10} />
      </div>
      <div className='AvailableLanguages'>
        {Array.from(availableLanguages.keys()).map((lang) => (
          language !== lang && (
            <Button color='secondary' key={lang} handleOnClick={() => HandleChangingLanguage(lang)}>
              <div className='Language'>
                <span className='noSelection'>{availableLanguages.get(lang)?.flag}</span>
                <span className='noSelection'>{t(`component.common.header.${lang}`)}</span>
              </div>
            </Button>
          )
        ))}
      </div>
    </LanguageSwitcherStyles>
  );
};
