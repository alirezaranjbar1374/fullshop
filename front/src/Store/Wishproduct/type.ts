import { ProductSingelType } from "../Productsingel/type";


export interface Product10{
    id:number;
    user: string | number;
    productId: string |number;
    quantitify?:number;
           
}

interface basketitem extends Product10{
  productId: number;
    
}

interface userbasket{
    _id:string;
    name:string;
    email:string;
    phone?:string | number;
    comment?:[];
    exp?:number;
    iat?:number;
    role?:string;
    basket?:[];
}
export interface Basket {
    itemsWish:ProductSingelType[];
    user:userbasket,

  
    actions:{
        fetchUserBasketwish:(userId:number | string)=>void ;

        addBasketwish:(item:ProductSingelType,user:userbasket)=>void;
        removeBasketwish:(item:ProductSingelType,user:userbasket)=>void;

    }
}