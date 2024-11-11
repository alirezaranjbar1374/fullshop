import React from "react";
// import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentUserDetil from "../CommentUserDetil/CommentUserDetil";
import CommentForm from "../CommentFormDetil/CommentFormDetil";
// import CommentForm from "./CommentForm";
import { ProductSingelType } from "@/Store/Productsingel/type";

const Comments: React.FC  <{ productsingelAllDetil: ProductSingelType }> = ({productsingelAllDetil}) => {
  return (
    <div>
      <p>نظرات (7) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            7 دیدگاه برای کپسول قهوه SETPRESSO سازگار با دستگاه نسپرسو ( GOLD )
            ده -10- عددی
          </p>
          <div>
            <CommentUserDetil/>
            <CommentUserDetil/>
            <CommentUserDetil/>
            <CommentUserDetil/>

       
          </div>
        </div>
        <div className={styles.form_bg}>
            <CommentForm productsingelAllDetil={productsingelAllDetil}/>
          {/* <CommentForm /> */}
        </div>
      </main>
    </div>
  );
};

export default Comments;