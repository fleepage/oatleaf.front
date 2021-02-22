import axios from "axios";
import { BASE_URL } from "../constants/defaultValues";

export const RegisterStudentService = async (payload) => {
  //console.log(payload);
  try {
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "Content-Type": "application/json",
      },
    };
    var data = {
      registerDto: {
        newUser: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          otherNames: payload.otherNames,
          dateOfBirth: payload.dateOfBirth,
          gender: payload.gender,
          password: "string",
          passwordConfirmation: "string",
        },
        classId: payload.class,
        userId: 0,
        schoolId: 0,
        comment: "new Student created",
        admissionNumber: "string",
        admissionDate: undefined,
        graduationDate: undefined,
        admittedBy: 0,
      },
    };

    let res = await axios.post(`${BASE_URL}/Student/register`, data, config);

    return res;
  } catch (error) {
    //console.log(error.response);
    return error.response;
  }
};

export const StudentPhotoUploadService = async (payload) => {
  //console.log(payload.img);
  try {
    const formData = new FormData();
    formData.append("photoDto.Photo", payload.img);
    formData.append("photoDto.Username", payload.username);
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "content-type": "multipart/form-data",
        Accept: "*/*",
      },
    };

    let res = await axios.post(`${BASE_URL}/Student/photo`, formData, config);

    //console.log(res.config);
    return res;
  } catch (error) {
    //console.log(error);
    return error.response;
  }
};
