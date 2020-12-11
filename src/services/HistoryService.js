import axios from "axios";

import { ADMIN_LOGIN_URL } from "../constants/defaultValues";

export const HistoryService = async (payload) => {
  try {
    const formData = new FormData();

    let res = await axios.get(
      `https://localhost:3000/api/NonIgr/user?contact=string&filter.PageNumber=${payload.pageIndex}&filter.PageSize=${payload.pageSize}`
    );
    return res.data;
    //return ["Hospital","Schools"];
  } catch (error) {
    //console.log(error);
  }
};
