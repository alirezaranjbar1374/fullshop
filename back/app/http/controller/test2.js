// import { Product10 } from "../Product/type";

import { JwtPayload } from "jsonwebtoken";
import { ProductSingel, ProductSingelType } from "../Productsingel/type";

interface newproductbasket{
    _id?:string;
    totalPrice?:number;
    status?:string;
    userId?:number | string;
    items?:ProductSingelType[];
    ordercretae?:number | Date | string;
    __v?:number

}


interface Product10{
    id:number;
    price:number;
}
interface basketitem extends ProductSingelType{
    quantitify?:number
}
interface userbasket{
    _id?:string |number;
    name?:string;
    email?:string;
}

interface basketquantity{
    quantity?:number,
    _id?:string|number,
    productId?:string|number,
    title?:string,
    price?:number,
    userId?:number
}
export interface Basket {
    items:newproductbasket;
    basketquantity:basketquantity[]
    user:userbasket;


    invoice:{
        totalprice:number;
    };
    actions:{
        fetchUserBasket:<Promise>()=>void;
        fetchDatalistproductbasket:<Promise>()=>void;
        addBasket:(item:ProductSingelType,user:userbasket)=>void;
        removeBasket:(item:ProductSingelType,user:userbasket)=>void;

    }
}