import PostsCard from "./UserPostsCard.module.css";
import { useGetUserPostsQuery } from "../../api/api";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const UserPostsCard = ({ userId }) => {
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUserPostsQuery(userId);

  return (
    <div className={PostsCard.card}>
      {isError && <Alert variant="danger">{error.message}</Alert>}
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isSuccess && (
        <div>
          {posts.map((post) => (
            <div className={PostsCard.post} key={post.id}>
              <div className={PostsCard.title}>{post.title}</div>
              <div className={PostsCard.info}>{post.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPostsCard;
