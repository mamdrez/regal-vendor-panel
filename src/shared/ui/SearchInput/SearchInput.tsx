import type { FC } from "react";
import Icon from "../Icon/Icon";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "جستجو...",
}) => (
  <div className={styles.wrapper}>
    <span className={styles.icon}>
      <Icon name="search" size={18} />
    </span>
    <input
      type="search"
      className={styles.input}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export default SearchInput;
