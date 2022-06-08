import { Route, Switch } from "react-router";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import UserList from "../components/Users/List/UsersList";
import PostList from "../components/Posts/List/PostsList";
import EditUser from "../components/Users/Edit/EditUser";
import EditProfile from "../components/Users/Edit/EditProfile";
import ChangePassword from "../components/Users/ChangePassword/ChangePassword";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

const routing = (
  
  <Switch>
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/user_list" exact component={UserList} />
      <Route path="/edit_user" exact component={EditUser} />
      <Route path="/edit_profile" exact component={EditProfile} />
      <Route path="/change_password" exact component={ChangePassword} />
      <Route path="/post_list" exact component={PostList} />
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route path="/forgot_password" exact component={ForgotPassword} />
  </Switch>
);

export default routing;