import { Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import "react-phone-input-2/lib/style.css";
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
import { ClearMessageAction } from "../actions/AuthAction";
import AdvancePhoneInput from "../component/common/AdvancePhoneInput";
import { Colxx } from "../component/common/CustomBootstrap";
import { AuthContext } from "../context/AuthContext";
import IntlMessages from "../helpers/IntlMessages";
import {
  validateAgreed,
  validateConfirmPassword,
  validateEmail,
  validateFName,
  validateLName,
  validatePassword,
  validatePhone,
} from "../helpers/Validator";
import UserLayout from "../layout/UserLayout";
import { RegisterService } from "../services/AuthService";

const Register = ({ history, error, loginUserAction, ...props }) => {
  const authContext = useContext(AuthContext);
  const [email] = useState("");
  const [phone] = useState("");
  const [password] = useState("");
  const [cpassword] = useState("");
  const [firstname] = useState("");
  const [lastname] = useState("");
  const [agreed] = useState(false);
  const [isError, setisError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");

  const initialValues = {
    email,
    phone,
    password,
    cpassword,
    firstname,
    lastname,
    agreed,
  };

  const onUserRegister = async (values) => {
    setisError(false);
    setMessage("");
    if (!loading) {
      if (
        values.email !== "" &&
        values.password !== "" &&
        values.firstname !== "" &&
        values.lastname !== "" &&
        values.phone !== "" &&
        values.agreed
      ) {
        setLoading(true);

        const response = await RegisterService({
          firstname: values.firstname,
          lastname: values.lastname,
          phone: values.phone,
          email: values.email,
          password: values.password,
          passwordConfirmation: values.cpassword,
        });
        //console.log(response);
        setLoading(false);
        setVisible(true);
        if (response != null) {
          if (response?.status == 200) {
            authContext.dispatch(ClearMessageAction({ message: "" }));
            history.push(
              `/login?m=${btoa(
                "Your account has been created. Signin to proceed"
              ).toString()}`
            );
          } else {
            setisError(true);
            setMessage(
              response?.data?.message ||
                response?.data?.title ||
                "Error Encountered"
            );
          }
        } else {
          setisError(true);
          setMessage("Network Error");
        }
        //history.push(adminRoot);
      }
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
              <Formik initialValues={initialValues} onSubmit={onUserRegister}>
                {({ errors, touched, values }) => (
                  <Form>
                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="user.firstname" />
                      </Label>
                      <Field
                        type="name"
                        name="firstname"
                        className="form-control"
                        validate={validateFName}
                      />
                      {errors.firstname && touched.firstname && (
                        <div className="invalid-feedback d-block">
                          {errors.firstname}
                        </div>
                      )}
                    </FormGroup>
                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="user.lastname" />
                      </Label>
                      <Field
                        type="name"
                        name="lastname"
                        className="form-control"
                        validate={validateLName}
                      />
                      {errors.lastname && touched.lastname && (
                        <div className="invalid-feedback d-block">
                          {errors.lastname}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label style={{ zIndex: 5 }}>Phone</Label>
                      <Field
                        name="phone"
                        component={AdvancePhoneInput}
                        validate={validatePhone}
                      />

                      {errors.phone && touched.phone && (
                        <div className="invalid-feedback d-block">
                          {errors.phone}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        validate={validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="user.password" />
                      </Label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        validate={validatePassword}
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>Confirm Password</Label>
                      <Field
                        type="password"
                        name="cpassword"
                        className="form-control"
                        validate={(value) =>
                          validateConfirmPassword(values.password, value)
                        }
                      />
                      {errors.cpassword && touched.cpassword && (
                        <div className="invalid-feedback d-block">
                          {errors.cpassword}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Field
                        type="checkbox"
                        name="agreed"
                        //checked={values.agreed}
                        validate={validateAgreed}
                      />{" "}
                      &nbsp; I Agree to oatleaf terms and conditions.
                      {errors.agreed && touched.agreed && (
                        <div className="invalid-feedback d-block">
                          {errors.agreed}
                        </div>
                      )}
                    </FormGroup>

                    <div className="d-flex justify-content-between align-items-center">
                      <NavLink to="/login">Login Here?</NavLink>
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
                          <IntlMessages id="user.register-button" />
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

export default Register;
