import axios from "axios";
import { ProductInfo } from "./App";

const API_KEY = "6207B8D916BD4F14BEF702D43CAFE494";

const searchForProducts = async (searchTerm: string) => {
  const params = {
    api_key: API_KEY,
    search_term: searchTerm,
    type: "search",
  };

  const response = await axios.get("https://api.redcircleapi.com/request", {
    params,
  });
  console.log(response.data);
  return response.data;
};

export const search = async (searchTerm: string): Promise<ProductInfo[]> => {
  const searchProducts: ProductInfo[] = await searchForProducts(searchTerm)
    .then((res) => {
      //translate response into ProductInfo[]
      const p: ProductInfo[] = [];
      if (res.search_results) {
        const results = res.search_results as any[];
        results.forEach((result: any) => {
          if (result.product && result.offers) {
            const product = result.product;
            const offers = result.offers;
            const productInfo: ProductInfo = {
              title: product.title,
              link: product.link,
              tcin: product.tcin,
              featureBullets: product.feature_bullets,
              rating: product.rating,
              ratingsTotal: product.ratings_total,
              mainImage: product.main_image,
              price: offers.primary.price,
            };
            p.push(productInfo);
          }
        });
      }
      return p;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  return searchProducts;
};

const getProductDetails = async (productId: string) => {
  console.log("here");
  console.log("productId: " + productId);
  const params = {
    api_key: API_KEY,
    type: "product",
    tcin: productId,
  };

  const response = await axios
    .get("https://api.redcircleapi.com/request", {
      params,
    })
    .then((res) => {
      console.log("inside the then thingy: ", res);
      return res;
    });
  console.log(response);
  return response.data;
};

export const product = async (productId: string): Promise<ProductInfo> => {
  console.log("product");
  const productInfo: ProductInfo = await getProductDetails(productId)
    .then((res) => {
      //translate response into ProductInfo
      console.log("RESPONSE: ", res);
      const product = res.product;
      const offers = res.offers;
      const productInfo: ProductInfo = {
        title: product.title,
        link: product.link,
        tcin: product.tcin,
        featureBullets: product.feature_bullets,
        rating: product.rating,
        ratingsTotal: product.ratings_total,
        mainImage: product.main_image,
        price: offers.primary.price,
      };
      console.log(productInfo);
      return productInfo;
    })
    .catch((err) => {
      console.log(err);
      return {} as ProductInfo;
    });
  return productInfo;
};
