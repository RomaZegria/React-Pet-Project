import DetailsCard from "./UserDetailsCard.module.css";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../slicers/selectors";
import { useMemo } from "react";
import "react-tabs/style/react-tabs.css";

const icons = {
  id: "fa-regular fa-id-card",
  city: "fa-solid fa-city",
  phone: "fa-solid fa-phone",
  website: "fa-solid fa-globe",
  email: "fa-regular fa-envelope",
  company: "fa-solid fa-briefcase",
};

const UserDetailsCard = ({ userId }) => {
  const usersArr = useSelector(selectAllUsers);
  const currentUser = usersArr.find((user) => user.id === +userId);

  const userInfo = useMemo(() => {
    const userData = {
      id: currentUser.id,
      city: currentUser.address.city,
      phone: currentUser.phone,
      website: currentUser.website,
      email: currentUser.email,
      company: currentUser.company.name,
    };

    const mappedUserData = Object.keys(userData).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      icon: icons[key],
      value: userData[key],
    }));

    return mappedUserData;
  }, [currentUser]);

  return (
    <div className={DetailsCard.card}>
      <div>
        <div className={DetailsCard.name}>{currentUser.name}</div>
      </div>
      {userInfo.map((item) => (
        <div className={DetailsCard.field} key={item.label}>
          <div className={DetailsCard.column}>
            <div className={DetailsCard.icon}>
              <i className={item.icon}></i>
            </div>
          </div>
          <div className={DetailsCard.column}>
            <div className={DetailsCard.label}>{item.label}</div>
            <div className={DetailsCard.info}>{item.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDetailsCard;
