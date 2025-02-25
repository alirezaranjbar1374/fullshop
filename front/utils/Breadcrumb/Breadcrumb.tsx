import React from "react";
import styles from "./breadcrumb.module.css";

interface BreadcrumbProps {
  title: string; // نوع title به عنوان string مشخص شده است
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
  return (
    <section className={styles.breadcrumb}>
      <a href="/">خانه </a>
      <span>/</span>
      <a href="/">همه موارد </a>
      <span>/</span>
      <p>{title}</p>
    </section>
  );
};

export default Breadcrumb;