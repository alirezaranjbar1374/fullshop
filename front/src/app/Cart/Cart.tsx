"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import Select from "react-select";
import stateData from './../../../utils/stateData';
import { useBasket } from "@/Store/Basket/Basket";
import { ApiGetService } from "../../../utils/Baseyurlget";
import { decodeToken } from "../../../utils/DecodeToken/DecodeToken";
import { typeitemsallbasket } from "@/Store/Basket/type";

// تعریف نوع داده برای آیتم‌های سبد خرید
interface CartItem {
  id: number; // فرض بر این است که هر آیتم یک شناسه دارد
  name: string;
  price: number;
  count: number;
}

// تعریف نوع داده برای گزینه‌های استان
interface StateOption {
  value?: string | number;
  label?: string [];
}

const stateOptions: StateOption[] |any = stateData();

const Table: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [datacart,setDatacart]=useState<typeitemsallbasket | undefined | any | null>(null)
  const [stateSelectedOption, setStateSelectedOption] = useState<StateOption | null>(null);
  const [changeAddress, setChangeAddress] = useState<boolean>(false);
  const apiService = new ApiGetService('url');

          

  useEffect(() => {
    const fetchData = async () => {
        try {
      
            const   userId =decodeToken(localStorage?.getItem("loginproduct"))
        
           
            const productsingelAll = await apiService.fetchDatabasketuser('/product/findquantityall',userId?._id);
            setDatacart(productsingelAll)
console.log('====================================');
console.log("productsingelAll",productsingelAll);
console.log('====================================');
         
         
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    if(localStorage?.getItem("loginproduct")){
        fetchData();
 
    }
    
}, []);



  

  // const calcTotalPrice = (): number => {
  //   let totalPrice = 0;

  //   if (datacart) {
  //     datacart?.items.map((item: { price: number; quantitify: number; })=>{
  //       return Number(item.price * item.quantitify)
  //     })
  //   }

  //   return totalPrice;
  // };

  return (
    <>
      <div className={styles.tabel_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {datacart?.items.map((item:any,index:number) => (
              <tr key={item._id}>
                <td>{Number(item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span>-</span>
                    <p>{item?.quantity}</p>
                    <span>+</span>
                  </div>
                </td>
                <td className={styles.price}>
           
                  { datacart.totalPrice} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt={item.title}
                  />
                  <Link href={"/"}>{item.title}</Link>
                </td>
                <td>
                  <IoMdClose className={styles.delete_icon} />
                </td>
              </tr>
           
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn}>اعمال کوپن</button>
            <input type="text" placeholder="کد تخفیف" />
          </div>
        </section>
      </div>
      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
          <p>{ datacart?.totalPrice} تومان</p>
        </div>

        <p className={totalStyles.motor}>
          پیک موتوری: <strong> 30,000 </strong>
        </p>
        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>
        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>
        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              defaultValue={stateSelectedOption}
              onChange={setStateSelectedOption}
              isClearable={true}
              placeholder={"استان"}
              isRtl={true}
              isSearchable={true}
              options={stateOptions}
            />
            <input type="text" placeholder="شهر" />
            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{ datacart?.totalPrice} تومان</p>
        </div>
        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;