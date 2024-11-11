"use client"
import { IoMdStar } from "react-icons/io";
import React, { useEffect, useState } from "react";
import styles from "./commentForm.module.css";
import Rating from '@mui/material/Rating';
import { islogin } from "../../../utils/Islogin";
import { ProductSingelType } from "@/Store/Productsingel/type";
import { ApiGetService } from "../../../utils/Baseyurlget";

const CommentForm: React.FC  <{ productsingelAllDetil: ProductSingelType }> = ({productsingelAllDetil}) => {
    const [UserName,setUserName]=useState<string>('');
    const [text,setText]=useState<string>('')
    const [score,setScore]=useState<number>(0)
    const [user,setUser]=useState("")
    const [value, setValue] = useState<number | null>(0);
    const apiService = new ApiGetService('url');

const [rateshow,setRateshow]=useState(false)
    const setCommentScore=(rate:number)=>{
        setScore(rate)
    }



const submitCommite= async(e:React.MouseEvent<HTMLButtonElement>)=>{
 const user=islogin()

    e.preventDefault()
    const NewComent={
        user:user?._id,
        UserName:"",
    
        text,
        score:value
        
    }

    const postCommentproduct =  apiService.postCommentproduct("product/CreateProductComment",productsingelAllDetil.product,NewComent);
    
    setText("")


}
useEffect(() => {

}, [score])


  return (
    <div className={styles.form}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          {/* {score>0 ?Array.from({ length: score }).map((item,index)=>{
            return           <IoMdStar    style={{color:"gold" }} onClick={()=>changeRate(index)}/>

          }):
  
          <>
             <IoMdStar  onClick={()=>setCommentScore(5)}/>
          <IoMdStar onClick={()=>setCommentScore(4)}/>
          <IoMdStar onClick={()=>setCommentScore(3)}/>
          <IoMdStar onClick={()=>setCommentScore(2)}/>
          <IoMdStar  onClick={()=>setCommentScore(1)}/>
          </>
          } */}
   <div dir="rtl">
   <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
   </div>
       
        </div>
      </div>
      <div className={styles.group}>
        <label htmlFor="comment">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
        value={text}
        onChange={(e)=>setText(e.target.value)}
          id="comment"
          name="comment"
          cols={45}
          rows={8}
          required
          placeholder=""
        ></textarea>
      </div>
      <div className={styles.groups}>
        {/* <div className={styles.group}>
          <label htmlFor="name">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input value={UserName} onChange={(e)=>setUserName(e.target.value)} type="text"   />
        </div> */}
        {/* <div className={styles.group}>
          <label htmlFor="email">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input  type="email" id=""  />
        </div> */}
      </div>
      <div className={styles.checkbox}>
        <input type="checkbox" id="save-info" />
        <p>
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button onClick={submitCommite}  type="submit">ثبت</button>
    </div>
  );
};

export default CommentForm;