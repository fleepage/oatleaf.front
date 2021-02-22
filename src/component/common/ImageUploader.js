import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import Row from "reactstrap/lib/Row";
import { Colxx } from "../common/CustomBootstrap";
import ImageCropper from "../common/ImageCropper";

const ImageUpload = ({
  intl,
  title = "Se;ect Image",
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
  handleLogoUploadToServer,
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

  const handleLogoUpload = (e) => {
    fileUpload.current.click();
  };

  const handleResetLogoUpload = () => {
    fileUpload.current.value = null;
    setInputImg("");
  };

  const handleSubmitImage = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleLogoUploadToServer = async () => {
  //   setLoader(true);
  //   setMessager("Uploading Logo...please wait");
  //   const response = await LogoUploadService({
  //     img: file,
  //     school: school,
  //     token: token,
  //   });

  //   if (response) {
  //     if (response?.status === 200) {
  //       if (response?.data?.isSuccess) {
  //         //console.log(response?.data);
  //         isSuccess(true);
  //         setLoader(false);
  //         setVisibled(true);
  //         setError(response?.data?.message ?? "process Completed");
  //         imager(croppedImage);
  //         next();
  //       } else {
  //         isSuccess(false);
  //         setLoader(false);
  //         setVisibled(true);
  //         setError(response?.data?.message ?? "Error Encounter");
  //       }
  //     } else {
  //       isSuccess(false);
  //       setLoader(false);
  //       setVisibled(true);
  //       setError(response?.data?.message ?? "Error Encounter..");
  //     }
  //   } else {
  //     isSuccess(false);
  //     setLoader(false);
  //     setVisibled(true);
  //     setError("Error Encounter.");
  //   }
  // };

  //const handleLogoUploadToServer = () => {};

  // const handleLogoSkip = () => {
  //   next();
  // };

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
            <p onClick={handleLogoUpload} style={{ cursor: "pointer" }}>
              Change
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
            {title}
          </Button>
        </Colxx>
      </Row>
      {/* <input type="file" onChange={handleSubmitImage} /> */}
      {blob && (
        <Row>
          <Colxx xxs="12" className="text-center">
            <Button onClick={() => handleLogoUploadToServer(file)}>Next</Button>
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

export default ImageUpload;
