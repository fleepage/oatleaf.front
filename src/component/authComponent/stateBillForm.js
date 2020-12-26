/* eslint-disable no-param-reassign */
import CircularProgress from "@material-ui/core/CircularProgress";
import { Field, Form, Formik } from "formik";
import React, { createRef, useContext, useState } from "react";
import { Step, Steps, Wizard } from "react-albus";
import SweetAlert from "react-bootstrap-sweetalert";
import { injectIntl } from "react-intl";
import { usePaystackPayment } from "react-paystack";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { Colxx } from "../../component/common/CustomBootstrap";
import BottomNavigation from "../../component/wizard/BottomNavigation";
import TopNavigation from "../../component/wizard/TopNavigation";
import { AuthContext } from "../../context/AuthContext";
import IntlMessages from "../../helpers/IntlMessages";
import {
  BillerService,
  LevelOneService,
  LevelThreeService,
  LevelTwoService,
  MetaDataService,
} from "../../services/BillService";
import Rating from "../common/rating";
import { DarkcustomStyles } from "../common/selectCss";
import RightSideMenu from "../navs/rightSideMenu";

const validateName = (value) => {
  let error;
  if (!value) {
    error = "Please enter your name";
  } else if (value.length < 2) {
    error = "Value must be longer than 2 characters";
  }
  return error;
};

const validatePhone = (value) => {
  let error;
  if (!value) {
    error = "Please enter your Phone Number";
  } else if (value.length < 2) {
    error = "Please enter a correct phone Number";
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

const validateRevenueHead = (value) => {
  let error;
  if (!value) {
    error = "Please select a Revenue Head";
  } else if (value === "Select Revenue Head") {
    error = "Select a valid Revenue Head";
  }
  return error;
};

const validateBiller = (value) => {
  let error;
  if (!value) {
    error = "Please Select a Biller";
  } else if (value === "Select Biller") {
    error = "Select a valid Biller";
  }
  return error;
};

const validateMDA = (value) => {
  let error;
  if (!value) {
    error = "Please Select a MDA";
  } else if (value === "Select MDA") {
    error = "Select a valid MDA";
  } else if (value === "Fetching MDA..please wait") {
    error = "Please wait...";
  }
  return error;
};

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 6) {
    error = "Password must be longer than 6 characters";
  }
  return error;
};

const options = [
  "/assets/img/payment/interswitch.jpg",
  "/assets/img/payment/paystack.png",
  "/assets/img/payment/remita.jpg",
];

