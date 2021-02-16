// ImageCropper.js

import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "reactstrap";
import { getCroppedImg } from "./cropImage";

const ImageCropper = ({ getBlob, inputImg, isEditor, clear }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [modalBasic, setModalBasic] = useState(true);
  const [croppedArea, setCroppedArea] = useState();

  /* onCropComplete() will occur each time the user modifies the cropped area, 
    which isn't ideal. A better implementation would be getting the blob 
    only when the user hits the submit button, but this works for now  */
  const onCropComplete = async (_, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleDone = async () => {
    const croppedImage = await getCroppedImg(inputImg, croppedArea);
    getBlob(croppedImage);
    isEditor(false);
    clear("");
  };

  return (
    /* need to have a parent with `position: relative` 
    to prevent cropper taking up whole page */
    <div className="cropper- text-center">
      <div className="Crop-App- text-center">
        <div className="text-left mb-2 ">
          <h2 className="text-muted">Image Crop</h2>
        </div>
        <div className="crop-container- text-center">
          <Cropper
            style={{
              containerStyle: {
                height: 400,
                position: "relative",
              },
            }}
            image={inputImg}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="Crop-controls- text-center mt-5">
          <div
            style={{
              backgroundColor: "transparent",
              width: "100%",
            }}
          >
            <Button size="xs" className="mr-5" onClick={handleDone}>
              Okay
            </Button>
            <Button
              outline
              color="danger"
              size="xs"
              onClick={() => {
                isEditor(false);
                clear("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
