import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import {
  Button,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import * as Yup from "yup";
import DropBox from "../uploader/dropBox";

const CreateTicket = ({ show = false, refresh, setShow, ...props }) => {
  const [modalRight, setModalRight] = useState(show);
  const formRef = useRef();
  const dropbox = useRef();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Modal
        isOpen={modalRight}
        toggle={() => {
          setModalRight(!modalRight);
          setShow(!modalRight);
          refresh();
        }}
        wrapClassName="modal-right"
      >
        <ModalHeader>Open a Ticket</ModalHeader>
        <ModalBody>
          <Formik
            innerRef={formRef}
            initialValues={{
              name: "",
              email: "Enter Email",
              category: "Select Category",
              image: "Select Image",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
            })}
            onSubmit={() => {
              setModalRight(false);
              setShow(!modalRight);
              refresh();
            }}
          >
            {({ errors, touched }) => (
              <Form
                className="av-tooltip tooltip-label-right"
                //onSubmit={props.handleSubmit}
              >
                <FormGroup>
                  <Label>Name</Label>
                  <Field
                    className="form-control"
                    name="name"
                    //validate={validateName}
                  />
                  {errors.name && touched.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Field
                    className="form-control"
                    placeholder="Enter FullName"
                    name="email"
                    //validate={validateName}
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Category</Label>
                  <Field
                    as="select"
                    className="form-control"
                    name="category"
                    //validate={validateName}
                  >
                    <option value="category">Select Category</option>
                  </Field>
                  {errors.category && touched.category && (
                    <div className="invalid-feedback d-block">
                      {errors.category}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Compalint</Label>
                  <Field
                    as="textarea"
                    className="form-control"
                    name="complaint"
                    rows="6"
                    //validate={validateName}
                  ></Field>
                  {errors.complaint && touched.complaint && (
                    <div className="invalid-feedback d-block">
                      {errors.complaint}
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label>Uplaod Error Image</Label>
                  <DropBox ref={dropbox} />
                </FormGroup>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              handleSubmit();
              //setModalRight(false);
              //setShow(!modalRight);
              //refresh();
            }}
          >
            Create
          </Button>{" "}
          <Button
            color="secondary"
            outline
            onClick={() => {
              setModalRight(false);
              setShow(!modalRight);
              //refresh();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default CreateTicket;
