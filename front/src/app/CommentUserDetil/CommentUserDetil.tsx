import React from "react";
import { FaStar } from "react-icons/fa";
import styles from "./comment.module.css";

const CommentUserDetil: React.FC = () => {
  return (
    <section className={styles.comment}>
      <img src="/istockphoto-1308342065-612x612.jpg" className={styles.avatar} alt="User Avatar" />
      <div>
        <div className={styles.main_details}>
          <div className={styles.user_info}>
            <strong>shahin</strong>
            <p>۲۸ آذر ۱۴۰۱</p>
          </div>
          <div className={styles.stars}>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <p>
          قهوه بسیار خوش عطر و طعمیه…کاش کم کم مدل های کپسول ها رو متنوع تر
          کنید.
        </p>
      </div>
    </section>
  );
};

export default CommentUserDetil;