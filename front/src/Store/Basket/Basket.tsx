import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Basket } from "./type";
import { ApiGetService } from "../../../utils/Baseyurlget";
import { decodeToken } from "../../../utils/DecodeToken/DecodeToken";
const apiService = new ApiGetService('url');

export const useBasket = create(
  persist<Basket>(
    (set, get) => ({
      items: [],
      basketquantity:[],
      user: { userId: "0", name: "", email: "" }, 
      invoice: {
        totalprice: 0,
      },
      actions: {
        fetchUserBasket: async () => {
          const   data=decodeToken(localStorage?.getItem("loginproduct"))
          const userId=data?._id

          if(localStorage?.getItem("loginproduct")){
            const tokenlogin=localStorage?.getItem("loginproduct")
    const tokenid= decodeToken(tokenlogin)
    const fetchedItems = await fetch(`http://localhost:3001/api/product/FindUserBasket/${userId}`) // URL فرضی
    .then(response => response.json())
    .catch(() => []);
  set({ items: [] });
  
  
  
  }
  


},


         

        fetchDatalistproductbasket: async () => {
       const   userId=decodeToken(localStorage?.getItem("loginproduct"))
       const data=userId?._id
       if(localStorage?.getItem("loginproduct")){
        try {
          
          const apiService = new ApiGetService('url');
     const productsingelAll = await apiService.fetchDatabasketuser('/product/findquantity',data);
     set({ basketquantity: productsingelAll });

     
          // به روزرسانی Zustand state
       
        } catch (error) {
          console.error("خطا در دریافت داده‌ها:", error);
        }
       }
         
        },
        addBasket: async (item,user) => {
          console.log("item12", item,user,get().items);



          const alreadyExist = get().items.some((_item) => _item?._id === item._id);
          if (alreadyExist) {
        
            
            return set((oldBasket) => ({
              invoice: {
                totalprice: oldBasket.invoice.totalprice +Number(item.price),
              },
              items: oldBasket.items.map((_item) => {
                if (_item?._id === item._id) {
                  const dataitembasket ={
                    "productId":_item?.productId,"title":_item.title,"price":_item.price,"quantity": _item?.quantitify + 1,"userId":user._id
                  }
                  console.log("dataitembasket2",dataitembasket);
              const  Testa =async()=>{
                const productsingelAll = await apiService.postDataBasket('product/additembasket',dataitembasket);

                  }
                  Testa()
                  return {
                    ...item,
                    quantitify: _item.quantitify + 1,
                  };
                }

                return _item;
              }),
            }));
          }
          set((oldBasket) => ({
            
            invoice: {
              totalprice: oldBasket.invoice.totalprice + Number(item.price),
            },
            items: [...oldBasket.items, { ...item, quantitify: 1 }],
            
          }));
          // console.log("get().items2", get().items);
          const dataitembasket1 ={
            "productId":item.product,"title":item.title,"price":item.price,"quantity":1,"userId":user._id
          }
          const  Testa =async()=>{
            const productsingelAll = await apiService.postDataBasket('product/additembasket',dataitembasket1);

              }
              Testa()
          console.log("dataitembasket1",dataitembasket1);
        },
        removeBasket: (item,user) => {
          console.log("item", item,user);
          const   userId=decodeToken(localStorage?.getItem("loginproduct"))
          const data=userId?._id

          const dataitembasket1 ={
            "productId":item.product,"title":item.title,"price":item.price,"quantity":1,"userId":userId?._id
          }
          const  Testa =async()=>{
            const productsingelAll = await apiService.postDataBasket('product/removeItemFromBasket',dataitembasket1);

              }
              Testa()


          const shouldRemove = item.quantitify === 1;
          if (shouldRemove) {
            return set((oldBasket) => ({
              invoice: {
                totalprice: oldBasket.invoice.totalprice - item?.price,
              },
              items: oldBasket.items.filter((_item) => _item._id !== item._id),
            }));
          }

          return set((oldBasket) => ({
            invoice: {
              totalprice: oldBasket.invoice.totalprice - item?.price,
            },
            items: oldBasket.items.map((_item) => {
              if (_item._id === item._id) {
                return {
                  ...item,
                  quantitify: _item?.quantitify - 1,
                };
              }
              return _item;
            }),
          }));
        },
      },
    }),
    {
      name: "basket-storage", // نام برای ذخیره‌سازی
      partialize: (state) => {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => !["actions"].includes(key))
        ) as Basket;
      },
    }
  )
);