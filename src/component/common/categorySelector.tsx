import { useEffect, useRef, useState } from "react";
import { CategorySelectorStyle } from "../styles/common/categorySelector";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../icons/icon";
import { UIIcons } from "../icons";

const categories = ["Tech", "Gaming", "Music", "Books", "Fitness", "Science"];
const MAX_SELECTION = 3;

export const CategorySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openDropdown = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0); // foca no input suavemente
  };

  const handleSelect = (category: string) => {
    if (!selected.includes(category) && selected.length < MAX_SELECTION) {
      setSelected([...selected, category]);
    }
    setIsOpen(false);
    setSearch("");
  };

  const removeCategory = (category: string) => {
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

  const filteredOptions = categories.filter(
    (cat) =>
      cat.toLowerCase().includes(search.toLowerCase()) &&
      !selected.includes(cat)
  );

  return (
    <CategorySelectorStyle>
      <div className="dropdown" ref={dropdownRef}>
        <div className="dropdown-header">
          <input
            type="text"
            ref={inputRef}
            placeholder="Select Categories"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true); // ao digitar, força abrir
            }}
            onFocus={openDropdown}
            disabled={selected.length >= MAX_SELECTION}
          />
          <span
            className={`icon ${selected.length >= MAX_SELECTION ? "disabled" : ""}`}
            onClick={() => {
              if (selected.length < MAX_SELECTION) {
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
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {filteredOptions.map((cat) => (
                <li key={cat} onClick={() => handleSelect(cat)}>
                  {cat}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <div className="chip-container">
        {selected.map((cat) => (
          <div key={cat} className="chip">
            {cat}
            <button onClick={() => removeCategory(cat)}>
              <Icon icon={UIIcons.Backspace} size={14} />
            </button>
          </div>
        ))}
      </div>

      {selected.length >= MAX_SELECTION && (
        <div className="warning">
          You can select up to {MAX_SELECTION} categories.
        </div>
      )}
    </CategorySelectorStyle>
  );
};
