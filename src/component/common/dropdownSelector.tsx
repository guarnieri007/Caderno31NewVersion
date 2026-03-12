import { useEffect, useMemo, useRef, useState } from "react";
import { CategorySelectorStyle } from "../styles/common/categorySelector";
import { motion, AnimatePresence } from "framer-motion";
import { UIIcons } from "../icons";
import { DropdownSelectorProps } from "../../interfaces";
import { InputFIeld } from "./input-field";

export const DropdownSelector = <TItem, TValue extends string | number>({
    categories,
    value,
    onChange,
    filterFunction,
    getValue,
    getLabel,
    name,
    placeHolder,
    label,
    cd_language,
}: DropdownSelectorProps<TItem, TValue>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedItem = useMemo(() => {
        if (value === null) return null;
        return categories.find((item) => getValue(item) === value) ?? null;
    }, [value, categories, getValue]);

    const openDropdown = () => {
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const closeDropdown = () => setIsOpen(false);

    const handleSelect = (item: TItem) => {
        const nextValue = getValue(item);
        onChange(nextValue, item);
        setIsOpen(false);
        setSearch("");
    };

    // Close on outside click / Esc
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    const filteredOptions = filterFunction(search, categories, cd_language);

    const inputValue =
        search !== ""
            ? search
            : selectedItem
                ? getLabel(selectedItem, cd_language)
                : "";

    return (
        <CategorySelectorStyle is_focused={isOpen}>
            <input type="hidden" name={name} id={name} value={value ?? ""} />
            <div className="dropdown" ref={dropdownRef}>
                <InputFIeld
                    name={name}
                    placeholder={placeHolder}
                    label={label}
                    onChange={(e) => {
                        if (value !== null) onChange(null, null);
                        setSearch(e.target.value);
                        setIsOpen(true);
                    }}
                    icon={UIIcons.ChevronDown}
                    onFocus={openDropdown}
                    onBlur={closeDropdown}
                    value={search !== "" ? search : inputValue}
                    disabled={false}
                    restrictMaxLengthByText={false}
                    maxLength={1}
                    labelValue={search === "" && value !== null ? 1 : 0}
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
                            {filteredOptions.map((item) => (
                                <li key={String(getValue(item))} onMouseDown={() => handleSelect(item)}>
                                    {getLabel(item, cd_language)}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </CategorySelectorStyle>
    );
};
