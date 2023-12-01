import formStyles from "./CreatePostForm.module.css";
import { useSelector } from "react-redux";
import { selectAllPosts } from "../../slicers/selectors";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useCreatePostMutation } from "../../api/api";

function CreatePostForm() {
  const [mutationError, setMutationError] = useState("");
  const postsArr = useSelector(selectAllPosts);
  const [createPost] = useCreatePostMutation();

  const initialValue = {
    title: "",
    content: "",
  };

  const syncPostWithFetch = async (data) => {
    const lastId = postsArr.length > 0 ? postsArr.slice(-1)[0].id : 0;
    const newId = lastId + 1;
    const newPost = {
      id: newId,
      userId: 666,
      body: data.content,
      title: data.title,
    };
    try {
      await createPost(newPost);
    } catch (error) {
      setMutationError(error);
    }
  };

  const validationScheme = Yup.object().shape({
    title: Yup.string().required("Write title!"),
    content: Yup.string().required("Write post content!"),
  });

  return (
    <div className={formStyles.container}>
      <Formik
        initialValues={initialValue}
        validationSchema={validationScheme}
        onSubmit={(values, { resetForm }) => {
          syncPostWithFetch(values).then(() => {
            resetForm();
          });
        }}
      >
        <Form className={formStyles.form}>
          <div className={formStyles.box}>
            <label htmlFor="name" className={formStyles.label}>
              Title:
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              className={formStyles.field}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={formStyles.error}
            />
          </div>

          <div className={formStyles.box}>
            <label htmlFor="name" className={formStyles.label}>
              Content:
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              className={formStyles.field}
            />
            <ErrorMessage
              name="content"
              component="div"
              className={formStyles.error}
            />
          </div>

          <button type="submit" className={formStyles.button}>
            Submit
          </button>
          <div className={formStyles.error}>{mutationError}</div>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePostForm;
