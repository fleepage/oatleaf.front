import { CircularProgress } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { NavLink } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardTitle,
  FormGroup,
  Modal,
  Row,
} from "reactstrap";
import { AddAccountPermission } from "../../actions/AccountAction";
import { LogoutAction } from "../../actions/AuthAction";
import { Colxx, Separator } from "../../component/common/CustomBootstrap";
import Breadcrumb from "../../component/navs/Breadcrumb";
import { adminRoot, customStyles } from "../../constants/defaultValues";
import { AccountContext } from "../../context/AccountContext";
import { AuthContext } from "../../context/AuthContext";
import { validateAgreed } from "../../helpers/Validator";
import {
  EnableParentService,
  SelectAccountService,
} from "../../services/AuthService";

const ParentSetup = ({ intl, match, to = "home", ...props }) => {
  const authContext = useContext(AuthContext);
  const accountContext = useContext(AccountContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState("/assets/img/utilities/school.png");
  const [agreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("..Loading stage Please wait...");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stage, setStage] = useState(1);
  const [showAgreement, setShowAgreement] = useState(true);
  const [modal, setModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalMessage, setModalmessage] = useState("");
  const [accountId, setAccountId] = useState("");

  const initialValues = {
    agreed,
  };

  const handleSubmit = async (values) => {
    if (values.agreed) {
      setIsLoading(true);
      setMessage("Activating parent account...please wait");
      const response = await EnableParentService({
        token: authContext.auth.data.token,
      });

      if (response) {
        if (response?.status === 200) {
          if (response?.data?.isSuccess) {
            //console.log(response?.data);
            setIsSuccess(true);
            setIsLoading(false);
            setVisible(true);
            setErrorMessage(response?.data?.message ?? "process Completed");
            setAccountId(response?.data?.id);
            setShowAgreement(false);
            setStage(2);
          } else {
            setIsSuccess(false);
            setIsLoading(false);
            setVisible(true);
            setErrorMessage(response?.data?.message ?? "Error Encounter");
          }
        } else {
          setIsSuccess(false);
          setIsLoading(false);
          setVisible(true);
          setErrorMessage(response?.data?.message ?? "Error Encounter");
        }
      } else {
        setIsSuccess(false);
        setIsLoading(false);
        setVisible(true);
        setErrorMessage("Error Encounter");
      }
      //next();
    }
  };

  const FetchAccount = async () => {
    const selectedAccount = await SelectAccountService({
      token: authContext.auth.data.token,
      account: accountId,
    });
    if (selectedAccount) {
      if (selectedAccount?.status == 200) {
        accountContext.dispatch(
          AddAccountPermission({
            permission: selectedAccount?.data?.permissions,
            token: selectedAccount?.data?.token,
          })
        );
        props.history.push(`${adminRoot}/${to}`);
      } else if (selectedAccount?.status == 401) {
        authContext.dispatch(
          LogoutAction({ message: `${btoa("Session has Expired.")}` })
        );
      } else {
        setIsError(true);
        setModalmessage(selectedAccount?.data?.message ?? "Error Encountered");
      }
    } else {
      setIsError(true);
      setModalmessage("Connection Problem!");
    }
  };

  const handleGetStarted = async () => {
    setModal(true);
    setIsError(false);
    await FetchAccount();
  };

  const renderStage = (param) => {
    switch (param) {
      case 1:
        return (
          <div className="text-center">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ errors, touched, values }) => (
                <Form>
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
                  <Button>Enable</Button>
                </Form>
              )}
            </Formik>
          </div>
        );
      case 2:
        return (
          <div className="text-center">
            <p>
              Parent Account has been successfully enabled. Click on get started
              to view your dashboard.
            </p>
            <Button onClick={handleGetStarted}>Get Started</Button>{" "}
          </div>
        );
      default:
        return <div>Default</div>;
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Parent Setup" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative d-none d-md-block mr-5 my-auto text-muted">
              <ul>
                <ili>
                  <h4>&nbsp; Account Setup</h4>
                </ili>
              </ul>
            </div>
            <LoadingOverlay
              active={isLoading}
              spinner
              text={message}
              styles={{
                overlay: (base) => ({
                  ...base,
                  background: "rgba(255, 255, 255, 0.7)",
                }),
                content: (base) => ({
                  ...base,
                  color: "rgba(0, 0, 0, 1)",
                }),
                spinner: (base) => ({
                  ...base,
                  width: "100px",
                  "& svg circle": {
                    stroke: "#3db264",
                  },
                }),
              }}
            >
              <div className="form-side form-side-bordered mx-auto ">
                <NavLink to="/" className="white">
                  <span className="logo-single" />
                </NavLink>
                <CardTitle className="mb-4 text-muted">
                  <Alert
                    color={isSuccess ? "success" : "danger"}
                    className="rounded"
                    isOpen={visible}
                    toggle={() => setVisible(!visible)}
                  >
                    {ErrorMessage}
                  </Alert>
                  <span style={{ display: showAgreement ? "block" : "none" }}>
                    you are registering your school on oatleaf platform, please
                    take your time to read our terms and conditions. you are
                    registering your school on oatleaf platform, please take
                    your time to read our terms and conditions.
                  </span>
                </CardTitle>
                {renderStage(stage)}
              </div>
            </LoadingOverlay>
          </Card>
        </Colxx>
      </Row>
      <Modal
        isOpen={modal}
        //onAfterOpen={afterOpenModal}
        onRequestClose={() => setModal(!modal)}
        style={customStyles}
        preventScroll
        shouldCloseOnOverlayClick={false}
        contentLabel="Loading Account"
      >
        {!isError && (
          <div className="text-center">
            <CircularProgress style={{ color: "#fff" }} />
            <h2 className="white">Loading Account...please wait</h2>
          </div>
        )}
        {isError && (
          <div className="text-center">
            <h2 className="white">{modalMessage}</h2>
            <Button
              color="primary"
              size="xs"
              className="mb-2"
              onClick={() => setModal(!modal)}
            >
              Close
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};
export default ParentSetup;
