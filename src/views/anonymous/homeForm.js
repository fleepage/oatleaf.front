import React, { useContext, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Nav,
  NavItem,
  TabContent,
  TabPane,
  FormGroup,
  Button,
} from "reactstrap";
import {
  LevelThreeService,
  BillerService,
  LevelOneService,
  LevelTwoService,
  MetaDataService,
} from "../../services/BillService";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
import { BillContext } from "../../context/BillContext";
import { BillActionStore } from "../../actions/BillAction";
import SweetAlert from "react-bootstrap-sweetalert";
import * as Yup from "yup";
import classnames from "classnames";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { customStyles } from "../../component/common/selectCss";

import DashBoard from "../app/dashboards";

const options = [{ value: "chocolate", label: "Select" }];

const HomeForm = ({ openTab = 1, ...props }) => {
  const { dispatch, bill } = useContext(BillContext);

  const [metaData, setMetaData] = useState({});
  const [isChoice, setIsChoice] = useState(false);
  const [selectedService, setSelectedService] = useState({});

  const [tempTotal, setTempTotal] = useState(0);
  const [tempAmount, setTempAmount] = useState(0);
  const [tempQuantity, setTempQuantity] = useState(1);
  const [tempAmountFixed, setTempAmountFixed] = useState(false);
  const [tempQuantityFixed, setTempQuantityFixed] = useState(false);

  const [showDialog, setShowDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(openTab);
  const [isServiceEmpty, setIsServiceEmpty] = useState(false);

  //state bills
  const [billerVal, setBillerVal] = useState("");
  const [mdaVal, setMdaVal] = useState("");
  const [revenueVal, setRevenueVal] = useState("");
  const [serviceVal, setServiceVal] = useState([]);

  //utility bills
  const [utilityVal, setUtilityVal] = useState("");
  const [providerVal, setProviderVal] = useState("");
  const [utilityNumberVal, setUtilityNumberVal] = useState("");
  const [providerChoiceVal, setProviderChoiceVal] = useState("");
  const [amountVal, setAmountVal] = useState(0);

  //state bills
  const [biller, setBiller] = useState("Select Biller");
  const [mda, setMda] = useState("Select Option");
  const [revenue, setRevenue] = useState("Select Option");
  const [service, setService] = useState("Select Option");

  //utility bills

  const [utility, setUtility] = useState("Select Utility");
  const [provider, setProvider] = useState("Select Provider");
  const [providerChoices, setProviderChoices] = useState("Select Choice");

  const [utilityOptions, setUtilityOptions] = useState([]);
  const [providerOptions, setProviderOptions] = useState([]);
  const [providerChoicesOptions, setProviderChoicesOptions] = useState([]);

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

  //utility bills
  const [utilityLoading, setUtilityLoading] = useState(false);
  const [providerLoading, setProviderLoading] = useState(false);

  //const [services,setServices] = useState([{name: 'Srigar', id: 1},{name: 'Sam', id: 2},,{name: 'ham', id: 3},,{name: 'pam', id: 4},,{name: 'dam', id: 5}]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const onSelect = (selectedList, selectedItem, completer) => {
    setServiceVal(selectedList);
    setSelectedService(selectedItem);
    setShowAddDialog(true);

    setTempAmount(selectedItem.amount);
    setTempQuantity(selectedItem.quantity);
    setTempAmountFixed(selectedItem.isAmountFixed);
    setTempQuantityFixed(false);
    setTempTotal(+selectedItem.quantity * +selectedItem.amount);
    //setisLoading(true);
    //completer(selectedItem);
    //_completer = completer;
    //setCompleter(completer);
  };

  const onRemove = (selectedList, removedItem) => {
    setServiceVal(selectedList);
  };

  const handleCancel = async () => {
    let index = 0;
    //setisLoading(false);
    setShowAddDialog(false);
    index = serviceVal.findIndex((i) => i["id"] === selectedService["id"]);
    setServiceVal(serviceVal.filter((data, idx) => idx !== index));
  };

  const handleAdd = async () => {
    setisLoading(false);
    setShowAddDialog(false);
    setIsServiceEmpty(false);
    setShowDialog(false);
    let index = 0;
    index = serviceVal.findIndex((i) => i["id"] === selectedService["id"]);
    serviceVal[index].amount = tempAmount;
    serviceVal[index].quantity = tempQuantity;
    setServiceVal(serviceVal);
  };

  const handleTempAmount = async (e) => {
    setTempAmount(e.target.value);
    setTempTotal(+tempQuantity * +e.target.value);
  };

  const handleTempQuantity = async (e) => {
    setTempQuantity(e.target.value);
    setTempTotal(+e.target.value * +tempAmount);
  };

  const onConfirm = async () => {
    setShowDialog(false);
  };

  const onCancel = async () => {
    setShowDialog(false);
  };

  const onAddDialogCancel = async () => {
    setShowAddDialog(false);
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
    //e.preventDefault();
    dispatch(
      BillActionStore({
        isStateBill: true,

        data: {
          Biller: billerVal,
          Mda: mdaVal,
          Revenue: revenueVal,
          Services: serviceVal,
        },
      })
    );
    props.history.push("/details");
  };

  const onPayUtilityBills = async (e) => {
    //e.preventDefault();
    dispatch(
      BillActionStore({
        isStateBill: false,

        data: {
          Utility: utilityVal,
          Provider: providerVal,
          UtilityNumber: utilityNumberVal,
          Amount: amountVal,
          Choice: providerChoiceVal,
          isChoiced: isChoice,
        },
      })
    );
    //props.history.push("/checkout");
    window.location = "/details";
  };

  const handleBillerSelect = async (e) => {
    setMdaLoading(true);
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
    //setisLoading(false);
  };

  const handleUtilitySelect = async (e) => {
    var ischoiced = e.value == "Dstv";
    setProviderLoading(true);
    setUtilityVal(e);
    setIsChoice(ischoiced);

    ischoiced
      ? setProviderChoices("Fetching Provider Options..please wait")
      : setProvider("Fetching Provider..please wait");
    await timeout(6000);
    setProviderLoading(false);
    ischoiced
      ? setProviderChoices("Select Choice")
      : setProvider("Select Provider");

    if (!ischoiced)
      setProviderOptions([
        { label: "MTN", value: 1 },
        { label: "Airtel", value: 2 },
        { label: "9mobile", value: 3 },
        { label: "Glo", value: 4 },
      ]);
    else
      setProviderChoicesOptions([
        { label: "Basic", value: 1 },
        { label: "Premium", value: 2 },
      ]);
    //setisLoading(false);
  };
  const handleProviderSelect = async (e) => {
    setProviderVal(e);
  };

  const handleChoiceSelect = async (e) => {
    setProviderChoiceVal(e);
  };

  const handleAmount = async (e) => {
    setAmountVal(e.target.value);
  };

  const handleUtilityNumber = async (e) => {
    setUtilityNumberVal(e.target.value);
  };

  const timeout = async (delay) => {
    return new Promise((res) => setTimeout(res, delay / 1000));
  };

  const billerOption = (inputValue) => {
    //const billers = await BillerService({});
    //console.log(billers);

    BillerService({}).then((data) => {
      return data;
    });
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

  const loadUtilityOptions = (inputValue, callback) => {
    // if (billerOptions.length > 0) {
    //   callback(
    //     billerOptions.filter((i) =>
    //       i.label.toLowerCase().includes(inputValue.toLowerCase())
    //     )
    //   );
    // } else {
    //   BillerService({}).then((data) => {
    //     setBillerOptions(data);
    //     callback(
    //       data.filter((i) =>
    //         i.label.toLowerCase().includes(inputValue.toLowerCase())
    //       )
    //     );
    //   });
    // }
    const data = [
      { label: "Electricity", value: "Electricity" },
      { label: "Airtime", value: "Airtime" },
      { label: "Dstv", value: "Dstv" },
    ];
    callback(
      data.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div className="row screenshots">
        <div className="col-12 text-center mb-4">
          <Nav tabs className="justify-content-center">
            <NavItem key={`app_nav_1`}>
              <a
                href="#tab"
                className={classnames({
                  "nav-link ": true,
                  active: activeTab === 1,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  toggle(1);
                }}
              >
                <p className="nav-link-text">State Bills</p>
              </a>
            </NavItem>
            <NavItem key={`app_nav_2`}>
              <a
                href="#tab"
                className={classnames({
                  "nav-link": true,
                  active: activeTab === 2,
                })}
                onClick={(event) => {
                  event.preventDefault();
                  toggle(2);
                }}
              >
                <p className="nav-link-text">Utility Bills</p>
              </a>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane key={`app_tab_1`} tabId={1}>
              <div
                style={{ width: 100 + "%", padding: 50 }}
                className="app-image text-center outer"
              >
                <div className="form-side below">
                  <h3 className="white">Pay State Bills</h3>
                  <Formik
                    initialValues={{
                      biller: "Select Biller",
                      mda: "Select MDA",
                      revenueHead: "Select Revenue Head",
                    }}
                    validationSchema={Yup.object().shape({
                      biller: Yup.string()
                        .required("Biller is required")
                        .notOneOf(["Select Biller"], "Select a valid Biller"),
                      mda: Yup.string()
                        .required("Mda is required")
                        .notOneOf(
                          ["Select MDA", "Fetching MDA..please wait"],
                          "Select a valid Mda"
                        ),
                      revenueHead: Yup.string()
                        .required("Revenue Head is required")
                        .notOneOf(
                          [
                            "Select Revenue Head",
                            "Fetching Revenue..please wait",
                          ],
                          "Select a valid Revenue Head"
                        ),
                    })}
                    onSubmit={(e, fields) => {
                      if (serviceVal.length > 0) {
                        onPayStateBills();
                      } else {
                        setIsServiceEmpty(true);
                      }
                    }}
                    render={({ errors, status, touched, setFieldValue }) => (
                      <Form
                        className="av-tooltip tooltip-label-bottom"
                        //onSubmit={onPayStateBills}
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
                                styles={customStyles}
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
                          {/* <div className={billerLoading ? "col-10" : "col-12"}>
                            <FormGroup className="form-group has-float-label ">
                              <select
                                className="form-control selection p-3"
                                name="biller"
                                //onChange={handleBillerSelect}
                                onChange={(e) => {
                                  setFieldValue("biller", e.target.value);
                                  handleBillerSelect(e);
                                }}
                              >
                                <option selected value="Select Biller">
                                  Select Biller
                                </option>
                                <option value="Yobe">Yobe</option>
                                <option value="Jigawa">Jigawa</option>
                                <option value="Kebbi">Kebbi</option>
                              </select>
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
                              <CircularProgress color="white" />
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
                                styles={customStyles}
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
                              <select
                                className="form-control selection p-3"
                                name="mda"
                                onChange={(e) => {
                                  setFieldValue("mda", e.target.value);
                                  handleMdaSelect(e);
                                }}
                                //onChange={handleMdaSelect}
                              >
                                <option selected value={mda}>
                                  {mda}
                                </option>
                                {mdaOptions.map((option) => (
                                  <option value={option}>{option}</option>
                                ))}
                              </select>
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
                              <CircularProgress color="white" />
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
                                styles={customStyles}
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
                          <div className={revenueLoading ? "col-10" : "col-12"}>
                            <FormGroup className="form-group has-float-label">
                              <select
                                className="form-control selection p-3"
                                name="revenueHead"
                                onChange={(e) => {
                                  setFieldValue("revenueHead", e.target.value);
                                  handleRevenueSelect(e);
                                }}
                                //onChange={handleRevenueSelect}
                              >
                                <option selected value={revenue}>
                                  {revenue}
                                </option>
                                {revenueOptions.map((option) => (
                                  <option value={option}>{option}</option>
                                ))}
                              </select>
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
                              <CircularProgress color="white" />
                            </div>
                          )}
                        </div> */}

                        <div className="row">
                          <div className={serviceLoading ? "col-10" : "col-12"}>
                            {isServiceEmpty && (
                              <div className="invalid-feedback d-block">
                                Select Service(s)
                              </div>
                            )}
                            <br />
                          </div>
                          {serviceLoading && (
                            <div className="col-2">
                              <CircularProgress color="white" />
                            </div>
                          )}
                        </div>

                        <div className="d-flex  align-items-center">
                          <Button
                            color="primary"
                            className={`btn btn-secondary btn-secondary-orange btn-xl mr-2 mb-2`}
                            size="lg"
                          >
                            <span className="label">Pay Now</span>
                          </Button>
                        </div>
                      </Form>
                    )}
                  />
                </div>

                {isLoading && (
                  <div className="form-side top text-center">
                    <div style={{ margin: "auto" }}>
                      <br />
                      <h3 className="black">{selectedService.name}</h3>
                      <div className={`align-items-center active-moda`}>
                        <div>
                          <input
                            type="text"
                            className="form-control p-3"
                            placeholder="Quantity"
                            onChange={handleTempQuantity}
                          />
                          <br />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="form-control p-3"
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
                        <span className="spinner d-inline-block"></span>
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
            </TabPane>
            <TabPane key={`app_tab_2`} tabId={2}>
              <div
                style={{ width: 100 + "%", padding: 50 }}
                className="app-image text-center outer"
              >
                <div className="form-side below">
                  <h3 className="white">Pay Utility Bills</h3>
                  <Formik
                    initialValues={{
                      utility: "Select Utility",
                      provider: "Select Provider",
                      providerChoices: "Select Choice",
                      utilityNumber: "",
                      amount: "",
                    }}
                    // validationSchema={Yup.object().shape({
                    //   utility: Yup.string()
                    //     .required("Utility is required")
                    //     .notOneOf(["Select Utility"], "Select a valid Utility"),
                    //   //   provider: Yup.string()
                    //   //     .required("Provider is required")
                    //   //     .notOneOf(
                    //   //       ["Select Provider", "Fetching Provider..please wait"],
                    //   //       "Select valid Provider"
                    //   //     ),
                    //   //   providerChoices: Yup.string()
                    //   //     .required("Choice is required")
                    //   //     .notOneOf(
                    //   //       ["Select Choice", "Fetching Choice..please wait"],
                    //   //       "Select a valid Choice"
                    //   //     ),
                    //   utilityNumber: Yup.string().required(
                    //     "utility Number is required"
                    //   ),

                    //   amount: Yup.string().required("Amount is required"),
                    // })}
                    onSubmit={(e, fields) => {
                      onPayUtilityBills();
                    }}
                    render={({ errors, status, touched, setFieldValue }) => (
                      <Form
                        className="av-tooltip tooltip-label-bottom"
                        //onSubmit={onPayUtilityBills}
                      >
                        <div className="row">
                          <div className="col-12">
                            <FormGroup className="form-group ">
                              <AsyncSelect
                                //options={options}
                                cacheOptions
                                loadOptions={loadUtilityOptions}
                                defaultOptions
                                name="utility"
                                styles={customStyles}
                                //isLoading

                                placeholder="Select Utility"
                                loadingMessage={() =>
                                  "fetching Utility.. plase wait"
                                }
                                noOptionsMessage={() => "No Utility available"}
                                onChange={(e) => {
                                  setFieldValue("utility", e);
                                  handleUtilitySelect(e);
                                }}
                              />
                              {errors.utility && touched.utility && (
                                <div className="invalid-feedback d-block">
                                  {errors.utility}
                                </div>
                              )}
                              <br />
                            </FormGroup>
                          </div>
                          {/* <div className={utilityLoading ? "col-10" : "col-12"}>
                            <FormGroup className="form-group has-float-label">
                              <Field
                                as="select"
                                className="form-control selection p-3"
                                name="utility"
                                onChange={(e) => {
                                  setFieldValue("utility", e.target.value);
                                  handleUtilitySelect(e);
                                }}

                                //onChange={handleUtilitySelect}
                              >
                                <option selected value="Select Utility">
                                  Select Utility
                                </option>
                                <option value="Dstv" style={{ color: "black" }}>
                                  Dstv
                                </option>
                                <option value="Electricity">Electricity</option>
                                <option value="Airtime">Airtime</option>
                              </Field>
                              {errors.utility && touched.utility && (
                                <div className="invalid-feedback d-block">
                                  {errors.utility}
                                </div>
                              )}
                              <br />
                            </FormGroup>
                          </div>
                          {utilityLoading && (
                            <div className="col-2">
                              <CircularProgress color="white" />
                            </div>
                          )} */}
                        </div>

                        {!isChoice && (
                          <div className="row">
                            <div className="col-12">
                              <FormGroup className="form-group ">
                                <Select
                                  //options={options}
                                  isLoading={providerLoading}
                                  options={providerOptions}
                                  name="provider"
                                  styles={customStyles}
                                  //isLoading

                                  placeholder={provider}
                                  loadingMessage={() => provider}
                                  noOptionsMessage={() =>
                                    "No Provider available"
                                  }
                                  onChange={(e) => {
                                    setFieldValue("provider", e);
                                    handleProviderSelect(e);
                                  }}
                                />
                                {errors.provider && touched.provider && (
                                  <div className="invalid-feedback d-block">
                                    {errors.provider}
                                  </div>
                                )}
                                <br />
                              </FormGroup>
                            </div>
                          </div>
                          // <div className="row">
                          //   <div
                          //     className={providerLoading ? "col-10" : "col-12"}
                          //   >
                          //     <FormGroup className="form-group has-float-label">
                          //       <select
                          //         className="form-control selection p-3"
                          //         name="provider"
                          //         onChange={(e) => {
                          //           setFieldValue("provider", e.target.value);
                          //           handleProviderSelect(e);
                          //         }}
                          //         // onChange={handleProviderSelect}
                          //       >
                          //         <option selected value={provider}>
                          //           {provider}
                          //         </option>
                          //         {providerOptions.map((option) => (
                          //           <option value={option.name}>
                          //             {option.name}
                          //           </option>
                          //         ))}
                          //       </select>
                          //       {errors.provider && touched.provider && (
                          //         <div className="invalid-feedback d-block">
                          //           {errors.provider}
                          //         </div>
                          //       )}
                          //       <br />
                          //     </FormGroup>
                          //   </div>
                          //   {providerLoading && (
                          //     <div className="col-2">
                          //       <CircularProgress color="white" />
                          //     </div>
                          //   )}
                          // </div>
                        )}

                        {isChoice && (
                          <div className="row">
                            <div className="col-12">
                              <FormGroup className="form-group ">
                                <Select
                                  //options={options}
                                  isLoading={providerLoading}
                                  options={providerChoicesOptions}
                                  name="providerChoices"
                                  styles={customStyles}
                                  //isLoading

                                  placeholder={providerChoices}
                                  loadingMessage={() => providerChoices}
                                  noOptionsMessage={() =>
                                    "No Provider available"
                                  }
                                  onChange={(e) => {
                                    setFieldValue("providerChoices", e);
                                    handleChoiceSelect(e);
                                  }}
                                />
                                {errors.providerChoices &&
                                  touched.providerChoices && (
                                    <div className="invalid-feedback d-block">
                                      {errors.providerChoices}
                                    </div>
                                  )}
                                <br />
                              </FormGroup>
                            </div>
                          </div>
                          // <div className="row">
                          //   <div
                          //     className={providerLoading ? "col-10" : "col-12"}
                          //   >
                          //     <FormGroup className="form-group has-float-label">
                          //       <select
                          //         className="form-control selection p-3"
                          //         name="providerChoices"
                          //         onChange={(e) => {
                          //           setFieldValue(
                          //             "providerChoices",
                          //             e.target.value
                          //           );
                          //           handleChoiceSelect(e);
                          //         }}
                          //         // onChange={handleChoiceSelect}
                          //       >
                          //         <option selected value={providerChoices}>
                          //           {providerChoices}
                          //         </option>
                          //         {providerChoicesOptions.map((option) => (
                          //           <option value={option.name}>
                          //             {option.name}
                          //           </option>
                          //         ))}
                          //       </select>
                          //       {errors.providerChoices &&
                          //         touched.providerChoices && (
                          //           <div className="invalid-feedback d-block">
                          //             {errors.providerChoices}
                          //           </div>
                          //         )}
                          //       <br />
                          //     </FormGroup>
                          //   </div>
                          //   {providerLoading && (
                          //     <div className="col-2">
                          //       <CircularProgress color="white" />
                          //     </div>
                          //   )}
                          // </div>
                        )}

                        <FormGroup>
                          <input
                            type="text"
                            name="utilityNumber"
                            className="form-control selection p-3"
                            placeholder="Utility Number i.e meter number, dstv number etc."
                            onChange={(e) => {
                              setFieldValue("utilityNumber", e.target.value);
                              handleUtilityNumber(e);
                            }}
                            //onChange={handleUtilityNumber}
                          />
                          {errors.utilityNumber && touched.utilityNumber && (
                            <div className="invalid-feedback d-block">
                              {errors.utilityNumber}
                            </div>
                          )}
                          <br />
                        </FormGroup>

                        {!isChoice && (
                          <FormGroup>
                            <input
                              type="number"
                              name="amount"
                              className="form-control selection p-3"
                              placeholder="Amount"
                              onChange={(e) => {
                                setFieldValue("amount", e.target.value);
                                handleAmount(e);
                              }}
                              //onChange={handleAmount}
                            />
                            {errors.amount && touched.amount && (
                              <div className="invalid-feedback d-block">
                                {errors.amount}
                              </div>
                            )}
                            <br />
                          </FormGroup>
                        )}

                        <div className="d-flex  align-items-center">
                          <Button
                            color="primary"
                            className={`btn btn-secondary btn-secondary-orange btn-xl mr-2 mb-2`}
                            size="lg"
                          >
                            <span className="spinner d-inline-block"></span>
                            <span className="label">Pay Now</span>
                          </Button>
                        </div>
                      </Form>
                    )}
                  />
                </div>
              </div>
            </TabPane>
          </TabContent>
        </div>
      </div>
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
    </div>
  );
};

export default HomeForm;
