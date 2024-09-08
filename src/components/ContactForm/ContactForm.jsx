import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import { nanoid } from "nanoid";
import * as Yup from "yup";

export default function ContactForm ({ onAdd }) {
  const nameId = useId();
  const numberId = useId();

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z ]*$/, "Only letters")
      .min(3, "Too short")
      .max(50, "Too long")
      .required("Required"),
    number: Yup.string()
      .matches(/^[0-9-]*$/, "Invalid format")
      .min(3, "Too short")
      .max(50, "Too long")
      .required("Required"),
  });

  const initialValues = {
    name: "",
    number: "",
    id: "",
  };
  const handleSubmit = (values, actions) => {
    onAdd({
      name: values.name,
      number: values.number,
      id: nanoid(),
    });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.contact_form}>
        <label htmlFor={nameId}>Name</label>
        <Field type="text" name="name" id={nameId} />
        <ErrorMessage
          name="name"
          render={(msg) => <span className={css.contact_error}>{msg}</span>}
        />
        <label htmlFor={numberId}>Number</label>
        <Field type="text" name="number" id={numberId} />
        <ErrorMessage
          name="number"
          render={(msg) => <span className={css.contact_error}>{msg}</span>}
        />
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};
