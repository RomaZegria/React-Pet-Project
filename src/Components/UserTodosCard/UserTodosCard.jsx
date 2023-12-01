import TodosCard from "./UserTodosCard.module.css";
import Form from "react-bootstrap/Form";
import classNames from "classnames";
import { useGetUserTodosQuery } from "../../api/api";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

const UserTodosCard = ({ userId }) => {
  const {
    data: todos,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUserTodosQuery(userId);

  return (
    <div className={TodosCard.card}>
      {isError && <Alert variant="danger">{error.message}</Alert>}
      {isLoading && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {isSuccess && (
        <div>
          {todos.map((todos) => (
            <div className={TodosCard.row} key={todos.id}>
              <div className={TodosCard.info}>{todos.id}.</div>
              <div
                className={classNames(
                  TodosCard.note,
                  todos.completed ? TodosCard.completed_note : ""
                )}
              >
                {todos.title}
              </div>
              <div className={TodosCard.info}>
                <Form.Check
                  type="checkbox"
                  disabled
                  checked={todos.completed}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserTodosCard;
