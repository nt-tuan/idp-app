import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Users } from "pages/Users";
import { PrivateUser } from "pages/Private";
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  Classes,
  Alignment,
} from "@blueprintjs/core";

export const AdminLayout = () => {
  return (
    <div>
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>DOMESCO</NavbarHeading>
          <NavbarDivider />
          <Button className={Classes.MINIMAL} icon="people" text="Tài khoản" />
          <Button className={Classes.MINIMAL} text="Chức năng" />
          <Button className={Classes.MINIMAL} text="Nhân viên" />
        </NavbarGroup>
      </Navbar>
      <div className="app-content">
        <Switch>
          <Route path="/admin/private" exact component={PrivateUser} />
          <Route path="/admin/users" exact component={Users} />
        </Switch>
      </div>
    </div>
  );
};
