import axios from "axios";

import { ADMIN_LOGIN_URL, BASE_URL } from "../constants/defaultValues";

export const MdaService = async (payload) => {
  try {
    const formData = new FormData();
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    let res = await axios.post(ADMIN_LOGIN_URL, formData);
    return res.data;
    //return ["Hospital","Schools"];
  } catch (error) {
    //console.log(error);
  }
};

export const BillerService = async (payload) => {
  try {
    const formData = new FormData();

    let res = await axios.get(`http://35.193.238.146/api/Biller/GetAllBillers`);

    return res.data.map((item) => {
      var option = {};
      option.value = item.id;
      option.label = item.name;
      return option;
    });
  } catch (error) {
    return [];
  }
};

export const MetaDataService = async (payload) => {
  try {
    let res = await axios.get(
      `${BASE_URL}/ApplicationData/GetMetaData/${payload.biller}`
    );
    return res.data;
  } catch (error) {
    return {
      fieldOne: "MDA",
      fieldTwo: "Reveneheads",
      fieldThree: "Subheads/Items",
      fieldFour: null,
      fieldFive: null,
      fieldSix: null,
      fieldSeven: null,
      fieldEight: null,
    };
  }
};

export const LevelOneService = async (payload) => {
  try {
    let res = await axios.get(
      `${BASE_URL}/LevelOne/GetAllLevelOneByBiller/${payload.biller}`
    );
    return res.data.map((item) => {
      var option = {};
      option.value = item.id;
      option.label = item.name;
      return option;
    });
  } catch (error) {
    return [];
  }
};

export const LevelTwoService = async (payload) => {
  try {
    let res = await axios.get(
      `${BASE_URL}/LevelTwo/GetAllLevelTwoByBiller/${payload.levelOne}`
    );
    return res.data.map((item) => {
      var option = {};
      option.value = item.id;
      option.label = item.name;
      return option;
    });
  } catch (error) {
    return [];
  }
};

export const LevelThreeService = async (payload) => {
  try {
    let res = await axios.get(
      `${BASE_URL}/LevelThree/GetAllLevelThreeByBiller/${payload.levelTwo}`
    );
    return res.data.map((item) => {
      // delete Object.assign(item, { ["value"]: item["id"] })["id"];
      var option = {};
      option.id = item.id;
      option.name = item.name;
      option.isAmountFixed = item.isAmountFixed;
      option.amount = item.amount;
      option.quantity = 1;
      return option;
    });
    //return ["Hospital","Schools"];
  } catch (error) {
    return [];
    //console.log(error);
  }
};
