"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper as SwiperType } from "swiper"; // Import Swiper type
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState, useEffect } from "react";
import { DetailsProps, ProductSingelType } from "@/Store/Productsingel/type";
import { usePathname } from "next/navigation";
import { ApiGetService } from "../../../utils/Baseyurlget";
import { useProductSingel } from "@/Store/Productsingel/Productsingel";

interface Images {
  id: number;
  img: string;
}

const Gallery: React.FC<{ productsingelAllDetil: ProductSingelType }>= ({ productsingelAllDetil }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [dataone1, setDataone1] = useState<ProductSingelType[]>();

  const [loading, setLoading] = useState<boolean>(true); // وضعیت بارگذاری
  const pathname = usePathname();
  console.log("ffff",pathname);
  const string = pathname;
  const id = string.split('/')[2];

  const apiService = new ApiGetService('url');


  const images: Images[] = [
    { id: 1, img: "https://set-coffee.com/wp-content/uploads/2020/12/Gold-DG-700x700.jpg" },
    { id: 2, img: "https://set-coffee.com/wp-content/uploads/2020/12/Gold-box-DG--150x150.jpg" }
  ];







  useEffect(() => {
    // شبیه‌سازی بارگذاری داده‌ها از سرور
    const timer = setTimeout(() => {
      
      setLoading(false); // تغییر وضعیت بارگذاری به false بعد از ۲ ثانیه
 
      

    }, 10);
  

    // پاک کردن تایمر هنگامUnmount شدن کامپوننت
    return () => clearTimeout(timer);
  }, []);

  // اگر در حال بارگذاری هستیم، یک پیام بارگذاری نمایش می‌دهیم
  if (loading) {
    return <div>درحال  بارگذاری</div>;
  }

  return (
    <section style={{ width: "36%" }}>
      {/* <h1>{productsingelAllDetil[0]?.color}</h1>
      <h2>{productsingelAllDetil[0]?.rate}</h2>
      {productsingelAllDetil[0]?.additionalImages?.length}
      <img src={productsingelAllDetil[0]?.coverasli}/> */}
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 gallery-slider"
      >
        {productsingelAllDetil.additionalImages.map((item:string, index:number) => (
          <SwiperSlide key={index}>
            < img style={{borderRadius:"10%",padding:3}} src={item} width="90%" alt={`Gallery Image ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="gallery-slider-2"
      >
        {productsingelAllDetil?.additionalImages && productsingelAllDetil?.additionalImages.length > 0 ? (
          productsingelAllDetil.additionalImages.map((item:string, index:number) => (
            <SwiperSlide key={index}>
              <img src={item} width="100%" alt={`Gallery Image ${item}`} />
            </SwiperSlide>
          ))
        ) : (
          <div>{ productsingelAllDetil?.color}</div> // پیام در صورت عدم وجود تصاویر
        )}
      </Swiper>
    </section>
  );
};

export default Gallery;