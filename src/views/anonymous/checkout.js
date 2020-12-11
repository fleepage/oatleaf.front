import React, { useContext, useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import {
  Button,
  Modal,
  ModalHeader,
  ButtonGroup,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { BillContext } from "../../context/BillContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { RegisterService } from "../../services/AuthService";
import { Colxx } from "../../component/common/CustomBootstrap";
import { Radio, RadioGroup } from "react-custom-radio-buttons";
import { usePaystackPayment } from "react-paystack";
import Headroom from "react-headroom";
import { scroller } from "react-scroll";

const options = [
  { id: 1, label: "assets/img/payment/interswitch.jpg" },
  { id: 2, label: "assets/img/payment/paystack.png" },
  { id: 3, label: "assets/img/payment/remita.jpg" },
];

const CheckOut = (props) => {
  const myRef = useRef(null);

  const { bill, dispatch } = useContext(BillContext);

  const [totalPayment, setTotalPayment] = useState(0.0);
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [paymentRef, setPaymentRef] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [isPaymentError, setIsPaymentError] = useState(false);

  const [isStateBill, setIsStateBill] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registeringCompleted, setRegisteringCompleted] = useState(false);
  const [registerMessage, setRegisterMessage] = useState(
    "Registering Account please wait....."
  );
  const [modalBack, setModalBack] = useState(false);
  const [backdrop, setBackdrop] = useState(true);
  const [modalRight, setModalRight] = useState(false);

  const [fullnme, setFullName] = useState("??");
  const [phoneNumber, setPhoneNumber] = useState("??");
  const [email, setEmail] = useState("??");
  const [address, setAddress] = useState("??");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");

  const [billerVal, setBillerVal] = useState("");
  const [mdaVal, setMdaVal] = useState("");
  const [revenueVal, setRevenueVal] = useState("");
  const [serviceVal, setServiceVal] = useState([]);

  const [utilityVal, setUtilityVal] = useState("");
  const [providerVal, setProviderVal] = useState("");
  const [utilityNumberVal, setUtilityNumberVal] = useState("");
  const [providerChoiceVal, setProviderChoiceVal] = useState("");
  const [amountVal, setAmountVal] = useState(0);
  const [isChoiced, setIsChoiced] = useState(false);

  useEffect(() => {
    setIsStateBill(bill.isStateBill);
    setFullName(bill.data.FullName);
    setPhoneNumber(bill.data.Phone);
    setEmail(bill.data.Email);
    setAddress(bill.data.Address);

    if (bill.isStateBill) {
      setBillerVal(bill.data.Biller);
      setMdaVal(bill.data.Mda);
      setRevenueVal(bill.data.Revenue);
      setServiceVal(bill.data.Services);
      const total = bill.data.Services.reduce(function (cnt, o) {
        return cnt + o.amount * o.quantity;
      }, 0);
      setTotalPayment(total);
    } else {
      setUtilityVal(bill.data.Utility);
      setProviderVal(bill.data.Provider);
      setUtilityNumberVal(bill.data.UtilityNumber);
      setProviderChoiceVal(bill.data.Choice);
      setAmountVal(bill.data.Amount);
      setIsChoiced(bill.data.isChoiced);
    }
  }, [bill, props]);

  const onPayStateBills = async (e) => {
    e.preventDefault();
  };

  const handleRegister = async () => {
    //setIsRegistering(true);
    //setFullName(e.target.value);
  };

  const handlePaymentProceed = async () => {
    setModalBack(false);
    handlePayment();
    //props.history.push("/completed");
  };

  const handleRegistration = async () => {
    //setModalRight(false);
    setIsRegistering(true);
    const response = await RegisterService({
      firstName: fullnme.split(" ")[0],
      lastName: fullnme.split(" ")[1],
      phone: phoneNumber,
      email: email,
      password: password,
      passwordConfirmation: cPassword,
    });

    if (typeof response !== "undefined") {
      //setIsRegistering(true);
      setRegisteringCompleted(true);

      if (response.status == 200) {
        setRegisterMessage("Registration completed..Please proceed to payment");
      } else {
        //setisError(true);
        setRegisterMessage(response.data.message);
      }
      //redirect
    } else {
      //setIsRegistering(false);
      setRegisteringCompleted(true);
      //setisError(true);

      setRegisterMessage("Network Error...Kindly check network");
    }

    //setFullName(e.target.value);
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

  const handlePassword = async (e) => {
    setPassword(e.target.value);
  };

  const handleConfrimPassword = async (e) => {
    setCpassword(e.target.value);
  };

  const onPaymentSelected = (option) => {
    setSelectedPayment(option);
  };

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
    email: email,
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
    if (selectedPayment === 1) {
      console.log(payment);
      props.history.push("/completed");
    } else if (selectedPayment === 2) {
      console.log(payment);
      props.history.push("/completed");
    } else {
      console.log(payment);
      props.history.push("/completed");
    }
  };

  const makeRemitaPayment = () => {
    var paymentEngine = window.RmPaymentEngine.init({
      key:
        "QzAwMDAyODA1Mzh8MTI1OTgxNTh8NGQyZWI3ODMzMDhhNWEwNjgxY2NlNjgzMzAzODYyNGVmOWQyODFjYzVjZmQyMDUyNWI1OWJmOWU2ZjgzZTZlOWQ0Y2Y2ODJkMjQ0OWJjMDgwMTQyN2E5OWQ5MzA3NzRlNjhkZDY5MGU5N2YzNDRlMWEzODA0MjIzOGU3ZWRmOTQ=",
      customerId: "test3@Systemspecs.com.ng",
      firstName: fullnme.split(" ")[0],
      lastName: fullnme.split(" ")[1],
      narration: "bill pay",
      email: email,
      transactionId: new Date().getTime(),
      amount: totalPayment * 100,
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

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
    return false;
  };

  return (
    <div className="landing-page">
      <div className="main-container">
        <Headroom className="landing-page-nav">
          <nav>
            <div className="container d-flex align-items-center justify-content-between">
              <a
                className="navbar-ercas-logo pull-left c-pointer"
                href="#scroll"
                onClick={(event) => scrollTo(event, "home")}
              >
                <span className="white"></span>
                <span className="dark"></span>
              </a>
            </div>
          </nav>
        </Headroom>
        <div className="content-container" id="home">
          <div className="section">
            <div className="container" id="features">
              <br />
              <br />
              <br />
              <Row>
                <Colxx xxl="2" className=" d-none d-md-block pl-5"></Colxx>
                <Colxx>
                  <h1>Preview.</h1>
                  <div>
                    <p>
                      <h3>user details</h3>
                      <br />
                      <b>Fullname: {fullnme} </b>
                      <br />
                      <b>Phone Number: {phoneNumber} </b>
                      <br />
                      <b>Email: {email} </b>
                      <br />
                      <b>Address: {address} </b>
                      <br />
                    </p>
                  </div>
                  <div>
                    {isStateBill && (
                      <p>
                        <h3>payment details</h3>
                        <br />
                        <b>Biller: {billerVal.label} </b>
                        <br />
                        <b>Mda: {mdaVal.label} </b>
                        <br />
                        <b>Revenue Head: {revenueVal.label} </b>
                        <br />
                      </p>
                    )}
                    {!isStateBill && (
                      <p>
                        <h3>payment details</h3>
                        <br />
                        <b>Utility: {utilityVal.label} </b>
                        <br />
                        <b>Utility Number: {utilityNumberVal} </b>
                        <br />
                        {isChoiced && (
                          <p>
                            <b>Utlity Choice: {providerChoiceVal.label} </b>
                            <br />
                          </p>
                        )}
                        {!isChoiced && (
                          <p>
                            <b>Utlity Provider: {providerVal.label} </b>
                            <br />
                            <b>Amount: {amountVal} </b>
                            <br />
                          </p>
                        )}
                      </p>
                    )}
                  </div>
                  {isStateBill && (
                    <div>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">transaction Item(s)</h5>

                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {serviceVal.map((item) => (
                                <tr>
                                  <td>{item.name}</td>
                                  <td> {item.quantity}</td>
                                  <td>{item.amount}</td>
                                  <td>{item.amount * item.quantity}</td>
                                </tr>
                              ))}

                              <tr>
                                <td></td>
                                <td></td>
                                <th scope="row">Total</th>
                                <td>NGN {totalPayment}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </Colxx>
                <Colxx xxl="4" className=" d-none d-md-block pl-5">
                  <h2>Select Payment Option.</h2>
                  <span>Please select a payment option</span>
                  <br />
                  <br />
                  <Row>
                    <Colxx xmd="12">
                      <RadioGroup
                        containerStyle="options-container"
                        onChange={onPaymentSelected}
                      >
                        {options.map((option) => (
                          <Radio
                            value={option.id}
                            //isDisabled={option.id === 2 || option.id === 3}
                            render={({ isSelected }) => (
                              <button
                                className="option"
                                style={{
                                  backgroundColor: ` ${
                                    isSelected ? "#ffffff" : "#ffffff"
                                  } `,
                                  border: "0px",
                                  marginBottom: "20px",
                                }}
                              >
                                <div
                                  style={{
                                    backgroundImage: `url(${option.label})`,
                                    height: "150px",
                                    width: "300px",
                                  }}
                                >
                                  <div
                                    style={{
                                      backgroundColor: ` ${
                                        isSelected
                                          ? "rgb(255,255,255,0.8)"
                                          : "rgb(255,255,255,0)"
                                      } `,
                                      height: "150px",
                                      width: "300px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {isSelected && (
                                      <i
                                        className="simple-icon-check"
                                        style={{
                                          fontSize: "60px",
                                          fontWeight: "bold",
                                          margin: "auto",
                                          color: "primary",
                                        }}
                                      ></i>
                                    )}
                                  </div>
                                </div>
                              </button>
                            )}
                          />
                        ))}
                      </RadioGroup>
                    </Colxx>
                    <Colxx xmd="12"></Colxx>
                    <Colxx xmd="12"></Colxx>
                  </Row>
                </Colxx>
              </Row>
              <div className="d-block d-md-none">
                <br />
                <br />
                <Row>
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
              </div>
              <br />
              <br />
              <Row>
                <Colxx md="2"></Colxx>
                <Colxx>
                  <div className="d-flex  align-items-center">
                    <Button
                      color="primary"
                      className={`btn btn-secondary btn-secondary-orange btn-xl mr-2 mb-2`}
                      size="lg"
                      onClick={() => setModalBack(true)}
                    >
                      <span className="label">Pay</span>
                    </Button>
                  </div>

                  <Modal
                    isOpen={modalBack}
                    toggle={() => setModalBack(!modalBack)}
                    backdrop={backdrop}
                  >
                    <ModalHeader>Signup</ModalHeader>
                    <ModalBody>Would you like to create an account.</ModalBody>
                    <ModalFooter>
                      <Button
                        color="primary"
                        onClick={() => {
                          setModalBack(false);
                          setModalRight(true);
                        }}
                      >
                        Yes
                      </Button>{" "}
                      <Button color="light" onClick={handlePaymentProceed}>
                        No Proceed to payment
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Modal
                    isOpen={modalRight}
                    toggle={() => setModalRight(!modalRight)}
                    wrapClassName="modal-right"
                  >
                    {!isRegistering && (
                      <ModalHeader>
                        <h5 className="modal-title">Register</h5>
                      </ModalHeader>
                    )}
                    <ModalBody>
                      {isRegistering && (
                        <div align="center">
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          {!registeringCompleted && <CircularProgress />}

                          <p>{registerMessage}</p>
                          {registeringCompleted && (
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-dismiss="modal"
                              onClick={handlePaymentProceed}
                            >
                              Proceed to Payment
                            </button>
                          )}
                        </div>
                      )}
                      {!isRegistering && (
                        <form>
                          <div className="form-group">
                            <label>FullName</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder
                              value={fullnme}
                              onChange={handleFullName}
                            />
                          </div>

                          <div className="form-group">
                            <label>Phone Number</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder
                              value={phoneNumber}
                              onChange={handlePhoneNumber}
                            />
                          </div>

                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder
                              value={email}
                              onChange={handleEmail}
                            />
                          </div>

                          <div className="form-group">
                            <label>Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder
                              onChange={handlePassword}
                            />
                          </div>

                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder
                              onChange={handleConfrimPassword}
                            />
                          </div>
                        </form>
                      )}
                    </ModalBody>

                    {!isRegistering && (
                      <ModalFooter>
                        <Button
                          color="light"
                          onClick={() => setModalRight(false)}
                        >
                          Cancel
                        </Button>{" "}
                        <Button color="secondary" onClick={handleRegistration}>
                          Submit and Pay
                        </Button>
                      </ModalFooter>
                    )}
                  </Modal>
                </Colxx>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
