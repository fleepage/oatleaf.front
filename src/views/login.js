import { Field, Form, Formik } from "formik";
import queryString from "query-string";
import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardTitle,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { AuthActionSuccess } from "../actions/AuthAction";
import { Colxx } from "../component/common/CustomBootstrap";
import { AuthContext } from "../context/AuthContext";
import IntlMessages from "../helpers/IntlMessages";
import UserLayout from "../layout/UserLayout";
import { LoginService } from "../services/AuthService";

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
  if (!value) error = "Please enter your username";

  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //   error = "Invalid email address";
  // }
  return error;
};

const Login = ({ history, ...props }) => {
  const { dispatch, auth } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setisError] = useState(false);
  const [message, setMessage] = useState("");
  const [information, setInformation] = useState(
    atob((queryString.parse(props.location.search).m ?? "").toString()) ?? ""
  );
  const [visible, setVisible] = useState(true);

  const initialValues = { email, password };

  useEffect(() => {
    if (auth !== null) {
      if (auth.isAuth) {
        history.push("/app");
      }
      if (auth?.message !== "")
        setInformation(auth?.message !== "" ? atob(auth?.message ?? "") : "");
    }
  }, [auth, props]);

  const onUserLogin = async (values) => {
    setisError(false);
    setMessage("");
    if (!loading) {
      if (values.email !== "" && values.password !== "") {
        setLoading(true);
        const response = await LoginService({
          email: values.email,
          password: values.password,
        });
        setLoading(false);
        setVisible(true);
        if (response != null) {
          if (response?.status == 200) {
            dispatch(
              AuthActionSuccess({
                data: {
                  token: response?.data?.token ?? "",
                },
                session: { role: "User" },
                message: "",
              })
            );
            if (response?.data?.tempPassword == null) history.push("/app");
            else history.push("/password");
          } else {
            setisError(true);
            setMessage(response?.data?.message ?? "");
          }
        } else {
          setisError(true);
          setMessage("Network Error");
        }
      }
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
                {!isError && information !== "" && (
                  <Alert
                    color="info"
                    className="rounded"
                    isOpen={visible}
                    toggle={() => setVisible(!visible)}
                  >
                    {information}
                  </Alert>
                )}
                {isError && (
                  <Alert
                    color="danger"
                    className="rounded"
                    isOpen={visible}
                    toggle={() => setVisible(!visible)}
                  >
                    {message}
                  </Alert>
                )}
              </CardTitle>

              <Formik initialValues={initialValues} onSubmit={onUserLogin}>
                {({ errors, touched }) => (
                  <Form className="av-tooltip tooltip-label-bottom">
                    <FormGroup className="form-group has-float-label">
                      <Label>
                        <IntlMessages id="user.username" />
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
                        type="submit"
                        //onClick={onUserLogin}
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
