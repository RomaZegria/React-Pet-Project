import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppRoutes } from "./config/routes";
import { Navigation } from "./Components/Navigation";
import { PostList } from "./Components/PostList";
import { ToDoList } from "./Components/ToDoList";
import { UserList } from "./Components/UserList";
import { UserProfile } from "./Components/UserProfile";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path={AppRoutes.PostList} element={<PostList />} />
        <Route path={AppRoutes.ToDoList} element={<ToDoList />} />
        <Route path={AppRoutes.Users} element={<UserList />} />
        <Route path={AppRoutes.UserProfile} element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
