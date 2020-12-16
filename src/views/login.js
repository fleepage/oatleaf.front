import React, { useState, useContext, useEffect } from "react";
import { LoginService } from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import { AuthActionSuccess } from "../actions/AuthAction";
import { Link } from "react-router-dom";

import { Row, Card, CardTitle, Label, FormGroup, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import { Colxx } from "../component/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";
import UserLayout from "../layout/UserLayout";

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 4) {
    error = "Value must be longer than 3 characters";
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction, ...props }) => {
  const { dispatch, auth } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email] = useState("demo@gogo.com");
  const [isLoading, setisLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (auth !== null) {
      if (auth.isAuth) {
        props.history.push("/app");
      }
    }
  }, [auth, props]);

  const onUserLogin = (values) => {
    if (!loading) {
      if (values.email !== "" && values.password !== "") {
        //loginUserAction(values, history);
        dispatch(
          AuthActionSuccess({
            isAuth: false,
            isError: false,
            data: {},
            session: { role: "User" },
          })
        );
        history.push("/app");
      }
    }
  };

  const initialValues = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    const response = await LoginService({
      email: userName,
      password: password,
    });

    responseDisplay(response);
  };

  const responseDisplay = (response) => {
    setUserName("");
    setPassword("");

    if (typeof response !== "undefined") {
      setisLoading(false);

      if (response.status == 200) {
        dispatch(AuthActionSuccess(response));
        props.history.push("/app");
      } else {
        setisError(true);
        setMessage(response.data.message);
      }
      //redirect
    } else {
      setisLoading(false);

      setisError(true);

      setMessage("Network Error...Kindly check network");
    }
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
                <IntlMessages id="user.login-title" />
              </CardTitle>

              <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        validate={validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field
                        className="form-control"
                        type="password"
                        name="password"
                        validate={validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>

                    <div className="mb-5">
                      <NavLink to="/user/forgot-password">
                        <IntlMessages id="user.forgot-password-question" />
                      </NavLink>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to="/register">Register Here?</NavLink>
                      <Button
                        color="primary"
                        className={`btn-shadow btn-multiple-state ${
                          loading ? "show-spinner" : ""
                        }`}
                        size="lg"
                        onClick={onUserLogin}
                      >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                        <span className="label">
                          <IntlMessages id="user.login-button" />
                        </span>
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Colxx>
      </Row>
    </UserLayout>
  );
};

export default Login;