const StateBillForm = ({ handleHideRight, intl, ...props }) => {
  const { dispatch, auth } = useContext(AuthContext);

  const [metaData, setMetaData] = useState({});
  const forms = [createRef(null), createRef(null), createRef(null)];
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isServiceEmpty, setIisServiceEmpty] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [paymentRef, setPaymentRef] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [isPaymentError, setIsPaymentError] = useState(false);
  const [hasPaid, setHasPaid] = useState(false);

  const [fields, setFields] = useState([
    {
      valid: false,
      biller: "biller",
      value: "Select Biller",
    },
    {
      valid: false,
      mda: "mda",
      value: "Select MDA",
    },
    {
      valid: false,
      revenueHead: "revenueHead",
      value: "Select Revenue Head",
    },
    {
      valid: false,
      fullnme: "fullnme",
      value: `${auth.data.firstName} ${auth.data.lastName}`,
    },
    {
      valid: false,
      phoneNumber: "phoneNumber",
      value: `${auth.data.phone}`,
    },
    {
      valid: false,
      email: "email",
      value: `${auth.data.email}`,
    },
    {
      valid: false,
      address: "address",
      value: "",
    },
  ]);

  const [totalPayment, setTotalPayment] = useState(0.0);
  const [selectedService, setSelectedService] = useState({});
  const [tempTotal, setTempTotal] = useState(0);
  const [tempAmount, setTempAmount] = useState(0);
  const [tempQuantity, setTempQuantity] = useState(1);
  const [tempAmountFixed, setTempAmountFixed] = useState(false);
  const [tempQuantityFixed, setTempQuantityFixed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(1);

  //state bills
  const [billerVal, setBillerVal] = useState("");
  const [mdaVal, setMdaVal] = useState("");
  const [revenueVal, setRevenueVal] = useState("");
  const [serviceVal, setServiceVal] = useState([]);

  //user detaila
  const [fullnme, setFullName] = useState("??");
  const [phoneNumber, setPhoneNumber] = useState("??");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("??");

  //state bills
  const [biller, setBiller] = useState("Select Biller");
  const [mda, setMda] = useState("Select MDA");
  const [revenue, setRevenue] = useState("Select Revenue Head");
  const [service, setService] = useState("Select Service(s)");

  //state bills

  const [billerOptions, setBillerOptions] = useState([]);
  const [mdaOptions, setMdaOptions] = useState([]);
  const [revenueOptions, setRevenueOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);

  const [isLoading, setisLoading] = useState(false);
  const [billerLoading, setBillerLoading] = useState(false);
  const [mdaLoading, setMdaLoading] = useState(false);
  const [revenueLoading, setRevenueLoading] = useState(false);
  const [serviceLoading, setServiceLoading] = useState(false);

  const onSelect = (selectedList, selectedItem, completer) => {
    setServiceVal(selectedList);
    setSelectedService(selectedItem);
    setShowAddDialog(true);
    setTempAmount(selectedItem.amount);
    setTempQuantity(selectedItem.quantity);
    setTempAmountFixed(selectedItem.isAmountFixed);
    setTempQuantityFixed(false);
    setTempTotal(+selectedItem.quantity * +selectedItem.amount);
  };

  const onRemove = (selectedList, removedItem) => {
    setServiceVal(selectedList);
  };

  const handleCancel = async () => {
    let index = 0;
    setShowAddDialog(false);
    index = serviceVal.findIndex((i) => i["id"] === selectedService["id"]);
    setServiceVal(serviceVal.filter((data, idx) => idx !== index));
  };

  const handleAdd = async () => {
    setisLoading(false);
    setIisServiceEmpty(false);
    setShowAddDialog(false);
    setShowDialog(false);
    let index = 0;
    index = serviceVal.findIndex((i) => i["id"] === selectedService["id"]);
    serviceVal[index].amount = tempAmount;
    serviceVal[index].quantity = tempQuantity;
    setServiceVal(serviceVal);
    const total = serviceVal.reduce(function (cnt, o) {
      return cnt + o.amount * o.quantity;
    }, 0);
    setTotalPayment(total);
  };

  const handleTempAmount = async (e) => {
    setTempAmount(e.target.value);
    setTempTotal(+tempQuantity * +e.target.value);
  };

  const handleTempQuantity = async (e) => {
    setTempQuantity(e.target.value);
    setTempTotal(+e.target.value * +tempAmount);
  };

  const onCancel = async () => {
    setShowDialog(false);
  };

  const handleItemClicked = (item) => {
    setSelectedService(item);
    setTempAmount(item.amount);
    setTempQuantity(item.quantity);
    setTempAmountFixed(item.isAmountFixed);
    setTempQuantityFixed(false);
    setShowDialog(true);
  };

  const onPayStateBills = async (e) => {
    // e.preventDefault();
    // dispatch(BillActionStore({
    //   isStateBill: true,
    //   data: {
    //   Biller:billerVal,
    //   Mda:mdaVal,
    //   Revenue:revenueVal,
    //   Services:serviceVal
    // }}));
    // props.history.push("/details");
  };

  const handleBillerSelect = async (e) => {
    setMdaLoading(true);
    setIsEnabled(true);
    setBillerVal(e);
    setMdaOptions([]);
    setRevenueOptions([]);
    setServiceOptions([]);
    setMda(`Fetching items..please wait`);
    setRevenue(`Select Option`);
    setService(`Select Option`);
    const levelOne = await LevelOneService({ biller: e.value });
    const metaData_ = await MetaDataService({ biller: e.value });
    setMetaData(metaData_);
    setMdaLoading(false);
    setMda(`Select ${metaData_.fieldOne}`);
    setRevenue(`Select ${metaData_.fieldTwo}`);
    setService(`Select ${metaData_.fieldThree}`);
    setMdaOptions(levelOne);
    //setisLoading(false);
  };

  const handleMdaSelect = async (e) => {
    setRevenueLoading(true);
    setMdaVal(e);
    setRevenue(`Fetching ${metaData.fieldTwo}..please wait`);
    const levelTwo = await LevelTwoService({ levelOne: e.value });
    setRevenueLoading(false);
    setRevenue(`Select ${metaData.fieldTwo}`);
    setRevenueOptions(levelTwo);
    //setisLoading(false);
  };

  const handleRevenueSelect = async (e) => {
    setServiceLoading(true);
    setRevenueVal(e);
    setService(`Fetching ${metaData.fieldThree}..please wait`);
    const levelthree = await LevelThreeService({ levelTwo: e.value });
    setServiceLoading(false);
    setService(`Select ${metaData.fieldThree}`);
    setServiceOptions(levelthree);
  };

  const handleFullName = async (e) => {
    setFullName(e.target.value);
  };

  const handlePhoneNumber = async (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleEmail = async (e) => {
    setEmail(e.target.value);
  };
  const handleAddress = async (e) => {
    setAddress(e.target.value);
  };

  const asyncLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const onClickNext = (goToNext, steps, step) => {
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    const formIndex = steps.indexOf(step);
    const form = forms[formIndex].current;

    if (formIndex == 0) {
      const { biller } = fields[0];
      const { mda } = fields[1];
      const { revenueHead } = fields[2];
      form.submitForm().then(() => {
        const newFields = [...fields];

        newFields[0].value = form.values[biller];
        newFields[0].valid = !form.errors[biller];

        newFields[1].value = form.values[mda];
        newFields[1].valid = !form.errors[mda];

        newFields[2].value = form.values[revenueHead];
        newFields[2].valid = !form.errors[revenueHead];

        setFields(newFields);

        if (serviceVal.length > 0) {
          if (
            !form.errors[biller] &&
            !form.errors[mda] &&
            !form.errors[revenueHead]
          ) {
            goToNext();
            step.isDone = true;
            // if (steps.length - 2 <= steps.indexOf(step)) {
            //   setBottomNavHidden(true);
            //   asyncLoading();
            // }
          }
        } else {
          setIisServiceEmpty(true);
        }
      });
    } else if (formIndex == 1) {
      const { fullnme } = fields[3];
      const { phoneNumber } = fields[4];
      const { email } = fields[5];
      const { address } = fields[6];
      form.submitForm().then(() => {
        const newFields = [...fields];

        newFields[3].value = form.values[fullnme];
        newFields[3].valid = !form.errors[fullnme];

        newFields[4].value = form.values[phoneNumber];
        newFields[4].valid = !form.errors[phoneNumber];

        newFields[5].value = form.values[email];
        newFields[5].valid = !form.errors[email];

        newFields[6].value = form.values[address];
        newFields[6].valid = !form.errors[address];

        setFields(newFields);

        if (
          !form.errors[fullnme] &&
          !form.errors[phoneNumber] &&
          !form.errors[email] &&
          !form.errors[address]
        ) {
          goToNext();
          step.isDone = true;
          // if (steps.length - 2 <= steps.indexOf(step)) {
          //   setBottomNavHidden(true);
          //   asyncLoading();
          // }
        }
      });
    } else {
      handlePayment();
    }
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  const { messages } = intl;

  const redirectUrl = "http://localhost:3000/checkout";

  const paymentCallback = (response) => {
    setPaymentReference(response, true);
  };

  const paymentRequest = {
    merchant_code: "MX21174",
    pay_item_id: "Default_Payable_MX21174",
    txn_ref: `${new Date().getTime()}`,
    amount: `${totalPayment * 100}`,
    currency: 566,
    site_redirect_url: redirectUrl,
    onComplete: paymentCallback,
    mode: "TEST",
  };

  const config = {
    reference: new Date().getTime(),
    email: "user@example.com",
    amount: totalPayment * 100,
    publicKey: "pk_test_195e61ed1eb059132775060414a21ad0f3636f77",
  };
  // you can call this function anything
  const payStackOnSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setPaymentReference(reference, true);
  };

  // you can call this function anything
  const payStackOnClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const setPaymentReference = (payment, isSuccess) => {
    handleHideRight(true);
    if (selectedPayment === 1) {
      setHasPaid(true);
    } else if (selectedPayment === 2) {
      setHasPaid(true);
    } else {
      setHasPaid(true);
    }
  };

  const makeRemitaPayment = () => {
    var paymentEngine = window.RmPaymentEngine.init({
      key:
        "QzAwMDAyODA1Mzh8MTI1OTgxNTh8NGQyZWI3ODMzMDhhNWEwNjgxY2NlNjgzMzAzODYyNGVmOWQyODFjYzVjZmQyMDUyNWI1OWJmOWU2ZjgzZTZlOWQ0Y2Y2ODJkMjQ0OWJjMDgwMTQyN2E5OWQ5MzA3NzRlNjhkZDY5MGU5N2YzNDRlMWEzODA0MjIzOGU3ZWRmOTQ=",
      customerId: "test3@Systemspecs.com.ng",
      firstName: "Lisaewe",
      lastName: "Sparkewe",
      narration: "bill pay",
      email: "demeo@remita.net",
      transactionId: new Date().getTime(),
      amount: totalPayment,
      onSuccess: function (response) {
        setPaymentReference(response, true);
      },
      onError: function (response) {
        setPaymentReference(response, false);
      },
      onClose: function () {
        //console.log("closed");
      },
    });

    paymentEngine.showPaymentWidget();
  };

  const initializePayment = usePaystackPayment(config);
  const handlePayment = () => {
    if (selectedPayment === 1) {
      window.webpayCheckout(paymentRequest);
    } else if (selectedPayment === 2) {
      initializePayment(payStackOnSuccess, payStackOnClose);
    } else {
      makeRemitaPayment();
    }
  };

  const loadBillerOptions = (inputValue, callback) => {
    if (billerOptions.length > 0) {
      callback(
        billerOptions.filter((i) =>
          i.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      BillerService({}).then((data) => {
        setBillerOptions(data);
        callback(
          data.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
      });
    }
  };

  return (
    <>
      {hasPaid && (
        <Card>
          <CardTitle>
            <Row>
              <Colxx md="12">
                <div className="p-4 float-md-right">
                  <Button
                    outline
                    size="lg"
                    onClick={() => {
                      props.history.push("/app");
                    }}
                  >
                    <span className="label">Close</span>
                  </Button>
                </div>
              </Colxx>
            </Row>
          </CardTitle>
          <CardBody className="text-center">
            <img
              src="/assets/img/utilities/success.png"
              style={{ width: "30%", height: "30%" }}
            />
            <p>
              <h1>Payment Successful</h1>
            </p>
            <p>
              <Button color="primary" size="lg">
                <span className="label">Print Reciept</span>
              </Button>
            </p>
            <br />
            <p>
              <label>Rate our service</label>

              <Rating total={5} rating={0} onRate={(rating) => {}} />
            </p>
          </CardBody>
        </Card>
      )}

      {!hasPaid && (
        <Card>
          <CardBody className="wizard wizard-default">
            <Wizard>
              <TopNavigation className="justify-content-center" disableNav />
              <Steps>
                <Step
                  id="step1"
                  name={messages["wizard.step-name-1"]}
                  desc={"Select what you want to pay for."}
                >
                  <div className="wizard-basic-step">
                    <Formik
                      innerRef={forms[0]}
                      initialValues={{
                        biller: fields[0].value,
                        mda: fields[1].value,
                        revenueHead: fields[2].value,
                      }}
                      onSubmit={() => {}}
                    >
                      {({ errors, touched, setFieldValue }) => (
                        <Form
                          className="av-tooltip tooltip-label-bottom"
                          onSubmit={onPayStateBills}
                        >
                          <div className="row">
                            <div className="col-12">
                              <FormGroup className="form-group ">
                                <AsyncSelect
                                  //options={options}
                                  cacheOptions
                                  loadOptions={loadBillerOptions}
                                  defaultOptions
                                  name="biller"
                                  styles={DarkcustomStyles}
                                  //isLoading

                                  placeholder="Select Biller"
                                  loadingMessage={() =>
                                    "fetching Billers.. plase wait"
                                  }
                                  noOptionsMessage={() => "No Biller available"}
                                  onChange={(e) => {
                                    setFieldValue("biller", e);
                                    handleBillerSelect(e);
                                  }}
                                />
                                {errors.biller && touched.biller && (
                                  <div className="invalid-feedback d-block">
                                    {errors.biller}
                                  </div>
                                )}
                                <br />
                              </FormGroup>
                            </div>
                            {/* <div
                              className={billerLoading ? "col-10" : "col-12"}
                            >
                              <FormGroup className="form-group has-float-label">
                                <Label>Select Biller</Label>
                                <Field
                                  as="select"
                                  className="form-control p-3"
                                  name="biller"
                                  onChange={(e) => {
                                    setFieldValue("biller", e.target.value);
                                    handleBillerSelect(e);
                                  }}
                                  validate={validateBiller}
                                >
                                  <option selected value="Select Biller">
                                    Select Biller
                                  </option>
                                  <option value="Yobe">Yobe</option>
                                  <option value="Jigawa">Jigawa</option>
                                  <option value="Kebbi">Kebbi</option>
                                </Field>

                                {errors.biller && touched.biller && (
                                  <div className="invalid-feedback d-block">
                                    {errors.biller}
                                  </div>
                                )}
                                <br />
                              </FormGroup>
                            </div>
                            {billerLoading && (
                              <div className="col-2">
                                <CircularProgress color="primary" />
                              </div>
                            )} */}
                          </div>

                          <div className="row">
                            <div className="col-12">
                              <FormGroup className="form-group ">
                                <Select
                                  //options={options}
                                  isLoading={mdaLoading}
                                  options={mdaOptions}
                                  name="mda"
                                  styles={DarkcustomStyles}
                                  //isLoading
                                  value={mda}
                                  placeholder={mda}
                                  loadingMessage={() => mda}
                                  noOptionsMessage={() =>
                                    `No ${metaData.fieldOne} available`
                                  }
                                  onChange={(e) => {
                                    setFieldValue("mda", e);
                                    handleMdaSelect(e);
                                    setMda(e.label);
                                  }}
                                />
                                {errors.mda && touched.mda && (
                                  <div className="invalid-feedback d-block">
                                    {errors.mda}
                                  </div>
                                )}
                                <br />
                              </FormGroup>
                            </div>
                          </div>
                          {/* <div className="row">
                            <div className={mdaLoading ? "col-10" : "col-12"}>
                              <FormGroup className="form-group has-float-label">
                                <Label>Select Mda</Label>
                                <Field
                                  as="select"
                                  className="form-control p-3"
                                  name="mda"
                                  onChange={(e) => {
                                    setFieldValue("mda", e.target.value);
                                    handleMdaSelect(e);
                                  }}
                                  validate={validateMDA}
                                >
                                  <option selected value={mda}>
                                    {mda}
                                  </option>
                                  {mdaOptions.map((option) => (
                                    <option value={option}>{option}</option>
                                  ))}
                                </Field>

                                {errors.mda && touched.mda && (
                                  <div className="invalid-feedback d-block">
                                    {errors.mda}
                                  </div>
                                )}
                                <br />
                              </FormGroup>
                            </div>
                            {mdaLoading && (
                              <div className="col-2">
                                <CircularProgress color="primary" />
                              </div>
                            )}
                          </div> */}

                          <div className="row">
                            <div className="col-12">
                              <FormGroup className="form-group ">
                                <Select
                                  //options={options}
                                  isLoading={revenueLoading}
                                  options={revenueOptions}
                                  name="revenueHead"
                                  styles={DarkcustomStyles}
                                  isSearchable
                                  //isLoading
                                  value={revenue}
                                  placeholder={revenue}
                                  loadingMessage={() => revenue}
                                  noOptionsMessage={() =>
                                    `No ${metaData.fieldTwo} available`
                                  }
                                  onChange={(e) => {
                                    setFieldValue("revenueHead", e);
                                    handleRevenueSelect(e);
                                    setRevenue(e.label);
                                  }}
                                />
                                {errors.revenueHead && touched.revenueHead && (
                                  <div className="invalid-feedback d-block">
                                    {errors.revenueHead}
                                  </div>
                                )}
                                <br />
                              </FormGroup>
                            </div>
                          </div>

                          {/* <div className="row">
                            <div
                              className={revenueLoading ? "col-10" : "col-12"}
                            >
                              <FormGroup className="form-group has-float-label">
                                <Label>Select Revenue Head</Label>
                                <Field
                                  as="select"
                                  className="form-control p-3"
                                  name="revenueHead"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "revenueHead",
                                      e.target.value
                                    );
                                    handleRevenueSelect(e);
                                  }}
                                  validate={validateRevenueHead}
                                >
                                  <option selected value={revenue}>
                                    {revenue}
                                  </option>
                                  {revenueOptions.map((option) => (
                                    <option value={option}>{option}</option>
                                  ))}
                                </Field>
                                {errors.revenueHead && touched.revenueHead && (
                                  <div className="invalid-feedback d-block">
                                    {errors.revenueHead}
                                  </div>
                                )}
                                <br />
                              </FormGroup>
                            </div>
                            {revenueLoading && (
                              <div className="col-2">
                                <CircularProgress color="primary" />
                              </div>
                            )}
                          </div> */}

                          <div className="row">
                            <div
                              className={serviceLoading ? "col-10" : "col-12"}
                            >
                              {isServiceEmpty && (
                                <div className="invalid-feedback d-block">
                                  Select Service(s)
                                </div>
                              )}

                              <br />
                            </div>
                            <div>
                              {serviceLoading && (
                                <div className="col-2">
                                  <CircularProgress color="primary" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* {<div className="d-flex  align-items-center">
                          
                          <Button
                              color="primary"
                              className={`btn btn-secondary btn-secondary-orange btn-xl mr-2 mb-2`}
                              size="lg"
                              >
                              <span className="spinner d-inline-block">
                                  <span className="bounce1" />
                                  <span className="bounce2" />
                                  <span className="bounce3" />
                              </span>
                              <span className="label">
                              Pay Now
                              </span>
                              </Button>
                          </div>} */}
                        </Form>
                      )}
                    </Formik>
                    {isLoading && (
                      <div className="form-side top text-center">
                        <div style={{ margin: "auto" }}>
                          <br />
                          <h3 className="black">{selectedService.name}</h3>
                          <div className={`align-items-center active-moda`}>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Quantity"
                                onChange={handleTempQuantity}
                              />
                              <br />
                            </div>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Amount"
                                onChange={handleTempAmount}
                              />
                              <br />
                            </div>
                          </div>

                          <Button
                            color="primary"
                            className={`btn btn-secondary btn-xl mr-2 mb-2`}
                            size="lg"
                            onClick={handleAdd}
                          >
                            <span className="spinner d-inline-block">
                              <span className="bounce1" />
                              <span className="bounce2" />
                              <span className="bounce3" />
                            </span>
                            <span className="label">Add</span>
                          </Button>
                          <button
                            className={`btn btn-outline-danger mb-1`}
                            type="button"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Step>
                <Step
                  id="step2"
                  name={messages["wizard.step-name-2"]}
                  desc={"Fill your personal details"}
                >
                  <div className="wizard-basic-step">
                    <Formik
                      innerRef={forms[1]}
                      initialValues={{
                        fullnme: fields[3].value,
                        phoneNumber: fields[4].value,
                        email: fields[5].value,
                        address: fields[6].value,
                      }}
                      onSubmit={() => {}}
                    >
                      {({ errors, touched }) => (
                        <Form
                          className="av-tooltip tooltip-label-bottom"
                          onSubmit={onPayStateBills}
                        >
                          <FormGroup>
                            <Label>FullName</Label>
                            <Field
                              className="form-control p-3"
                              name="fullnme"
                              type="text"
                              placeholder="Full Name"
                              //onChange={handleFullName}
                              validate={validateName}
                            />
                            {errors.fullnme && touched.fullnme && (
                              <div className="invalid-feedback d-block">
                                {errors.fullnme}
                              </div>
                            )}
                          </FormGroup>

                          <FormGroup>
                            <Label>Contact</Label>
                            <Field
                              className="form-control p-3"
                              name="phoneNumber"
                              type="text"
                              placeholder="Contact"
                              //onChange={handlePhoneNumber}
                              validate={validatePhone}
                            />
                            {errors.phoneNumber && touched.phoneNumber && (
                              <div className="invalid-feedback d-block">
                                {errors.phoneNumber}
                              </div>
                            )}
                          </FormGroup>

                          <FormGroup>
                            <Label>Email</Label>
                            <Field
                              className="form-control p-3"
                              name="email"
                              type="text"
                              placeholder="Contact"
                              onChange={(e) => {
                                setFields("email", e.target.value);
                                handleEmail(e);
                              }}
                              validate={validateEmail}
                            />
                            {errors.email && touched.email && (
                              <div className="invalid-feedback d-block">
                                {errors.email}
                              </div>
                            )}
                          </FormGroup>

                          <FormGroup>
                            <Label>Address</Label>
                            <Field
                              className="form-control p-3"
                              name="address"
                              type="text"
                              placeholder="Address"
                              //onChange={handleAddress}
                            />
                            {errors.address && touched.address && (
                              <div className="invalid-feedback d-block">
                                {errors.address}
                              </div>
                            )}
                          </FormGroup>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Step>
                <Step
                  id="step3"
                  name={messages["wizard.step-name-3"]}
                  desc={"Confirm your payment"}
                >
                  <div className="wizard-basic-step">
                    <Formik innerRef={forms[2]} onSubmit={() => {}}>
                      {({ errors, touched }) => (
                        <Form className="av-tooltip tooltip-label-right error-l-75">
                          <Row>
                            <Colxx md="12">
                              <h1>Preview</h1>
                            </Colxx>
                          </Row>
                          <Row>
                            <Colxx md="12">
                              <Table hover responsive>
                                <tbody>
                                  <tr>
                                    <td>Biller</td>

                                    <td>
                                      <strong>{billerVal.label}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>MDA</td>
                                    <td>
                                      <strong>{mdaVal.label}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Revenue Head</td>
                                    <td>
                                      <strong>{revenueVal.label}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Name</td>
                                    <td>
                                      <strong>{fields[3].value}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Phone</td>
                                    <td>
                                      <strong>{fields[4].value}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Email</td>
                                    <td>
                                      <strong>{fields[5].value}</strong>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Address</td>
                                    <td>
                                      <strong>{fields[6].value}</strong>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                          <br />
                          <Row>
                            <Colxx md="12">
                              <h3>Service(s)</h3>
                            </Colxx>
                          </Row>
                          <Row hover responsive>
                            <Colxx md="12">
                              <Table hover responsive>
                                <thead>
                                  <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {serviceVal.map((item) => (
                                    <tr>
                                      <td>{item.name}</td>
                                      <td> {item.quantity}</td>
                                      <td>{item.amount}</td>
                                      <td>NGN {item.amount * item.quantity}</td>
                                    </tr>
                                  ))}
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                      <strong>Total</strong>
                                    </td>
                                    <td>
                                      <strong>NGN {totalPayment}</strong>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Colxx>
                          </Row>
                          <br />
                          <Row className=" d-none d-md-block">
                            {" "}
                            <Colxx md="12">
                              <div className="mb-4">
                                <h6 className="mb-2">Select Payment Option</h6>
                                <ButtonGroup block>
                                  <Button
                                    onClick={() => setSelectedPayment(1)}
                                    active={selectedPayment === 1}
                                    style={{
                                      backgroundImage: `url(${options[0]})`,
                                      backgroundSize: "100% 100%",
                                      backgroundRepeat: "no-repeat",
                                      border: "0px",
                                      marginRight: "20px",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          backgroundColor: ` ${
                                            selectedPayment === 1
                                              ? "rgb(255,255,255,0.8)"
                                              : "rgb(255,255,255,0)"
                                          } `,
                                          height: "50px",
                                          width: "100px",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {selectedPayment === 1 && (
                                          <i
                                            className="simple-icon-check"
                                            style={{
                                              fontSize: "30px",
                                              fontWeight: "bold",
                                              margin: "auto",
                                              color: "#000",
                                            }}
                                          ></i>
                                        )}
                                      </div>
                                    </div>
                                  </Button>
                                  <Button
                                    onClick={() => setSelectedPayment(2)}
                                    active={selectedPayment === 2}
                                    style={{
                                      backgroundImage: `url(${options[1]})`,
                                      backgroundSize: "100% 100%",
                                      backgroundRepeat: "no-repeat",
                                      border: "0px",
                                      marginRight: "20px",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          backgroundColor: ` ${
                                            selectedPayment === 2
                                              ? "rgb(255,255,255,0.8)"
                                              : "rgb(255,255,255,0)"
                                          } `,
                                          height: "50px",
                                          width: "100px",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {selectedPayment === 2 && (
                                          <i
                                            className="simple-icon-check"
                                            style={{
                                              fontSize: "30px",
                                              fontWeight: "bold",
                                              margin: "auto",
                                              color: "#000",
                                            }}
                                          ></i>
                                        )}
                                      </div>
                                    </div>
                                  </Button>
                                  <Button
                                    //color="primary"
                                    onClick={() => setSelectedPayment(3)}
                                    active={selectedPayment === 3}
                                    style={{
                                      backgroundImage: `url(${options[2]})`,
                                      backgroundSize: "100% 100%",
                                      backgroundRepeat: "no-repeat",
                                      border: "0px",
                                      marginRight: "20px",
                                    }}
                                  >
                                    <div>
                                      <div
                                        style={{
                                          backgroundColor: ` ${
                                            selectedPayment === 3
                                              ? "rgb(255,255,255,0.8)"
                                              : "rgb(255,255,255,0)"
                                          } `,
                                          height: "50px",
                                          width: "100px",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        {selectedPayment === 3 && (
                                          <i
                                            className="simple-icon-check"
                                            style={{
                                              fontSize: "30px",
                                              fontWeight: "bold",
                                              margin: "auto",
                                              color: "#000",
                                            }}
                                          ></i>
                                        )}
                                      </div>
                                    </div>
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </Colxx>
                          </Row>
                          <Row className="d-block d-md-none">
                            {" "}
                            <Colxx md="12">
                              <div className="mb-4">
                                <h6 className="mb-2">Payment Option</h6>
                                <ButtonGroup block>
                                  <Button
                                    color="primary"
                                    onClick={() => setSelectedPayment(1)}
                                    active={selectedPayment === 1}
                                  >
                                    Interswitch
                                  </Button>
                                  <Button
                                    color="primary"
                                    onClick={() => setSelectedPayment(2)}
                                    active={selectedPayment === 2}
                                  >
                                    PayStack
                                  </Button>
                                  <Button
                                    color="primary"
                                    onClick={() => setSelectedPayment(3)}
                                    active={selectedPayment === 3}
                                  >
                                    Remita
                                  </Button>
                                </ButtonGroup>
                              </div>
                            </Colxx>
                          </Row>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </Step>
                <Step id="step4" hideTopNav>
                  <div className="wizard-basic-step text-center pt-3">
                    {loading ? (
                      <div>
                        <Spinner color="primary" className="mb-1" />
                        <p>
                          <IntlMessages id="wizard.async" />
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h2 className="mb-2">
                          <IntlMessages id="wizard.content-thanks" />
                        </h2>
                        <p>
                          <IntlMessages id="wizard.registered" />
                        </p>
                      </div>
                    )}
                  </div>
                </Step>
              </Steps>
              <BottomNavigation
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                className={`justify-content-center  ${
                  bottomNavHidden && "invisible"
                }`}
                prevLabel={messages["wizard.prev"]}
                nextLabel={messages["wizard.next"]}
                disabled={!isEnabled}
              />
            </Wizard>
          </CardBody>
        </Card>
      )}
      <SweetAlert
        title={selectedService.name}
        onConfirm={handleAdd}
        onCancel={onCancel}
        show={showDialog}
        confirmBtnText={"Submit"}
        cancelBtnText={"Close"}
        showCancel={true}
      >
        <div class="text-left">
          <label>Quantity</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Quantity"
            defaultValue={selectedService.quantity}
            onChange={handleTempQuantity}
          />
          <br />
        </div>
        <div class="text-left">
          <label>Amount</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Amount"
            disabled={tempAmountFixed}
            defaultValue={selectedService.amount}
            onChange={handleTempAmount}
          />
          <br />
        </div>
        <div class="text-left">
          <label>Item Total (Amount * Quantity)</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Amount"
            disabled={true}
            //value = {selectedService.amount}
            value={tempTotal}
          />
          <br />
        </div>
      </SweetAlert>

      <SweetAlert
        title={selectedService.name}
        onConfirm={handleAdd}
        onCancel={handleCancel}
        show={showAddDialog}
        confirmBtnText={"Add"}
        cancelBtnText={"Cancel"}
        showCancel={true}
        dependencies={[tempTotal]}
      >
        <div class="text-left">
          <label>Quantity</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Quantity"
            defaultValue={selectedService.quantity}
            onChange={handleTempQuantity}
          />
          <br />
        </div>
        <div class="text-left">
          <label>Amount</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Amount"
            disabled={tempAmountFixed}
            //value = {selectedService.amount}
            defaultValue={selectedService.amount}
            onChange={handleTempAmount}
          />
          <br />
        </div>
        <div class="text-left">
          <label>Item Total (Amount * Quantity)</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Amount"
            disabled={true}
            //value = {selectedService.amount}
            value={tempTotal}
          />
          <br />
        </div>
      </SweetAlert>
      {!hasPaid && <RightSideMenu />}
    </>
  );
};
export default injectIntl(StateBillForm);
