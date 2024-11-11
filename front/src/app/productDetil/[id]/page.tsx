"use client";

import React, { useEffect, useState } from 'react';
import style from '../productDetil.module.css';
import Gallery from '@/app/GallerySlider/GallerySlider';
import Details from '@/app/DetailsProduct/DetailsProduct';
import Tabs from '@/app/Tabs/Tabs';

import { usePathname } from 'next/navigation';
import { useProductSingel } from '@/Store/Productsingel/Productsingel';
import { DetailsProps, ProductSingelType } from '@/Store/Productsingel/type';

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true); // وضعیت بارگذاری
  
  const dataproduct = useProductSingel(state => state);
  const { productsingelAll, fetchData,fetchDatalistproductdetile,productsingelAllDetil } = dataproduct;
  const pathname = usePathname();
  const string = pathname;
  const title = string.split('/')[2];

  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها از سرور
    const timer = setTimeout(() => {
      
      fetchDatalistproductdetile(title)
      setLoading(false); // تغییر وضعیت بارگذاری به false بعد از ۲ ثانیه
 
      

    }, 0);
  

    return () => clearTimeout(timer);
  }, [fetchDatalistproductdetile]);

  

  if (loading) {
    return <div>درحال بارگذاری...</div>; // نمایش پیام بارگذاری
  }

  return (
    <div className={style.container}>
      <div data-aos="fade-up" className={style.contents}>
        <div className={style.main}>
          <Details productsingelAllDetil={productsingelAllDetil} />
          <Gallery productsingelAllDetil={productsingelAllDetil} />
        </div>
        <Tabs productsingelAllDetil={productsingelAllDetil} /> 
       {/* <MoreProducts /> */}
      </div>
    </div>
  );
}