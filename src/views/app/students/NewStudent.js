import { FormGroup } from "@material-ui/core";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import Alert from "reactstrap/lib/Alert";
import Form from "reactstrap/lib/Form";
import Row from "reactstrap/lib/Row";
import { Colxx } from "../../../component/common/CustomBootstrap";
import ImageUpload from "../../../component/common/ImageUploader";
import IntlMessages from "../../../helpers/IntlMessages";
import {
  RegisterStudentService,
  StudentPhotoUploadService,
} from "../../../services/studentService";

const NewStudent = ({
  modalOpen,
  toggleModal,
  gender,
  classes,
  toggleEditor,
  refresh,
  firstStage = 3,
  token,
}) => {
  const [stage, setStage] = useState(firstStage);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [student, setStudent] = useState({});

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
            setLoader={setLoading}
            isError={setIsError}
            errorMessage={setErrorMessage}
            success={setIsSuccess}
            visible={setVisible}
            token={token}
            student={setStudent}
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
            setLoader={setLoading}
            toggleEditor={toggleEditor}
            isError={setIsError}
            errorMessage={setErrorMessage}
            success={setIsSuccess}
            visible={setVisible}
            token={token}
            student={student}
          />
        );
      case 3:
        return (
          <StageThree
            modalOpen={modalOpen}
            toggleModal={toggleModal}
            gender={gender}
            classes={classes}
            setStage={setStage}
            loading={setLoading}
            toggleEditor={toggleEditor}
            isError={setIsError}
            errorMessage={setErrorMessage}
            success={setIsSuccess}
            visible={setVisible}
            token={token}
            student={setStudent}
          />
        );
      case 4:
        return (
          <StageFour
            modalOpen={modalOpen}
            toggleModal={toggleModal}
            gender={gender}
            classes={classes}
            setStage={setStage}
            loading={setLoading}
            isError={setIsError}
            errorMessage={setErrorMessage}
            success={setIsSuccess}
            visible={setVisible}
            token={token}
            student={setStudent}
          />
        );
      default:
        return (
          <StageZero
            setStage={setStage}
            loading={setLoading}
            isError={setIsError}
            errorMessage={setErrorMessage}
            success={setIsSuccess}
            visible={setVisible}
            token={token}
            student={setStudent}
          />
        );
    }
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
      onClosed={() => {
        setStage(firstStage);
        setLoading(false);
        refresh.current.onClick();
      }}
    >
      <ModalHeader toggle={toggleModal}>New Student</ModalHeader>
      {!loading && visible && (
        <Alert
          color={isSuccess ? "success" : "danger"}
          isOpen={visible}
          toggle={() => setVisible(!visible)}
        >
          {errorMessage}
        </Alert>
      )}
      {!loading && makeStage(stage)}
      {loading && !isError && (
        <>
          <div className="loading" />
        </>
      )}
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

