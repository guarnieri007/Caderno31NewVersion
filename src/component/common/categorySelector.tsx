import { useEffect, useRef, useState } from "react";
import { CategorySelectorStyle } from "../styles/common/categorySelector";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";
import { Label } from "./label";
import { CategorySelectorProps, CategoryProps } from "../../interfaces";

export const CategorySelector = (
  {
    all_categories,
    selected_categories,
    max_selection,
    name,
    placeHolder = "Select Categories"
  }: CategorySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<CategoryProps[]>(selected_categories);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropdown = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0); // foca no input suavemente
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSelect = (category: CategoryProps) => {
    if (!selected.includes(category) && selected.length < max_selection) {
      setSelected([...selected, category]);
    }
    setIsOpen(false);
    setSearch("");
  };

  const removeCategory = (category: CategoryProps) => {
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

  const filteredOptions = all_categories.filter(
    (cat) =>
      cat.ds_category.toLowerCase().includes(search.toLowerCase()) &&
      !selected.some((category) => category.ds_category.toLowerCase() === cat.ds_category.toLowerCase())
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
        <Label
          forInput={name}
          label="Categories"
          is_focused={isOpen}
          maxLength={max_selection}
          length={selected.length}
        />
        <div className="dropdown-header">
          <input
            type="text"
            ref={inputRef}
            placeholder={placeHolder}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true); // ao digitar, força abrir
            }}
            name={name}
            id={name}
            onFocus={openDropdown}
            onBlur={closeDropdown}
            disabled={selected.length >= max_selection}
          />
          <span
            className={`icon ${selected.length >= max_selection ? "disabled" : ""}`}
            onClick={() => {
              if (selected.length < max_selection) {
                setIsOpen((prev) => !prev);
              }
            }}
          >

            <Icon
              icon={isOpen ? UIIcons.ChevronUp : UIIcons.ChevronDown}
              size={16}
            />
          </span>
        </div>

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
                  {cat.ds_category}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="chip-container">
        {selected.map((cat) => (
          <div key={cat.cd_category} className="chip">
            {cat.ds_category}
            <button onMouseDown={() => removeCategory(cat)}>
              <Icon icon={UIIcons.Backspace} size={14} />
            </button>
          </div>
        ))}
      </div>

      {selected.length >= max_selection && (
        <div className="warning">
          You can select up to {max_selection} categories.
        </div>
      )}
    </CategorySelectorStyle>

  );
};
