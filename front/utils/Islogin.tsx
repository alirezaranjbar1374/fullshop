import { decodeToken } from "./DecodeToken/DecodeToken";




export function islogin() {
    if(localStorage?.getItem("loginproduct")){
const tokenlogin=localStorage?.getItem("loginproduct")
return decodeToken(tokenlogin)

    }else{
     alert("شما لاگین نیستید")
    location.replace("/login")
    }
}