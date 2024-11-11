"use client";
import React, { useState } from "react";
import styles from "./tabs.module.css";
import DesproductDetil from "../DesproductDetil/DesproductDetil";
import MoreInfoes from "../MoreInfoesProDetil/MoreInfoesProDetil";
import Comments from "../CommentsDetil/CommentsDetil";
import { ProductSingelType } from "@/Store/Productsingel/type";


const Tabs: React.FC <{ productsingelAllDetil: ProductSingelType }> = ({productsingelAllDetil})=> {
  const [tab, setTab] = useState<string>("description"); // نوع state مشخص شده است

  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <input
        onClick={() => setTab("description")}
        type="radio"
        id="description"
        name="tab-control"
        checked={tab === "description"} // اصلاح شرط checked
      />
      <input
        onClick={() => setTab("moreInfoes")}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        checked={tab === "moreInfoes"} // اصلاح شرط checked
      />
      <input
        onClick={() => setTab("comments")}
        type="radio"
        id="comments"
        name="tab-control"
        checked={tab === "comments"} // اصلاح شرط checked
      />
      <ul>
        <li title="Features">
          <label htmlFor="description" role="button">
            توضیحات
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            اطلاعات بیشتر
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            نظرات (7)
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          {tab === "description" && <DesproductDetil />}
        </section>
        <section className={styles.tabs_content}>
          {tab === "moreInfoes" && <MoreInfoes />}
        </section>
        <section className={styles.tabs_content}>
          {tab === "comments" && <Comments  productsingelAllDetil={productsingelAllDetil}/>}
        </section>
      </div>
    </div>
  );
};

export default Tabs;