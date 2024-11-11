import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Basket } from "./type";
import { ApiGetService } from "../../../utils/Baseyurlget";
const apiService = new ApiGetService('url');

export const useBasketwish = create(
  
  persist<Basket>(
    (set, get) => ({
      itemsWish: [],
      user: { _id: "0", name: "", email: "" }, 

      actions: {
        fetchUserBasketwish: async (userId) => {

          if(localStorage?.getItem("loginproduct")){

            const fetchedItems = await fetch(`http://localhost:3001/api/product/basketwish/${userId}`) // URL فرضی
            .then(response => response.json())
            .catch(() => []);
          set({ itemsWish: fetchedItems });
          console.log("دیتای علاقمندی‌های کاربر بارگذاری شد:", fetchedItems);
        }
          }

         ,

        
        addBasketwish: (item,user) => {
          console.log("item", item,user);

          const alreadyExist = get().itemsWish.some((_item) => _item.productId === item._id);
          console.log("testdad",alreadyExist);
          
          if (alreadyExist) {

            console.log("داریم تو علاقمندیا");
            const data={
              user:user._id,
              productId:item.product
            }
            
            const wishcreate =  apiService.createWish(data,"product/createWishlist");
            console.log("wishcreate",wishcreate);
            console.log("با موفقیت پاک شد",item,user);
           
   
          }
          else{
            const data={
              user:user._id,
              productId:item.product
            }
            
            const wishcreate =  apiService.createWish(data,"product/createWishlist");
            console.log("wishcreate",wishcreate);
            console.log("با موفقیت اضافه شد",item,user);
                             
          }
          set((oldBasket) => ({
   
      
            itemsWish: [...oldBasket.itemsWish, { ...item, quantitify: 1 }],
            
          }));
        },
        removeBasketwish: (item,user) => {
     
          console.log("با موفقیت پاک شد",item,user);

            return set((oldBasket) => ({
            
         
              itemsWish: oldBasket.itemsWish.filter((_item) => _item._id !== item._id),
            }));
         

 
        },
      },
    }),
    {
      name: "basket-storagewhislist", // نام برای ذخیره‌سازی
      partialize: (state) => {
        return Object.fromEntries(
          Object.entries(state).filter(([key]) => !["actions"].includes(key))
        ) as Basket;
      },
    }
  )
)