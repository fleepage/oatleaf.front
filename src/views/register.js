import React, { useState, useContext, useEffect } from "react";
import { LoginService } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { AuthActionSuccess } from "../actions/AuthAction";
import { Link } from "react-router-dom";

import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { NavLink } from "react-router-dom";

import { adminRoot } from "../constants/defaultValues";
import { Colxx } from "../component/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";
import UserLayout from "../layout/UserLayout";

const Register = ({ history, loading, error, loginUserAction, ...props }) => {
  const [email] = useState("demo@gogo.com");
  const [password] = useState("gogo123");
  const [name] = useState("Sarah Kortney");

  const onUserRegister = () => {
    if (email !== "" && password !== "") {
      history.push(adminRoot);
    }
    // call registerUserAction()
  };

  return (
    <UserLayout>
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side d-none d-md-block"></div>
            <div className="form-side">
              <NavLink to="/" className="white">
                <span className="logo-single" />
              </NavLink>

              <CardTitle className="mb-4">
                <IntlMessages id="user.register" />
              </CardTitle>
              <Form>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="user.fullname" />
                  </Label>
                  <Input type="name" defaultValue={name} />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Phone</Label>
                  <Input type="phone" defaultValue={name} />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="user.email" />
                  </Label>
                  <Input type="email" defaultValue={email} />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="user.password" defaultValue={password} />
                  </Label>
                  <Input type="password" />
                </FormGroup>

                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>Confirm Password</Label>
                  <Input type="password" />
                </FormGroup>

                <div className="d-flex justify-content-between align-items-center">
                  <NavLink to="/login">Login Here?</NavLink>
                  <Button
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                    onClick={() => onUserRegister()}
                  >
                    <IntlMessages id="user.register-button" />
                  </Button>
                </div>
              </Form>
            </div>
          </Card>
        </Colxx>
      </Row>
    </UserLayout>
  );
};

export default Register;
