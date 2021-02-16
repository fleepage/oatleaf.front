import CheckIcon from "@material-ui/icons/Check";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Field, Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import LoadingOverlay from "react-loading-overlay";
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
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import { ClearCurrentSchool } from "../../actions/AccountAction";
import ClassSetupCard from "../../component/cards/ClassSetupCard";
import AdvancePhoneInput from "../../component/common/AdvancePhoneInput";
import { Colxx, Separator } from "../../component/common/CustomBootstrap";
import ImageCropper from "../../component/common/ImageCropper";
import Breadcrumb from "../../component/navs/Breadcrumb";
import { AccountContext } from "../../context/AccountContext";
import { AuthContext } from "../../context/AuthContext";
import IntlMessages from "../../helpers/IntlMessages";
import {
  validateAddress,
  validateAgreed,
  validateCountry,
  validateIdentifier,
  validateName,
  validatePhone,
  validateRegion,
  validateTerm,
  validateValuelessDesc,
  validateValuelessEmail,
  validateValuelessName,
} from "../../helpers/Validator";
import {
  LogoUploadService,
  MakeCalenderService,
  RegisterSchoolService,
  VerifyIdentifierService,
} from "../../services/SchoolService";
const SchoolSetup = ({
  intl,
  match,
  school = 0,
  setup = 0,
  percentage = 0,
  ...props
}) => {
  const authContext = useContext(AuthContext);
  const accountContext = useContext(AccountContext);
  const percent =
    (accountContext.account &&
      accountContext.account.school &&
      accountContext.account.school.percentage) ||
    0;
  const scid =
    (accountContext.account &&
      accountContext.account.school &&
      accountContext.account.school.id) ||
    0;
  const sid =
    (accountContext.account &&
      accountContext.account.school &&
      accountContext.account.school.setupId) ||
    0;
  const [stage, setStage] = useState(
    percent === 0
      ? 1
      : percent === 40
      ? 2
      : percent === 70
      ? 3
      : percent === 80
      ? 4
      : 1
  );
  const [name, setName] = useState("");
  const [image, setImage] = useState("/assets/img/utilities/school.png");
  const [schoolId, setSchoolId] = useState(scid);
  const [setupId, setSetupId] = useState(sid);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("..Loading stage Please wait...");
  const [ErrorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    accountContext.dispatch(ClearCurrentSchool());
    // console.log(accountContext ?? []);
    // console.log(percent);
    // console.log(scid);
    // console.log(sid);
  }, []);
  const Next = () => {
    setStage(stage + 1);
    //console.log(stage);
  };

  const renderStage = (param) => {
    switch (param) {
      case 1:
        return (
          <Registration
            next={Next}
            setLoader={setIsLoading}
            setMessager={setMessage}
            setError={setErrorMessage}
            setVisibled={setVisible}
            isSuccess={setIsSuccess}
            token={authContext.auth.data.token}
            setSchoolId={setSchoolId}
            setSetupId={setSetupId}
            namer={setName}
            {...props}
          />
        );
      case 2:
        return (
          <ClassSetup
            next={Next}
            setLoader={setIsLoading}
            setMessager={setMessage}
            setError={setErrorMessage}
            setVisibled={setVisible}
            isSuccess={setIsSuccess}
            token={authContext.auth.data.token}
            school={schoolId}
            setup={setupId}
            {...props}
          />
        );
      case 3:
        return (
          <SetupCalender
            next={Next}
            setLoader={setIsLoading}
            setMessager={setMessage}
            setError={setErrorMessage}
            setVisibled={setVisible}
            isSuccess={setIsSuccess}
            token={authContext.auth.data.token}
            school={schoolId}
            setup={setupId}
            {...props}
          />
        );
      case 4:
        return (
          <WrapUp
            next={Next}
            setLoader={setIsLoading}
            setMessager={setMessage}
            setError={setErrorMessage}
            setVisibled={setVisible}
            isSuccess={setIsSuccess}
            token={authContext.auth.data.token}
            school={schoolId}
            setup={setupId}
            imager={setImage}
            {...props}
          />
        );
      case 5:
        return (
          <GetStarted
            next={Next}
            setLoader={setIsLoading}
            setMessager={setMessage}
            setError={setErrorMessage}
            setVisibled={setVisible}
            isSuccess={setIsSuccess}
            croppedImage={image}
            name={name}
            {...props}
          />
        );
      default:
        return <div>Default</div>;
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Setup School" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      <Row>
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative d-none d-md-block mr-5 my-auto text-muted">
              <ul>
                <ili>
                  <h4>
                    {stage == 1 && (
                      <>
                        <MoreHorizIcon style={{ color: "#fad201" }} />
                        {/* <CheckIcon style={{ color: "#3db264" }} /> */}
                      </>
                    )}
                    {stage > 1 && (
                      <>
                        <CheckIcon style={{ color: "#3db264" }} />
                      </>
                    )}
                    &nbsp; Registration
                  </h4>
                </ili>
                <ili>&nbsp;</ili>
                <ili>
                  <h4>
                    {stage == 2 && (
                      <>
                        <MoreHorizIcon style={{ color: "#fad201" }} />
                        {/* <CheckIcon style={{ color: "#3db264" }} /> */}
                      </>
                    )}
                    {stage > 2 && (
                      <>
                        <CheckIcon style={{ color: "#3db264" }} />
                      </>
                    )}
                    &nbsp; Class Setup
                  </h4>
                </ili>
                <ili>&nbsp;</ili>
                <ili>
                  <h4>
                    {stage == 3 && (
                      <>
                        <MoreHorizIcon style={{ color: "#fad201" }} />
                        {/* <CheckIcon style={{ color: "#3db264" }} /> */}
                      </>
                    )}
                    {stage > 3 && (
                      <>
                        <CheckIcon style={{ color: "#3db264" }} />
                      </>
                    )}
                    &nbsp; Calender Setup
                  </h4>
                </ili>
                <ili>&nbsp;</ili>
                <ili>
                  <h4>
                    {stage == 4 && (
                      <>
                        <MoreHorizIcon style={{ color: "#fad201" }} />
                      </>
                    )}
                    {stage > 4 && (
                      <>
                        <CheckIcon style={{ color: "#3db264" }} />
                      </>
                    )}
                    &nbsp; Wrap Up
                  </h4>
                </ili>
                <ili>&nbsp;</ili>
                <ili>
                  <h4>
                    {stage == 5 && (
                      <>
                        <MoreHorizIcon style={{ color: "#fad201" }} />
                      </>
                    )}
                    {stage > 5 && (
                      <>
                        <CheckIcon style={{ color: "#3db264" }} />
                      </>
                    )}
                    &nbsp; Get Started
                  </h4>
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
                  <span>
                    you are registering your school on oatleaf platform, please
                    take your time to read our terms and conditions.
                  </span>
                </CardTitle>
                {renderStage(stage)}
              </div>
            </LoadingOverlay>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};
export default SchoolSetup;

const Registration = ({
  intl,
  match,
  next,
  setLoader,
  setMessager,
  setError,
  setVisibled,
  isSuccess,
  token,
  setSchoolId,
  setSetupId,
  namer,
  ...props
}) => {
  const [email] = useState("");
  const [founder] = useState("");
  const [foundedAt] = useState("");
  const [phone] = useState("");
  const [addreess] = useState("");
  const [description] = useState("");
  const [name] = useState("");
  const [identifier] = useState("");
  const [agreed] = useState(false);
  const [fullForm, setFullForm] = useState(false);
  const [isError, setisError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("NG");
  const [region, setRegion] = useState("");
  const [isTaken, setIsTaken] = useState(0);
  const [identifierMessage, setIdentifierMessage] = useState("");
  const [_color, set_Color] = useState("#f1961d");

  const initialValues = {
    email,
    phone,
    addreess,
    description,
    name,
    country,
    region,
    identifier,
    founder,
    foundedAt,
    agreed,
  };

  const handleSubmit = async (values) => {
    if (
      values.phone !== "" &&
      values.identifier !== "" &&
      values.name !== "" &&
      values.addreess !== "" &&
      values.country !== "" &&
      values.region !== ""
    ) {
      setLoader(true);
      setMessager("Registering school...please wait");
      const response = await RegisterSchoolService({
        name: values.name,
        identifier: values.identifier.target.value,
        email: values.email,
        phone: values.phone,
        addreess: values.addreess,
        country: values.country,
        region: values.region,
        foundedAt: values.foundedAt,
        founder: values.founder,
        description: values.description,
        token: token,
      });

      if (response) {
        if (response?.status === 200) {
          if (response?.data?.isSuccess) {
            //console.log(response?.data);
            isSuccess(true);
            setLoader(false);
            setVisibled(true);
            setError(response?.data?.message ?? "process Completed");
            setSchoolId(response?.data?.schoolId);
            setSetupId(response?.data?.setupId);
            namer(values.name);
            next();
          } else {
            isSuccess(false);
            setLoader(false);
            setVisibled(true);
            setError(response?.data?.message ?? "Error Encounter");
          }
        } else {
          isSuccess(false);
          setLoader(false);
          setVisibled(true);
          setError(response?.data?.message ?? "Error Encounter");
        }
      } else {
        isSuccess(false);
        setLoader(false);
        setVisibled(true);
        setError("Error Encounter");
      }
      //next();
    }
  };

  const selectCountry = (val) => {
    setCountry(val);
  };

  const selectRegion = (val) => {
    setRegion(val);
  };

  const handleIdentifierCheck = async (value) => {
    if (value.target.value.length > 3 && value.target.value.length < 6) {
      setIsTaken(2);
      setIdentifierMessage("checking identifier...");
      var response = await VerifyIdentifierService({
        identifier: value.target.value,
        token: token,
      });
      if (response) {
        //console.log(response);
        if (response?.status == 200) {
          if (response?.data?.isExisting) {
            setIsTaken(2);
            set_Color("#f00");
          } else {
            setIsTaken(1);
            set_Color("green");
          }
          setIdentifierMessage(response?.data?.message);
        } else {
          setIsTaken(5);
          setIdentifierMessage(response?.data?.message);
        }
      } else {
        set_Color("#f1961d");
        setIsTaken(4);
        setIdentifierMessage("error encountered while checking identifier...");
      }
    } else {
      set_Color("#f1961d");
      setIsTaken(0);
      setIdentifierMessage("character Length must be between 3 and 5");
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, touched, values }) => (
          <Form>
            <FormGroup className="form-group has-float-label  mb-4">
              <Label>
                <IntlMessages id="school.name" />
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Field
                type="name"
                name="name"
                className="form-control"
                validate={validateName}
              />
              {errors.name && touched.name && (
                <div className="invalid-feedback d-block">{errors.name}</div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label  mb-4">
              <Label>
                <IntlMessages id="school.identifier" />
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Field
                type="name"
                name="identifier"
                className="form-control"
                validate={(value) => validateIdentifier(value, isTaken)}
              >
                {({ field, form, meta }) => (
                  <input
                    type="text"
                    className="form-control"
                    onChange={(value) => {
                      form.setFieldValue("identifier", value);
                      handleIdentifierCheck(value);
                    }}
                  />
                )}
              </Field>

              {errors.identifier && touched.identifier && (
                <div
                  className="invalid-feedback d-block"
                  style={{ zIndex: 10 }}
                >
                  {errors.identifier}
                </div>
              )}
              <p className="validateAsync" style={{ color: _color }}>
                {identifierMessage}
              </p>
            </FormGroup>

            <FormGroup className="form-group has-float-label  mb-4">
              <Label style={{ zIndex: 5 }}>
                <IntlMessages id="school.phone" />
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Field
                name="phone"
                component={AdvancePhoneInput}
                validate={validatePhone}
              />

              {errors.phone && touched.phone && (
                <div className="invalid-feedback d-block">{errors.phone}</div>
              )}
            </FormGroup>

            <FormGroup className="form-group has-float-label  mb-4">
              <Label>
                <IntlMessages id="school.address" />
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Field
                type="name"
                name="addreess"
                className="form-control"
                validate={validateAddress}
              />
              {errors.addreess && touched.addreess && (
                <div className="invalid-feedback d-block">
                  {errors.addreess}
                </div>
              )}
            </FormGroup>

            <FormGroup className="form-group has-float-label  mb-4">
              <Label>
                <IntlMessages id="school.country" />
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Field name="country" validate={validateCountry}>
                {({ field, form, meta }) => (
                  <CountryDropdown
                    value={country}
                    valueType={"short"}
                    className="form-control"
                    onChange={(val) => {
                      form.setFieldValue("country", val);
                      selectCountry(val);
                    }}
                  />
                )}
              </Field>
              {errors.country && touched.country && (
                <div className="invalid-feedback d-block">{errors.country}</div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label  mb-4">
              <Label>
                <IntlMessages id="school.region" />
                <span style={{ color: "red" }}>*</span>
              </Label>
              <Field name="region" validate={validateRegion}>
                {({ field, form, meta }) => (
                  <RegionDropdown
                    className="form-control"
                    country={country}
                    countryValueType="short"
                    value={region}
                    onChange={(val) => {
                      form.setFieldValue("region", val);
                      selectRegion(val);
                    }}
                  />
                )}
              </Field>
              {errors.region && touched.region && (
                <div className="invalid-feedback d-block">{errors.region}</div>
              )}
            </FormGroup>

            {fullForm && (
              <>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="school.email" />
                  </Label>
                  <Field
                    type="email"
                    name="email"
                    className="form-control"
                    validate={validateValuelessEmail}
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </FormGroup>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="school.founder" />
                  </Label>
                  <Field
                    type="name"
                    name="founder"
                    className="form-control"
                    validate={validateValuelessName}
                  />
                  {errors.founder && touched.founder && (
                    <div className="invalid-feedback d-block">
                      {errors.founder}
                    </div>
                  )}
                </FormGroup>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="school.foundedat" />
                  </Label>
                  <Field
                    type="date"
                    name="foundedAt"
                    className="form-control"
                    //validate={validateFName}
                  />
                  {errors.foundedAt && touched.foundedAt && (
                    <div className="invalid-feedback d-block">
                      {errors.foundedAt}
                    </div>
                  )}
                </FormGroup>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="school.description" />
                  </Label>
                  <Field
                    component="textarea"
                    name="description"
                    className="form-control"
                    rows="5"
                    validate={validateValuelessDesc}
                  />
                  {errors.description && touched.description && (
                    <div className="invalid-feedback d-block">
                      {errors.description}
                    </div>
                  )}
                </FormGroup>
              </>
            )}

            <FormGroup className="form-group has-float-label  mb-4">
              <Field
                type="checkbox"
                name="agreed"
                //checked={values.agreed}
                validate={validateAgreed}
              />{" "}
              &nbsp; I Agree to oatleaf terms and conditions.
              {errors.agreed && touched.agreed && (
                <div className="invalid-feedback d-block">{errors.agreed}</div>
              )}
            </FormGroup>

            <div className="d-flex justify-content-between align-items-center">
              <Button
                color="primary"
                size="xxs"
                outline
                onClick={() => setFullForm(!fullForm)}
              >
                <span className="label">
                  {!fullForm && <IntlMessages id="school.completeForm" />}
                  {fullForm && <IntlMessages id="school.shortForm" />}
                </span>
              </Button>
              <Button
                color="primary"
                className={`btn-shadow btn-multiple-state ${
                  loading ? "show-spinner" : ""
                }`}
                size="lg"
                type="submit"
                // onClick={() => setFullForm(!fullForm)}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="school.register" />
                </span>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

const ClassSetup = ({
  intl,
  match,
  next,
  setLoader,
  setMessager,
  setError,
  setVisibled,
  isSuccess,
  token,
  school,
  setup,
  ...props
}) => {
  // useEffect(() => {
  //   console.log(`${setup} ${school}`);
  // }, []);

  const pricesData = [
    {
      icon: "iconsminds-male",
      title: "Default",
      price: "$11",
      detail:
        "Editable predefined template. Hover on each item to carry out further action",
      link: "#",
      features: [
        {
          groupName: "Nursery",
          classCategorys: [
            { stage: 1, classCategoryItems: [{ stage: "A" }] },
            { stage: 2, classCategoryItems: [{ stage: "A" }] },
            { stage: 3, classCategoryItems: [{ stage: "A" }] },
          ],
        },
        {
          groupName: "Primary",
          classCategorys: [
            { stage: 1, classCategoryItems: [{ stage: "A" }] },
            { stage: 2, classCategoryItems: [{ stage: "A" }] },
            { stage: 3, classCategoryItems: [{ stage: "A" }] },
            { stage: 4, classCategoryItems: [{ stage: "A" }] },
            { stage: 5, classCategoryItems: [{ stage: "A" }] },
            { stage: 6, classCategoryItems: [{ stage: "A" }] },
          ],
        },
        {
          groupName: "JSS",
          classCategorys: [
            { stage: 1, classCategoryItems: [{ stage: "A" }] },
            { stage: 2, classCategoryItems: [{ stage: "A" }] },
            { stage: 3, classCategoryItems: [{ stage: "A" }] },
          ],
        },
        {
          groupName: "SSS",
          classCategorys: [
            { stage: 1, classCategoryItems: [{ stage: "A" }] },
            { stage: 2, classCategoryItems: [{ stage: "A" }] },
            { stage: 3, classCategoryItems: [{ stage: "A" }] },
          ],
        },
      ],
    },
    {
      icon: "iconsminds-male-female",
      title: "Custom",
      price: "$17",
      detail: "Create you own custom class system",
      link: "#",
      features: [],
    },
  ];

  const handleUseTemplate = () => {
    next();
  };
  return (
    <div>
      <Row className="equal-height-container mb-5 ">
        <Colxx xxs="12">
          <CardTitle>
            <IntlMessages id="school.classSetup" />
          </CardTitle>
        </Colxx>
        {pricesData.map((item, index) => {
          return (
            <Colxx
              md="12"
              lg="6"
              className="col-item mb-4"
              key={`priceCard_${index}`}
            >
              <ClassSetupCard
                data={item}
                next={next}
                setLoader={setLoader}
                setMessager={setMessager}
                setError={setError}
                setVisibled={setVisibled}
                isSuccess={isSuccess}
                token={token}
                schoolId={school}
                setupId={setup}
              />
            </Colxx>
          );
        })}
      </Row>{" "}
    </div>
  );
};

const SetupCalender = ({
  intl,
  next,
  setLoader,
  setMessager,
  setError,
  setVisibled,
  isSuccess,
  token,
  school,
  setup,
  ...props
}) => {
  const [startYear] = useState(new Date().getFullYear() - 1 + "");
  const [endYear] = useState(new Date().getFullYear() + "");
  const [term] = useState("");
  const [syear] = useState(new Date().getFullYear() - 1);
  const [eyear] = useState(new Date().getFullYear());

  const initialValues = {
    startYear,
    endYear,
    term,
  };

  const handleCalenderStup = async (values) => {
    setLoader(true);
    setMessager("Adding Academic Calender...please wait");
    const response = await MakeCalenderService({
      data: {
        sessionDto: {
          setupId: setup,
          schoolId: school,
          startYear: values.startYear,
          endYear: values.endYear,
          isActive: true,
          term: {
            setupId: setup,
            sessionId: 0,
            name:
              values.term === "1"
                ? "First Term"
                : values.term === "2"
                ? "Second Term"
                : "Third Term",
            label: eval(values.term),
            isActive: true,
          },
        },
      },
      token: token,
    });
    if (response) {
      if (response?.status === 200) {
        if (response?.data?.isSuccess) {
          //console.log(response?.data);
          isSuccess(true);
          setLoader(false);
          setVisibled(true);
          setError(response?.data?.message ?? "process Completed");

          next();
        } else {
          isSuccess(false);
          setLoader(false);
          setVisibled(true);
          setError(response?.data?.message ?? "Error Encounter");
        }
      } else {
        isSuccess(false);
        setLoader(false);
        setVisibled(true);
        setError(response?.data?.message ?? "Error Encounter");
      }
    } else {
      isSuccess(false);
      setLoader(false);
      setVisibled(true);
      setError("Error Encounter");
    }
  };

  return (
    <div>
      <Row className=" mb-5 text-center">
        <Colxx xxs="12">
          <CardTitle className="text-muted">
            <IntlMessages id="school.calenderSetup" />
          </CardTitle>
        </Colxx>
        <Colxx md="12" lg="12" className="col-item mb-4 ">
          <Formik initialValues={initialValues} onSubmit={handleCalenderStup}>
            {({ errors, touched, values }) => (
              <Form>
                <Row className="text-center">
                  <Colxx xxs="6">
                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="school.startCalender" />
                      </Label>
                      <Field
                        as="select"
                        name="startYear"
                        className="form-control"
                        //validate={validateFName}
                      >
                        {Array.from(new Array(50), (v, i) => (
                          <option key={i} value={syear + i}>
                            {syear + i}
                          </option>
                        ))}
                      </Field>
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="6">
                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="school.endCalendr" />
                      </Label>
                      <Field
                        as="select"
                        name="endYear"
                        className="form-control"
                        //validate={validateFName}
                      >
                        {Array.from(new Array(50), (v, i) => (
                          <option key={i} value={eyear + i}>
                            {eyear + i}
                          </option>
                        ))}
                      </Field>
                    </FormGroup>
                  </Colxx>
                </Row>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="school.currentTerm" />
                  </Label>
                  <Field
                    as="select"
                    name="term"
                    className="form-control"
                    validate={validateTerm}
                  >
                    <option>Select Current Term</option>
                    <option value={1}>First Term</option>
                    <option value={2}>Second Term</option>
                    <option value={3}>Third Term</option>
                  </Field>
                  {errors.term && touched.term && (
                    <div className="invalid-feedback d-block">
                      {errors.term}
                    </div>
                  )}
                </FormGroup>
                <div className="align-items-center">
                  <Button
                    color="primary"
                    type="submit"
                    //onClick={() => setCategoryModal(false)}
                  >
                    Submit
                  </Button>
                </div>{" "}
              </Form>
            )}
          </Formik>
        </Colxx>
      </Row>{" "}
    </div>
  );
};

const WrapUp = ({
  intl,
  next,
  setLoader,
  setMessager,
  setError,
  setVisibled,
  isSuccess,
  token,
  school,
  setup,
  imager,
  ...props
}) => {
  const [croppedImage, setCroppedImage] = useState(
    "/assets/img/utilities/school.png"
  );
  const [file, setFile] = useState();
  const [blob, setBlob] = useState(false);
  const [inputImg, setInputImg] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const fileUpload = React.useRef(null);
  const getBlob = (blob) => {
    // pass blob up from the ImageCropper component
    dataURLtoFile(blob, "logo.png");
    setBlob(true);
    handleResetLogoUpload();
    //console.log(blob);
  };

  const dataURLtoFile = (blober, filename) => {
    const image = new File([blober], filename, {
      lastModifiedDate: new Date(),
      type: blober.type,
    });
    setFile(image);
    setCroppedImage(URL.createObjectURL(image));
  };

  const onInputChange = (e) => {
    // convert image file to base64 string
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setInputImg(reader.result);
        setShowEditor(true);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = () => {
    fileUpload.current.click();
  };

  const handleResetLogoUpload = () => {
    fileUpload.current.value = null;
    setInputImg("");
  };

  const handleSubmitImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLogoUploadToServer = async () => {
    setLoader(true);
    setMessager("Uploading Logo...please wait");
    const response = await LogoUploadService({
      img: file,
      school: school,
      token: token,
    });

    if (response) {
      if (response?.status === 200) {
        if (response?.data?.isSuccess) {
          //console.log(response?.data);
          isSuccess(true);
          setLoader(false);
          setVisibled(true);
          setError(response?.data?.message ?? "process Completed");
          imager(croppedImage);
          next();
        } else {
          isSuccess(false);
          setLoader(false);
          setVisibled(true);
          setError(response?.data?.message ?? "Error Encounter");
        }
      } else {
        isSuccess(false);
        setLoader(false);
        setVisibled(true);
        setError(response?.data?.message ?? "Error Encounter..");
      }
    } else {
      isSuccess(false);
      setLoader(false);
      setVisibled(true);
      setError("Error Encounter.");
    }
  };

  const handleLogoSkip = () => {
    next();
  };

  return (
    <>
      <Row className=" mb-5 text-center">
        {/* <Colxx xxs="12">
          <CardTitle className="text-muted">
            <IntlMessages id="school.logo" />
          </CardTitle>
        </Colxx> */}
        <Colxx md="12" lg="12" className="col-item mb-0 ">
          <img src={croppedImage} className="rounded-circle" width="200px" />
          {blob && (
            <p>
              <NavLink to="#" onClick={handleLogoUpload}>
                Change
              </NavLink>
            </p>
          )}
        </Colxx>
      </Row>

      <Row style={{ display: !blob ? "block" : "none" }}>
        <Colxx xxs="12" className="text-center">
          <Button onClick={handleLogoUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={onInputChange}
              style={{ display: "none" }}
              ref={fileUpload}
            />
            Select Logo
          </Button>
        </Colxx>
      </Row>
      {/* <input type="file" onChange={handleSubmitImage} /> */}
      {blob && (
        <Row>
          <Colxx xxs="12" className="text-center">
            <Button onClick={handleLogoUploadToServer}>Next</Button>
          </Colxx>
        </Row>
      )}
      <Row>
        {inputImg && showEditor && (
          <Modal isOpen={showEditor}>
            <ModalBody>
              <ImageCropper
                getBlob={getBlob}
                inputImg={inputImg}
                isEditor={setShowEditor}
                clear={handleResetLogoUpload}
              />
            </ModalBody>
          </Modal>
        )}
      </Row>
    </>
  );
};

const GetStarted = ({
  intl,
  match,
  next,
  setLoader,
  setMessager,
  setError,
  setVisibled,
  croppedImage,
  name,
  ...props
}) => {
  const handleLogoSubmit = () => {
    next();
  };

  const handleLogoSkip = () => {
    props.history.push("/accounts");
  };

  return (
    <div>
      <Row className=" mb-5 text-center">
        <Colxx xxs="12">
          <p>
            <img src={croppedImage} className="rounded-circle" width="200px" />
          </p>

          <p>
            <h1>{name}</h1>
          </p>
        </Colxx>
        <Colxx md="12" lg="12" className="col-item mb-4 ">
          <p>
            School setup has been completed successfully, You can now proceed to
            your dashboard for futher actions. Thank you.
          </p>
          <Button color="primary" onClick={handleLogoSkip}>
            Get Started
          </Button>
        </Colxx>
      </Row>
    </div>
  );
};
