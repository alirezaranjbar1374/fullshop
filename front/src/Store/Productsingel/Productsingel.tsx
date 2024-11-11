import { create } from "zustand";
import { productsingelarry } from "./type";
import { ApiGetService } from "../../../utils/Baseyurlget";

// ایجاد استور Zustand برای محصولات
export const useProductSingel = create<productsingelarry>((set) => ({
  productsingelAll: [], // مقدار اولیه محصولات
  productsingelAllDetil: {
    _id: "string",
    additionalImages: [],
    comments: [],
    product: "string",
    title: "string",
    name: "string",
    href: "string",
    adress: "string",
    phonenumber: "",
    video: "",
    created: "",
    quantitify:0,

    price: 0,
    ofprice: 0,
    categori: "",
    dastbandi: "",
    numberof: "",
    color: "",
    rate: "",
    weight: "",
    citycreate: "string",
    numberofbehdasht: "",
    coverasli: "",
    dec: "",
    productDetil: [],
    createdAt: "0",
    updatedAt: "0",
    __v: 0,
  },

  // متد fetchData برای گرفتن داده‌ها از سرور
  fetchData: async () => {
    try {
      const apiService = new ApiGetService('url');
      const productsingelAll = await apiService.fetchData('product/listproduct');

      console.log("response", productsingelAll);

      // به روزرسانی Zustand state
      set({ productsingelAll });
    } catch (error) {
      console.error("خطا در دریافت داده‌ها:", error);
    }
  },

  fetchDatalistproductbefordetile: async () => {
    try {
      const apiService = new ApiGetService('url');
      const productsingelAll = await apiService.fetchData('product/listproductbefordetile');

      console.log("response", productsingelAll);

      // به روزرسانی Zustand state
      set({ productsingelAll });
    } catch (error) {
      console.error("خطا در دریافت داده‌ها:", error);
    }
  },

  fetchDatalistproductdetile: async (id: string) => {
    try {
      const apiService = new ApiGetService('url');
      const productsingelAllDetil = await apiService.fetchData(`product/listproduct/${id}`);

      console.log("response", productsingelAllDetil);

      // به روزرسانی Zustand state
      set({ productsingelAllDetil });
    } catch (error) {
      console.error("خطا در دریافت داده‌ها:", error);
    }
  },
}));