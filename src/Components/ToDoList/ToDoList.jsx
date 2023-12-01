import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import todoStyles from "./TodoList.module.css";
import { selectAllTasks } from "../../slicers/selectors";
import { changeState, updateTasks } from "../../slicers/todoSlice";
import classNames from "classnames";
import { useGetTodoListQuery } from "../../api/api";

export default function ToDoList() {
  const tasksArr = useSelector(selectAllTasks);
  const dispatch = useDispatch();
  const {
    data: todos,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTodoListQuery();

  const updateState = (id) => {
    dispatch(changeState(id));
  };

  useEffect(() => {
    if (isSuccess) dispatch(updateTasks(todos));
  }, [dispatch, todos, isSuccess]);

  return (
    <div className={todoStyles.container}>
      {isLoading && <div className={todoStyles.loader}>Loading...</div>}
      {isError && (
        <div className={todoStyles.error}>Error: {error.message}</div>
      )}
      {isSuccess && (
        <ListGroup as="ol" numbered>
          {tasksArr.map((task) => (
            <ListGroup.Item
              as="li"
              key={task.id}
              onClick={() => updateState(task.id)}
              className={classNames(
                todoStyles.list_item,
                task.completed ? todoStyles.completed_note : ""
              )}
            >
              {task.title}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
