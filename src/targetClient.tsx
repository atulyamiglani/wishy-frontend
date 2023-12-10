import axios from "axios";

export const searchForProducts = async (searchTerm: string) => {
  const params = {
    api_key: "6207B8D916BD4F14BEF702D43CAFE494",
    search_term: searchTerm,
    type: "search",
  };

  const response = await axios.get("https://api.redcircleapi.com/request", {
    params,
  });
  console.log(response.data);
  return response.data;
};

export const getProductDetails = async (productId: string) => {
  const params = {
    api_key: "6207B8D916BD4F14BEF702D43CAFE494",
    type: "product",
    tcin: productId,
  };

  const response = await axios.get("https://api.redcircleapi.com/request", {
    params,
  });
  console.log(response.data);
  return response.data;
};
