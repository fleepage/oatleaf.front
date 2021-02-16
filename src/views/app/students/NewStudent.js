import React, { useState } from "react";
import Select from "react-select";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Row from "reactstrap/lib/Row";
import { Colxx } from "../../../component/common/CustomBootstrap";
import ImageUpload from "../../../component/common/ImageUploader";
import CustomSelectInput from "../../../component/DataList/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";

const NewStudent = ({
  modalOpen,
  toggleModal,
  gender,
  classes,
  toggleEditor,
}) => {
  const [stage, setStage] = useState(0);
  const [loading, setLoading] = useState(false);
  //const [] = useState()

  const makeStage = (s) => {
    switch (s) {
      case 0:
        return <StageZero setStage={setStage} loading={setLoading} />;
      case 1:
        return (
          <StageOne
            modalOpen={modalOpen}
            toggleModal={toggleModal}
            gender={gender}
            classes={classes}
            setStage={setStage}
            loading={setLoading}
          />
        );
      case 2:
        return (
          <StageTwo
            modalOpen={modalOpen}
            toggleModal={toggleModal}
            gender={gender}
            classes={classes}
            setStage={setStage}
            loading={setLoading}
            toggleEditor={toggleEditor}
          />
        );
      default:
        return <StageZero setStage={setStage} loading={setLoading} />;
    }
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      onClosed={() => {
        setStage(0);
      }}
    >
      <ModalHeader toggle={toggleModal}>New Student</ModalHeader>
      {!loading && makeStage(stage)}
      {loading && <div className="loading"></div>}
    </Modal>
  );
};

export default NewStudent;

const StageZero = ({ setStage, loading }) => {
  const handleProcessTransfer = () => {
    loading(true);
  };
  return (
    <ModalBody>
      <Row>
        <Colxx xxs="12" className="text-center">
          <p>
            Existing Student should request for transfer number from previous
            school (Note: previous school has to be on oatleaf platform for this
            to work.)
          </p>
          <div className="">
            <Label>Transfer Number:</Label>
            <Input />
            <Button
              color="primary"
              className="mt-2"
              onClick={handleProcessTransfer}
            >
              <IntlMessages id="pages.submit" />
            </Button>
          </div>
        </Colxx>
      </Row>
      <Row className="text-left">
        <Colxx xxs="12" className="text-center">
          <h1 className="text-muted mt-5">OR</h1>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="text-center">
          <p>
            If pupil has no previous school or previous school is not on oatleaf
            platform. New student record can be created.
          </p>
          <Button color="primary" className="mt-2" onClick={() => setStage(1)}>
            Add New Student
          </Button>
        </Colxx>
      </Row>
    </ModalBody>
  );
};

const StageOne = ({ modalOpen, toggleModal, gender, classes, setStage }) => {
  return (
    <>
      <ModalBody>
        <Label>First Name</Label>
        <Input />
        <Label className="mt-4">Last Name</Label>
        <Input />
        <Label className="mt-4">Other Name</Label>
        <Input />
        <Label className="mt-4">Gender</Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={gender}
        />
        <Label className="mt-4">Date Of Birth</Label>
        <Input type="date" />
        <Label className="mt-4">Assign Class</Label>
        <Select
          components={{ Input: CustomSelectInput }}
          className="react-select"
          classNamePrefix="react-select"
          name="form-field-name"
          options={classes}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          outline
          onClick={() => {
            setStage(0);
          }}
        >
          Back
        </Button>
        <Button
          color="primary"
          onClick={() => {
            //toggleModal();
            setStage(2);
          }}
        >
          <IntlMessages id="pages.submit" />
        </Button>{" "}
      </ModalFooter>
    </>
  );
};

const StageTwo = ({ setStage, toggleEditor, loading }) => {
  const [editor, setEditor] = useState(false);
  const handleProcessTransfer = () => {
    loading(true);
  };

  return (
    <>
      <ModalBody>
        <Row>
          <Colxx xxs="12" className="text-center mb-5 mt-5">
            <h1 className="text-muted">Student Photo</h1>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="text-center">
            <ImageUpload title={"Select Photo"} />
          </Colxx>
        </Row>
      </ModalBody>
    </>
  );
};
