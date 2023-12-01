import AlbumsCard from "./UserAlbumsCard.module.css";
import { useGetUserAlbumsQuery } from "../../api/api";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const UserAlbumsCard = ({ userId }) => {
  const {
    data: albums,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUserAlbumsQuery(userId);

  return (
    <div className={AlbumsCard.card}>
      {isError && <Alert variant="danger">{error.message}</Alert>}
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isSuccess && (
        <div className={AlbumsCard.column}>
          {albums.map((album) => (
            <div className={AlbumsCard.row} key={album.id}>
              <div className={AlbumsCard.info}>{album.id}.</div>
              <div className={AlbumsCard.note}>{album.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAlbumsCard;
