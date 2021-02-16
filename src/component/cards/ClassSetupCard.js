/* eslint-disable react/no-array-index-key */
import CloseIcon from "@material-ui/icons/Close";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { NavLink } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { validateName } from "../../helpers/Validator";
import { BuildClassesService } from "../../services/SchoolService";

const ClassSetupCard = ({
  data,
  schoolId,
  setupId,
  token,
  next,
  setLoader,
  setMessager,
  setError,
  setVisibled,
  isSuccess,
}) => {
  const [classSetup, setClassSetup] = useState(data.features);
  const [categoryModal, setCategoryModal] = useState(false);
  const [isDefault] = useState(data.title === "Default");
  const [name] = useState("");
  const [index] = useState(0);

  const alphabeth = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const initialValues = {
    name,
    index,
  };

  const BuildClasses = async () => {
    const data = {
      classesDto: {
        schoolId: schoolId,
        setupId: setupId,
        classGroupDto: [...classSetup],
      },
    };
    setLoader(true);
    setMessager("Building Classes...please wait");
    const response = await BuildClassesService({ token: token, data: data });
    if (response) {
      if (response?.status === 200) {
        if (response?.data?.isSuccess) {
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
  const handleUseTemplate = () => {};
  const handleAdd = (values) => {
    setClassSetup([
      ...classSetup,
      {
        groupName: values.name,
        classCategorys: [
          {
            stage: 1,
            classCategoryItems: [{ stage: "A" }],
          },
        ],
      },
    ]);
    setCategoryModal(false);
  };

  const handleAddCategory = () => {
    setCategoryModal(true);
  };
  const handleAddClass = (index) => {
    var temp = classSetup;
    temp[index].classCategorys.push({
      stage: temp[index].classCategorys.length + 1,
      classCategoryItems: [{ stage: "A" }],
    });
    setClassSetup(temp);
  };
  const handleAddSubClass = (pindex, cindex) => {
    var temp = classSetup;
    temp[pindex].classCategorys[cindex].classCategoryItems.push({
      stage:
        alphabeth[
          temp[pindex].classCategorys[cindex].classCategoryItems.length
        ],
    });
    setClassSetup(temp);
  };

  const handleDeleteCategory = (index) => {
    var temp = classSetup;
    temp.splice(index, 1);
    setClassSetup(temp);
  };

  const handleDeleteClass = (index) => {
    var temp = classSetup;
    temp[index].classCategorys.pop();
    setClassSetup(temp);
  };
  const handleDeleteSubClass = (pindex, cindex) => {
    var temp = classSetup;
    temp[pindex].classCategorys[cindex].classCategoryItems.pop();
    setClassSetup(temp);
  };

  return (
    <Card>
      <CardBody className="pt-5 pb-5 d-flex flex-lg-column flex-md-row flex-sm-row flex-column">
        <div className="price-top-part text-center">
          <h5 className="mb-0 font-weight-semibold color-theme-1 mb-4">
            {data.title}
          </h5>

          <p className="text-muted text-small">{data.detail}</p>
          <p className="text-small">
            <strong>Tip: </strong>{" "}
            <span className="text-muted">
              Hover on each item to take further action.
            </span>
          </p>
          {!isDefault && (
            <Button outline onClick={handleAddCategory}>
              <IntlMessages id="school.category" />{" "}
            </Button>
          )}
        </div>
        <div className="pl-0 pr-0 pt-3 pb-0 d-flex price-feature-list flex-column flex-grow-1">
          <div className="" style={{ height: "300px" }}>
            <PerfectScrollbar
              options={{ suppressScrollX: false, wheelPropagation: false }}
            >
              {classSetup.map((feature, index) => {
                return (
                  <div
                    className="mb-5"
                    key={index}
                    style={{ borderBottom: "1px solid rgb(200,200,200)" }}
                  >
                    <p className="mb-2">
                      <NavLink to="#" className="menu-setup-header">
                        <span class="text-bold">{feature.groupName}</span>
                        &nbsp;
                        {!isDefault && (
                          <span className="menu-setup ">
                            <Button
                              outline
                              size="xs"
                              onClick={() => handleAddClass(index)}
                            >
                              new class
                            </Button>{" "}
                            <Button
                              outline
                              color="danger"
                              size="xs"
                              onClick={() => handleDeleteCategory(index)}
                            >
                              delete
                            </Button>
                          </span>
                        )}
                      </NavLink>
                    </p>
                    <div>
                      {feature.classCategorys.map((klass, i) => {
                        return (
                          <div
                            key={i}
                            style={{
                              backgroundColor:
                                i % 2 == 0 ? "#9bf4b9" : "#b1f4de",
                            }}
                            className="pl-1 pt-2 pb-2 mb-2"
                          >
                            <p className="mb-2 text-bold">
                              <NavLink to="#" className="menu-setup-header">
                                {feature.groupName + " " + klass.stage}
                                &nbsp;
                                <span className="menu-setup ">
                                  <Button
                                    size="xs"
                                    onClick={() => handleAddSubClass(index, i)}
                                  >
                                    new subclass
                                  </Button>{" "}
                                  {feature.classCategorys.length > 1 &&
                                    feature.classCategorys.length === i + 1 && (
                                      <Button
                                        size="xs"
                                        onClick={() => handleDeleteClass(index)}
                                      >
                                        delete
                                      </Button>
                                    )}
                                </span>
                              </NavLink>
                            </p>
                            <div>
                              {klass.classCategoryItems.map((subklass, ii) => {
                                return (
                                  <div key={ii} className="ml-2 mb-2">
                                    <p className="mb-2 ">
                                      <NavLink
                                        to="#"
                                        className="menu-setup-header"
                                      >
                                        {klass.stage + subklass.stage}
                                        &nbsp;
                                        {klass.classCategoryItems.length > 1 &&
                                          klass.classCategoryItems.length ===
                                            ii + 1 && (
                                            <NavLink
                                              to="#"
                                              className="menu-setup "
                                              onClick={() =>
                                                handleDeleteSubClass(index, i)
                                              }
                                            >
                                              <CloseIcon
                                                style={{ fontSize: "18" }}
                                              />
                                            </NavLink>
                                          )}
                                      </NavLink>
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </PerfectScrollbar>
          </div>
          <div className="text-center mt-5">
            <Button onClick={BuildClasses}>
              <IntlMessages id="school.classChoice" />{" "}
            </Button>
          </div>
        </div>
      </CardBody>
      <Modal
        isOpen={categoryModal}
        toggle={() => setCategoryModal(!categoryModal)}
        backdrop={false}
      >
        <ModalHeader>Add New Category</ModalHeader>
        <ModalBody>
          <Formik initialValues={initialValues} onSubmit={handleAdd}>
            {({ errors, touched, values }) => (
              <Form>
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="school.categoryname" />
                  </Label>
                  <Field
                    type="input"
                    name="name"
                    className="form-control"
                    validate={validateName}
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </FormGroup>
                {/* <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    <IntlMessages id="school.categoryposition" />
                  </Label>
                  <Field
                    as="select"
                    name="index"
                    className="form-control"
                    //validate={validateFName}
                  >
                    {classSetup.map((feature, index) => {
                      return (
                        <>
                          <option value={index}>
                            Before -- {feature.name}
                          </option>
                          <option value={index + 1}>
                            After -- {feature.name}
                          </option>
                        </>
                      );
                    })}
                  </Field>
                </FormGroup> */}
                <div className="d-flex justify-content-between align-items-center">
                  <Button color="light" onClick={() => setCategoryModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    //onClick={() => setCategoryModal(false)}
                  >
                    Add
                  </Button>
                </div>{" "}
              </Form>
            )}
          </Formik>
        </ModalBody>
      </Modal>
    </Card>
  );
};

export default React.memo(ClassSetupCard);
