import { useEffect, useRef, useState } from "react";
import { CategorySelectorStyle } from "../styles/common/categorySelector";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { CategorySelectorProps, ResponseCategory } from "../../interfaces/interfaces";
import { useLanguage } from "../../context/Language";
import { useI18n } from "../../i18n";
import { InputFIeld } from "./input-field";

export const CategorySelector = (
  {
    all_categories,
    selected_categories,
    max_selection,
    name,
    languages,
    placeHolder
  }: CategorySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<ResponseCategory[]>(selected_categories);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language, getLanguage } = useLanguage();
  const [cd_language, setCd_language] = useState<number | undefined>(languages.find((lang) => lang.ds_language_short === getLanguage())?.cd_language);
  const { t } = useI18n();

  const openDropdown = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0); // foca no input suavemente
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSelect = (category: ResponseCategory) => {
    if (!selected.includes(category) && selected.length < max_selection) {
      setSelected([...selected, category]);
    }
    setIsOpen(false);
    setSearch("");
  };

  const removeCategory = (category: ResponseCategory) => {
    setSelected(selected.filter((c) => c !== category));
  };

  // Fecha ao clicar fora ou pressionar Esc
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
    const newLang = languages.find(lang => lang.ds_language_short === language)?.cd_language;
    if (newLang !== undefined) setCd_language(newLang)

  }, [language]);

  const filteredOptions = all_categories.filter(
    (cat) =>
      cat.translations.some(
        (translation) =>
          translation.cd_language === cd_language &&
          translation.ds_category.toLowerCase().includes(search.toLowerCase())
      ) &&
      !selected.some((category) => category.cd_category === cat.cd_category)
  );

  return (
    <CategorySelectorStyle is_focused={isOpen}>
      <input
        type="hidden"
        name={name}
        id={name}
        value={JSON.stringify(selected)}
      />
      <div className="dropdown" ref={dropdownRef}>

        <InputFIeld
          label={t('component.common.categorySelector.label', undefined, 'Categories')}
          name={name}
          maxLength={max_selection}
          placeholder={placeHolder ?? t('component.common.categorySelector.placeholder', undefined, 'Select Categories')}
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true); // ao digitar, força abrir
          }}
          onFocus={openDropdown}
          onBlur={closeDropdown}
          disabled={selected.length >= max_selection}
          icon={UIIcons.ChevronDown}
          labelValue={selected.length}
          value={search}
          restrictMaxLengthByText={false}
        />


        <AnimatePresence>
          {isOpen && filteredOptions.length > 0 && (
            <motion.ul
              className="dropdown-list"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.2 }}
            >
              {filteredOptions.map((cat) => (
                <li key={cat.cd_category} onMouseDown={() => handleSelect(cat)}>
                  {cat.translations.find(translation => translation.cd_language === cd_language)?.ds_category}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="chip-container">
        {selected.map((cat) => (
          <div key={cat.cd_category} className="chip">
            {cat.translations.find(translation => translation.cd_language === cd_language)?.ds_category}
            <button onMouseDown={() => removeCategory(cat)}>
              <Icon icon={UIIcons.Backspace} size={14} />
            </button>
          </div>
        ))}
      </div>

      {selected.length >= max_selection && (
        <div className="warning">
          {t('component.common.categorySelector.maxWarning', { max: `${max_selection}` }, 'You can select up to {max} categories.')}
        </div>
      )}
    </CategorySelectorStyle>

  );
};
