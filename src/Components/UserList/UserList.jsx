import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import userStyles from "./UserList.module.css";
import { selectAllUsers } from "../../slicers/selectors";
import { updateUsers } from "../../slicers/userSlice";
import { useGetUsersListQuery } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const userArr = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: users,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetUsersListQuery();

  useEffect(() => {
    if (isSuccess) dispatch(updateUsers(users));
  }, [isSuccess, dispatch, users]);

  const onClickHandler = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div className={userStyles.container}>
      {isLoading && <div className={userStyles.loader}>Loading...</div>}
      {isError && (
        <div className={userStyles.error}>Error: {error.message}</div>
      )}
      {isSuccess && (
        <Table responsive className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {userArr.map((user) => (
              <tr
                className={userStyles.tableRow}
                key={user.id}
                onClick={() => {
                  onClickHandler(user.id);
                }}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>@{user.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
