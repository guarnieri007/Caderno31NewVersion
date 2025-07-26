import { useEffect, useState } from "react";
import { PostTypeCheckboxStyle } from "../styles/common/postTypeCheckbox";
import { ResponseLanguage, ResponsePostType } from "../../interfaces";
import { useLanguage } from "../../context/Language";
import { Label } from "./label";

interface PostTypeCheckboxProps {
  label: string;
  name: string;
  options: ResponsePostType[];
  languages: ResponseLanguage[];
  selectedOptions?: ResponsePostType[];
  inactiveOptionsIds?: number[];
}

export const PostTypeCheckbox = ({
  label,
  name,
  options,
  languages,
  selectedOptions = [],
  inactiveOptionsIds = [],
}: PostTypeCheckboxProps) => {
  const { language, getLanguage } = useLanguage();
  const [cdLanguage, setCdLanguage] = useState<number | undefined>(
    languages.find((lang) => lang.ds_language_short === getLanguage())?.cd_language
  );
  const [selected, setSelected] = useState<ResponsePostType[]>(selectedOptions);

  useEffect(() => {
    const newLang = languages.find((lang) => lang.ds_language_short === language)?.cd_language;
    if (newLang !== undefined) setCdLanguage(newLang);
  }, [language, languages]);

  useEffect(() => {
    if (selected.length > 0 && selected.find((s) => s.cd_post_type === 1)) {
      if (inactiveOptionsIds.length > 0) inactiveOptionsIds.splice(0, 1)
      inactiveOptionsIds.push(2);
      inactiveOptionsIds.push(3);
    }
    if (selected.length > 0 && (selected.find((s) => s.cd_post_type === 2) || selected.find((s) => s.cd_post_type === 3))) {
      if (inactiveOptionsIds.length > 0) inactiveOptionsIds.splice(0, 1)
      inactiveOptionsIds.push(1);
    }
    console.log("selected options", selected);
    console.log("inactive options", inactiveOptionsIds)
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
          const inactive = inactiveOptionsIds.includes(opt.cd_post_type);
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
    </PostTypeCheckboxStyle>
  );
};
