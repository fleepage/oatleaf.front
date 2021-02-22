import axios from "axios";
import { BASE_URL } from "../constants/defaultValues";

export const FetchAdmissionService = async (payload) => {
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
