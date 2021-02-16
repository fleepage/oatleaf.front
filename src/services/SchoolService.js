import axios from "axios";
import { BASE_URL } from "../constants/defaultValues";

export const VerifyIdentifierService = async (payload) => {
  //console.log(payload);
  try {
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "Content-Type": "application/json",
      },
    };
    var data = {
      identifier: payload.identifier,
    };

    let res = await axios.post(`${BASE_URL}/School/verify`, data, config);

    return res;
  } catch (error) {
    return error.response;
  }
};

export const RegisterSchoolService = async (payload) => {
  //console.log(payload);
  try {
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "Content-Type": "application/json",
      },
    };
    var data = {
      schoolDto: {
        user: 0,
        name: payload.name,
        isFreelancer: false,
        latitude: 0,
        longitude: 0,
        identifier: payload.identifier,
        email: payload.email,
        phone: payload.phone,
        addreess: payload.addreess,
        country: payload.country,
        region: payload.region,
        foundedAt: payload.foundedAt,
        founder: payload.founder,
        rate: 0,
        description: payload.description,
        isActive: true,
      },
    };

    let res = await axios.post(`${BASE_URL}/School/create`, data, config);

    return res;
  } catch (error) {
    return error.response;
  }
};

export const BuildClassesService = async (payload) => {
  try {
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "Content-Type": "application/json",
      },
    };
    let res = await axios.post(
      `${BASE_URL}/School/buildClasses`,
      payload.data,
      config
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const MakeCalenderService = async (payload) => {
  console.log(payload);
  try {
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "Content-Type": "application/json",
      },
    };
    let res = await axios.post(
      `${BASE_URL}/School/MakeCalender`,
      payload.data,
      config
    );
    return res;
  } catch (error) {
    return error.response;
  }
};

export const LogoUploadService = async (payload) => {
  //console.log(payload.img);
  try {
    const formData = new FormData();
    formData.append("logoDto.Logo", payload.img);
    formData.append("logoDto.School", payload.school);
    var config = {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        "content-type": "multipart/form-data",
        Accept: "*/*",
      },
    };

    let res = await axios.post(`${BASE_URL}/School/logo`, formData, config);

    //console.log(res.config);
    return res;
  } catch (error) {
    //console.log(error);
    return error.response;
  }
};
