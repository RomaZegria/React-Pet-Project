import userStyles from "./UserProfile.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { Tab } from "../Tab";
import { Tabs } from "../Tabs";
import "react-tabs/style/react-tabs.css";
import { UserPostsCard } from "../UserPostsCard";
import { UserAlbumsCard } from "../UserAlbumsCard";
import { UserTodosCard } from "../UserTodosCard";
import { UserDetailsCard } from "../UserDetailsCard";

function UserItem() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const onClickBackHandler = () => {
    navigate(-1);
  };

  return (
    <div className={userStyles.container}>
      <Tabs>
        <Tab label="Albums">
          <UserAlbumsCard userId={userId} />
        </Tab>
        <Tab label="ToDo List">
          <UserTodosCard userId={userId} />
        </Tab>
        <Tab label="Posts">
          <UserPostsCard userId={userId} />
        </Tab>
        <Tab label="User Info">
          <UserDetailsCard userId={userId} />
        </Tab>
      </Tabs>
      <button onClick={onClickBackHandler} className={userStyles.button}>
        Back
      </button>
    </div>
  );
}

export default UserItem;
