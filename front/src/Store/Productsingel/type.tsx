export interface ProductSingel{
    _id:string;
    title:string;
    name:string;
    href:string;
    coverasli:string;
    price:number;
    ofprice:number;
    categori:string;
    dastbandi:string;
    numberof:number;
    color:string;
    rate:string;
    weight:number;
    productDetil:[];
    }
    



   export interface ProductSingelType {
        additionalImages?: string[]; // آرایه‌ای از URL های تصاویر اضافی
        comments?: string[]; // آرایه‌ای از نظرات (در اینجا خالی است)
        _id?: string; // شناسه محصول
        product?: string; // شناسه محصول
        title?: string; // عنوان محصول
        name?: string; // نام محصول
        href?: string; // لینک محصول
        adress?: string; // آدرس
        phonenumber?: string; // شماره تلفن
        video?: string; // لینک ویدیو
        created?: string; // نوع محصول
        price?: number; // قیمت
        ofprice?: number; // قیمت اصلی
        categori?: string; // دسته‌بندی
        dastbandi?: string; // کشور سازنده
        numberof?: string; // تعداد موجودی
        color?: string; // رنگ محصول
        rate?: string; // امتیاز محصول
        dec?: string; // توضیحات
        weight?: string; // وزن
        quantitify?:number | string,
        productId?:string | number;
        citycreate?: string; // شهر سازنده
        numberofbehdasht?: string; // شماره بهداشت
        coverasli?: string; // لینک تصویر اصلی
        createdAt?: string; // تاریخ ایجاد
        updatedAt?: string; // تاریخ بروزرسانی
        __v?: number; // نسخه
      }





    export interface as{
        _id:string ;
        additionalImages:string[];
        comments:[];
        product:string;
        title:string;
        name:string;
        href:string;
        adress:string;
        phonenumber:string;
        video:string;
        created:string;
        price:string;
        ofprice:string;
        categori:string;
        dastbandi:string;
        numberof:string;
        color:string;
        quantitify?:number,

        rate:string;
        weight:string;
        citycreate:string;
        numberofbehdasht:string;
        coverasli:string;
        dec:string;
        productDetil:[];
        createdAt?:string;
        updatedAt?:string;
        __v?:number
        }
       export interface DetailsProps {
        productsingelAllDetil?: ProductSingelType[]
        dataone?:ProductSingelType[]
        }
      



    export interface productsingelarry{
        productsingelAll:ProductSingel[];
        productsingelAllDetil:ProductSingelType;
        fetchData: () => Promise<void>;
        fetchDatalistproductbefordetile:() => Promise<void>;
        fetchDatalistproductdetile:(id:string)=>Promise<void>;
    }