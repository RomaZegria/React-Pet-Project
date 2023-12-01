import Card from "react-bootstrap/Card";
import postStyles from "./PostList.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "../../slicers/selectors";
import { CreatePostForm } from "../CreatePostForm";
import { useGetPostsListQuery } from "../../api/api";
import { updateStore } from "../../slicers/postSlice";

const PostList = () => {
  const {
    data: posts,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetPostsListQuery();
  const dispatch = useDispatch();
  const postsArr = useSelector(selectAllPosts);

  useEffect(() => {
    if (isSuccess) dispatch(updateStore(posts));
  }, [dispatch, posts, isSuccess]);

  return (
    <div className={postStyles.container}>
      <CreatePostForm />
      {isLoading && <div className={postStyles.loader}>Loading...</div>}
      {isError && (
        <div className={postStyles.error}>Error: {error.message}</div>
      )}
      {isSuccess && (
        <div>
          {postsArr.map((post) => (
            <Card bg="Dark" className="mb-2" key={post.id}>
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
