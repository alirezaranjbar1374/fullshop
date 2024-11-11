"use client"
// Import Swiper React components
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
import style1 from './fwiperfull.module.css';
import { useProductSingel } from '@/Store/Productsingel/Productsingel';

interface Product {
  // سایر ویژگی‌های محصول را در اینجا تعریف کنید
}

const SwiperFull: React.FC = () => {

    const slidderdata = [
        { id: 1, img: "./slidshow1.webp", numbertext: "1 / 5", captioin: " Text" },
        { id: 2, img: "./slidshow2.webp", numbertext: "2 / 5", captioin: "Caption Tow" },
        { id: 3, img: "./slidshow3.webp", numbertext: "3 / 5", captioin: "Caption tree" },
        { id: 4, img: "./slidshow4.gif", numbertext: "4 / 5", captioin: "Caption four" },
        { id: 5, img: "./slidshow5.gif", numbertext: "5 / 5", captioin: "Caption five" }
    ];



  const swiperRef = useRef<any>(null);
  const btnnav = "notbtn";

  const dataproduct = useProductSingel(state => state);
  const { productsingelAll, fetchData } = dataproduct;

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
<div style={{ position: 'relative' }}>
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
        slidesPerGroupSkip={1}
        // navigation
        className={style1.mySwiper}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]} // اضافه کردن Autoplay
      >
        <Container style={{ textAlign: "center",position:"relative" }}>
          {slidderdata.map((product, index) => (
            <SwiperSlide key={index}>
            
<img width="100%" src={product.img}/>                


              
            </SwiperSlide>
          ))}
          
        </Container>
      </Swiper>
    
   <Box className={style1.boxbtn}>
   <ArrowForwardIosIcon sx={{
     fontSize:{
        xs:"18px",
        sm:"25px",
        md:"32px"
    }
   }} className={style1.butn} onClick={() => {
          swiperRef.current?.slideNext();
        }} />
                <ArrowBackIosIcon
                sx={{
                    fontSize:{
                        xs:"18px",
                        sm:"25px",
                        md:"32px"
                    }
                   }}  className={style1.butn} onClick={() => {
          swiperRef.current?.slidePrev();
        }} />
   </Box>
 
    </div>
  );
}

export default SwiperFull;