const StageOne = ({
  modalOpen,
  toggleModal,
  gender,
  classes,
  setStage,
  setLoader,
  isError,
  errorMessage,
  success,
  visible,
  token,
  student,
}) => {
  const [selectedGender, setSelectedGender] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [oname, setOname] = useState();
  const [dob, setDob] = useState();

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    setLoader(true);
    const payload = {
      firstName: fname,
      lastName: lname,
      otherNames: oname,
      dateOfBirth: dob,
      gender: selectedGender,
      class: selectedClass,
      token: token,
    };

    const response = await RegisterStudentService(payload);
    if (response) {
      setLoader(false);
      if (response.status === 200 || response.status === 201) {
        success(true);
        visible(true);
        isError(false);
        student(response.data.student);
        //student();
        errorMessage(response?.data?.message ?? "Student has been Registered.");
        setStage(2);

        //toggleModal();
      } else {
        success(false);
        visible(true);
        isError(true);
        errorMessage(
          response?.data?.message ??
            "Error Encountered while registering student."
        );
        //toggleModal();
        //setStage(2);
      }
    } else {
      setLoader(false);
      success(false);
      visible(true);
      isError(true);
      errorMessage("Error Encountered...check your network conection.");
      //toggleModal();
      //setStage(2);
    }
  };
  return (
    <>
      <Form onSubmit={handleCreateStudent}>
        <ModalBody>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              required
              MinLength={3}
              defaultValue={fname}
              name="fname"
              onChange={(e) => setFname(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label className="mt-4">Last Name</Label>
            <Input
              required
              value={lname}
              MinLength={3}
              name="lname"
              onChange={(e) => setLname(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label className="mt-4">Other Name</Label>
            <Input
              name="oname"
              value={oname}
              onChange={(e) => setOname(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label className="mt-4">Gender</Label>
            <Input
              required
              type="select"
              name="gender"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">---Select Gender---</option>
              {gender.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.label}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label className="mt-4">Date Of Birth</Label>
            <Input
              type="date"
              required
              name="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label className="mt-4">Assign Class</Label>
            <Input
              required
              type="select"
              name="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">---Select Class---</option>
              {classes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </Input>
          </FormGroup>
        </ModalBody>
        <div className="text-center">
          <Button type="submit" color="primary">
            <IntlMessages id="pages.submit" />
          </Button>
        </div>
      </Form>
    </>
  );
};

const StageTwo = ({
  setStage,
  toggleEditor,
  loading,
  setLoader,
  isError,
  errorMessage,
  success,
  visible,
  token,
  student,
}) => {
  const [editor, setEditor] = useState(false);
  const handleProcessTransfer = () => {
    loading(true);
  };

  const handleStaging = (e) => {
    e.preventDefault();
    setStage(3);
  };

  const handleLogoUploadToServer = async (file) => {
    setLoader(true);
    //console.log(file);
    const payload = {
      username: student.admissionNumber,
      img: file,
      token: token,
    };

    const response = await StudentPhotoUploadService(payload);
    if (response) {
      setLoader(false);
      if (response.status === 200 || response.status === 201) {
        success(true);
        visible(true);
        isError(false);

        errorMessage(response?.data?.message ?? "Student photo uploaded.");
        setStage(3);

        //toggleModal();
      } else {
        success(false);
        visible(true);
        isError(true);
        errorMessage(
          response?.data?.message ??
            "Error Encountered while uploading student photo."
        );
        //toggleModal();
        //setStage(2);
      }
    } else {
      setLoader(false);
      success(false);
      visible(true);
      isError(true);
      errorMessage("Error Encountered...check your network conection.");
      //toggleModal();
      //setStage(2);
    }
  };

  return (
    <>
      <ModalBody>
        <Row>
          <Colxx xxs="12" className="text-center mb-5 mt-5">
            <h2 className="text-muted">Student Photo</h2>
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="text-center">
            <ImageUpload
              title={"Select Photo"}
              handleLogoUploadToServer={handleLogoUploadToServer}
            />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12" className="text-center mb-5 mt-5">
            <NavLink to="#" onClick={handleStaging}>
              Skip this stage
            </NavLink>
          </Colxx>
        </Row>
      </ModalBody>
    </>
  );
};

const StageThree = ({ setStage, loading, student }) => {
  const handleProcessTransfer = () => {
    loading(true);
  };

  const handleStaging = (e) => {
    e.preventDefault();
    setStage(1);
  };

  return (
    <ModalBody>
      <Row>
        <Colxx xxs="12" className="text-center">
          <h1 className="text-muted">Student Parent/Gaurdian</h1>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="text-center">
          <p>Existing user should use their oatleaf username.</p>
          <div className="">
            <Label>Parent Username:</Label>
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
          <p>If parent is not on oatleaf, a new account can be created.</p>
          <Button color="primary" className="mt-2" onClick={() => setStage(4)}>
            Add New Parent
          </Button>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="text-center mb-5 mt-5">
          <NavLink to="#" onClick={handleStaging}>
            Skip this stage
          </NavLink>
        </Colxx>
      </Row>
    </ModalBody>
  );
};

const StageFour = ({
  modalOpen,
  toggleModal,
  gender,
  classes,
  setStage,
  student,
}) => {
  const [email, setEmail] = useState("");
  return (
    <>
      <Form
        onSubmit={() => {
          //toggleModal();
          setStage(2);
        }}
      >
        <ModalBody>
          <FormGroup>
            <Label>First Name</Label>
            <Input required />
          </FormGroup>

          <FormGroup>
            <Label className="mt-4">Last Name</Label>
            <Input required />
          </FormGroup>

          <FormGroup>
            <Label className="mt-4">Email</Label>
            <Input
              type="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              required={email.length > 0}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label className="mt-4">Phone Number</Label>
            <Input required />
          </FormGroup>
        </ModalBody>
        <div className="text-center">
          <Button type="submit" color="primary">
            <IntlMessages id="pages.submit" />
          </Button>
        </div>
      </Form>
    </>
  );
};
