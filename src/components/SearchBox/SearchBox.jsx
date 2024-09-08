import css from "./SearchBox.module.css";
import { useId } from "react";

export default function SearchBox ({ value, handleChange }) {
  const searchBoxId = useId();
  return (
    <div className={css.search_box}>
      <label htmlFor={searchBoxId}>Find contacts by name</label>
      <input
        type="text"
        name="search"
        id={searchBoxId}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
