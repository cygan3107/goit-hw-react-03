import css from "./Contact.module.css";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";

export default function Contact ({ name, number, id, onDelete }) {
  return (
    <div className={css.contact_box}>
      <ul className={css.contact_list}>
        <li>
          <IoPerson /> {name}
        </li>
        <li>
          <FaPhone /> {number}
        </li>
      </ul>
      <button
        onClick={() => {
          onDelete(id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
