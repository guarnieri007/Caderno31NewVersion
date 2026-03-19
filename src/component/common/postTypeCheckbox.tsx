import { useEffect, useState } from "react";
import { PostTypeCheckboxStyle } from "../styles/common/postTypeCheckbox";
import { ResponseLanguage, ResponsePostType } from "../../interfaces/interfaces";
import { useLanguage } from "../../context/Language";
import { Label } from "./label";

interface PostTypeCheckboxProps {
  label: string;
  name: string;
  options: ResponsePostType[];
  languages: ResponseLanguage[];
  selectedOptions?: ResponsePostType[];
  inactiveOptionsIds?: number[];
  onChange?: (selected: ResponsePostType[]) => void;
  errors?: string[];
}

export const PostTypeCheckbox = ({
  label,
  name,
  options,
  languages,
  selectedOptions = [],
  inactiveOptionsIds = [],
  onChange,
  errors,
}: PostTypeCheckboxProps) => {
  const { language, getLanguage } = useLanguage();
  const [cdLanguage, setCdLanguage] = useState<number | undefined>(
    languages.find((lang) => lang.ds_language_short === getLanguage())?.cd_language
  );
  const [selected, setSelected] = useState<ResponsePostType[]>(selectedOptions);
  const [inactiveIds, setInactiveIds] = useState<number[]>(inactiveOptionsIds);

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [selected, onChange]);

  useEffect(() => {
    const newLang = languages.find((lang) => lang.ds_language_short === language)?.cd_language;
    if (newLang !== undefined) setCdLanguage(newLang);
  }, [language, languages]);

  useEffect(() => {
    let computed: number[] = [];

    if (selected.some((s) => s.cd_post_type === 1)) {
      computed = [2, 3];
    } else if (
      selected.some((s) => s.cd_post_type === 2) ||
      selected.some((s) => s.cd_post_type === 3)
    ) {
      computed = [1];
    }

    const merged = Array.from(new Set([...inactiveOptionsIds, ...computed]));
    setInactiveIds(merged);
  }, [selected]);

  const toggleOption = (opt: ResponsePostType) => {
    const exists = selected.some((s) => s.cd_post_type === opt.cd_post_type);
    if (exists) {
      setSelected(selected.filter((s) => s.cd_post_type !== opt.cd_post_type));
    } else {
      setSelected([...selected, opt]);
    }
  };


  return (
    <PostTypeCheckboxStyle>
      <input type="hidden" name={name} id={name} value={JSON.stringify(selected)} />
      <Label label={label} counting={false} length={0} maxLength={0} is_focused={false} forInput={name} />
      <div className="options">
        {options.map((opt) => {
          const checked = selected.some((s) => s.cd_post_type === opt.cd_post_type);
          const inactive = inactiveIds.includes(opt.cd_post_type);
          const translation =
            opt.translations.find((t) => t.cd_language === cdLanguage)?.ds_post_type || opt.slug;
          return (
            <label
              key={opt.cd_post_type}
              className={`option ${checked ? "selected" : ""} ${inactive ? "inactive" : ""}`}
            >
              <input
                type="checkbox"
                checked={checked}
                disabled={inactive}
                onChange={() => toggleOption(opt)}
              />
              <span>{translation}</span>
            </label>
          );
        })}
      </div>
      {errors && errors.length > 0 && (

      <div className="errors">
        {errors.map((error, index) => (
          <p key={index}>{error}</p>
        ))}
      </div>
      )}
    </PostTypeCheckboxStyle>
  );
};
