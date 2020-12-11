import axios from "axios";

export const FaqService = async (payload) => {
  try {
    let res = await axios.get(`https://localhost:44361/api/Faq`);
    return res.data;
    //return ["Hospital","Schools"];
  } catch (error) {
    return [];
    //console.log(error);
  }
};
