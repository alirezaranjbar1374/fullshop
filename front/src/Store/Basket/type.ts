// import { Product10 } from "../Product/type";

import { JwtPayload } from "jsonwebtoken";
import { ProductSingel, ProductSingelType } from "../Productsingel/type";

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

interface newproductbasket{
    _id?:string;
    totalPrice?:number;
    status?:string;
    userId?:number | string;
    items?:ProductSingelType[];
    ordercretae?:number | Date | string;
    __v?:number

}
export interface typeitemsallbasket{
 
    _id?:string|number;
    totalPrice?:number;
    status?:string;
    userId?:number;
items?:basketquantity[];
ordercretae?:number;
__v?:number;
}
interface basketquantity{
    quantity?:number;
    _id?:string|number;
    productId?:string|number;
    title?:string;
    price?:number;
    userId?:number;


}
export interface Basket {
    items:basketquantity[];
    basketquantity:basketquantity[]
    user:userbasket;


    invoice:{
        totalprice:number;
    };
    actions:{
        fetchUserBasket:<Promise>()=>void;
        fetchDatalistproductbasket:<Promise>()=>void;
        addBasket:(item:ProductSingelType |any |undefined,user:userbasket)=>void;
        removeBasket:(item:ProductSingelType | any | undefined,user:userbasket)=>void;

    }
}