import React, { FunctionComponent } from "react";
import { ReactComponent as Search } from "../../svg/search.svg";
import styles from "./index.module.css";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchInput: FunctionComponent<SearchInputProps> = ({
  value,
  onChange,
}) => (
  <div className={styles.searchContainer}>
    <div className={styles.icon}>
      <Search />
    </div>
    <input
      type="text"
      className={styles.search}
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
      }}
    />
  </div>
);

export default SearchInput;
