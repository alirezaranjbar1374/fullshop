// Import Swiper React components
"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, Scrollbar, Navigation, Pagination, Autoplay } from 'swiper/modules'; // اضافه کردن Autoplay
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/autoplay'; // اضافه کردن استایل Autoplay
import style1 from './swipersabz.module.css';
import Circelinsta from '../Circelinsta/Circelinsta';
import { useProductSingel } from '@/Store/Productsingel/Productsingel';
import { productsingelarry } from '@/Store/Productsingel/type';

interface Product {
  // سایر ویژگی‌های محصول را در اینجا تعریف کنید
}

const Swipersabz: React.FC = () => {



    const slidderdata = [
      { id: 3, coverasli: "./slidshow3.webp", title: "لوازم برقی", captioin: "Caption tree" },
      { id: 4, coverasli: "./slidshow4.gif", title: "لبنیات", captioin: "Caption four" },
      { id: 5, coverasli: "./slidshow5.gif", title: "کار", captioin: "Caption five" },
        { id: 1, coverasli: "./slidshow1.webp", title: "مایع ضرفشویی", captioin: " Text" },
        { id: 2, coverasli: "./slidshow2.webp", title: "کتاب", captioin: "Caption Tow" },
        { id: 3, coverasli: "./slidshow3.webp", title: "لوازم برقی", captioin: "Caption tree" },
        { id: 4, coverasli: "./slidshow4.gif", title: "لبنیات", captioin: "Caption four" },
        { id: 5, coverasli: "./slidshow5.gif", title: "کار", captioin: "Caption five" },
        { id: 2, coverasli: "./slidshow2.webp", title: "کتاب", captioin: "Caption Tow" },
        { id: 3, coverasli: "./slidshow3.webp", title: "لوازم برقی", captioin: "Caption tree" },
        { id: 4, coverasli: "./slidshow4.gif", title: "لبنیات", captioin: "Caption four" },
        { id: 5, coverasli: "./slidshow5.gif", title: "کار", captioin: "Caption five" }
    ];
  const swiperRef = useRef<any>(null);
  const btnnav = "notbtn";

  const dataproduct = useProductSingel(state => state);
  const { productsingelAll, fetchData } = dataproduct;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={{display:"flex", alignItems:"center"}}>
      <ArrowForwardIosIcon className={style1.butn} onClick={() => {
          swiperRef.current?.slideNext();
        }} />
      <Swiper
        rewind={true}
        loop={true}
        autoplay={{
          delay: 3000, // سرعت حرکت اسلایدر به میلی‌ثانیه
          disableOnInteraction: false, // بعد از تعامل کاربر با اسلایدر، اتوپلی متوقف نشود
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        centeredSlides={false}
        // navigation
        className={style1.mySwiper}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          0: { // برای دستگاه‌هایی با عرض کمتر از 480 پیکسل
            slidesPerView: 3, 
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 3,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 1,
          },
        }}
        
        modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]} // اضافه کردن Autoplay
      >
        <Container style={{ textAlign: "center" }}>
          {productsingelAll.map((product, index) => (
            <SwiperSlide key={index}>
              <Container>
                <Circelinsta {...product} />
                
              </Container>
              
            </SwiperSlide>
          ))}
          
        </Container>
      </Swiper>
      
           <ArrowBackIosIcon className={style1.butn} onClick={() => {
          swiperRef.current?.slidePrev();
        }} />
      {/* <div className={btnnav !== "notbtn" ? style1.btnhide : style1.btnshow}>
        <ArrowForwardIosIcon className={style1.butn} onClick={() => {
          swiperRef.current?.slidePrev();
        }} />
        <ArrowBackIosIcon className={style1.butn} onClick={() => {
          swiperRef.current?.slideNext();
        }} />
      </div> */}
    </div>
  );
}

export default Swipersabz;