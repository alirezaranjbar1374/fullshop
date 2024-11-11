import React, { useEffect } from "react";
import { FaFacebookF, FaStar, FaTwitter } from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "../../../utils/Breadcrumb/Breadcrumb";
import { DetailsProps, ProductSingelType } from "@/Store/Productsingel/type";
import { useBasket } from "@/Store/Basket/Basket";
import { ApiGetService } from '../../../utils/Baseyurlget';
import { useProductSingel } from "@/Store/Productsingel/Productsingel";
import { useBasketwish } from "@/Store/Wishproduct/Wishproduct";
import { Product10 } from "@/Store/Wishproduct/type";
import { islogin } from "../../../utils/Islogin";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { decodeToken } from "../../../utils/DecodeToken/DecodeToken";
const apiService = new ApiGetService('url');

const Details: React.FC<{ productsingelAllDetil: ProductSingelType }> = ({productsingelAllDetil}) => {
  const basketAdd = useBasket(state => state.actions.addBasket);
  const user={ _id: "671265c30c38da07fce0d02c", name: "ali", email: "ranjbar" }
  const { itemsWish, actions } = useBasketwish(); // دسترسی به آیتم‌ها و اکشن‌ها
  const Fetcdwish=useBasketwish((state)=>state.actions.fetchUserBasketwish)
  const addwish=useBasketwish((state)=>state.actions.addBasketwish)

  // const  Testa =async()=>{
  //   const productsingelAll = await apiService.postDataBasket('product/findquantity',user.userId);
  //   return productsingelAll

  //     }
  const addwishplus=(item:ProductSingelType,user:any)=>{
const isaut=islogin()
user=islogin()
console.log("user",user);

    // const data= Fetcdwish("66c98d8484cf743ce80c1ffb")
     setTimeout(() => {
       addwish(item,user)
     }, 200);
   }

  useEffect(() => {
 

    actions.fetchUserBasketwish("2")
  }, []);
    
      

  const basketAddfirsetone=useBasket(state => state.actions.addBasket);
  const test =useBasket(state => state.invoice.totalprice);
  const items =useBasket(state => state.items);
const findbasketuser=useBasket(state => state.actions.fetchUserBasket);

  
const dataproduct = useBasket(state => state.actions);
const { fetchDatalistproductbasket } = dataproduct;

const dataproductbasket = useBasket(state => state.basketquantity);


// const findbaskequntl=useBasket(state => state.actions.fetchUserBasket);
const addbasketproduct=(item:ProductSingelType,user:any)=>{
 
  user=islogin()
  console.log('====================================');
  console.log(item,user);
  console.log('====================================');
  basketAddfirsetone(item,user)
}

  const basketRemove = useBasket(state => state.actions.removeBasket);
// console.log("totalprice",test);
useEffect(() => {
 const data= fetchDatalistproductbasket()
console.log("yaali",dataproductbasket);
findbasketuser()
}, [fetchDatalistproductbasket,basketAddfirsetone])

const finddatabasket=(e:React.MouseEvent<SVGElement, MouseEvent>,userId:string|number)=>{
e.preventDefault()

}




  return (
    <main style={{ width: "63%" }}>
      <Breadcrumb
        title={
`${productsingelAllDetil.categori}`        }
      />
      <h2>
{productsingelAllDetil.categori}/{productsingelAllDetil.dastbandi}/{productsingelAllDetil.name}
      </h2>

      <div className={styles.rating}>
        <div>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <p>(دیدگاه 7 کاربر)</p>
      </div>

      <p className={styles.price}>{Number(productsingelAllDetil.price).toLocaleString('fa-IR')} تومان</p>
      <span className={styles.description}>
   {productsingelAllDetil.dec}
      </span>

      <hr />

      <div className={styles.Available}>
        <IoCheckmark   style={{color:"green"}}/>
        <p >موجود در انبار{Number(productsingelAllDetil.numberof).toLocaleString('fa-IR')} عدد</p>
      </div>

      <div className={styles.cart}>
        <button onClick={()=>addbasketproduct(productsingelAllDetil,user)}>افزودن به سبد خرید</button>
        <div>
          <span onClick={()=>basketRemove(productsingelAllDetil,user)}>-</span>{dataproductbasket?.find(item=>item.productId==productsingelAllDetil.title)?.quantity ==undefined?0:dataproductbasket?.find(item=>item.title==productsingelAllDetil.title)?.quantity}<span onClick={()=>addbasketproduct(productsingelAllDetil,user)} >+</span>
        </div>
      </div>

      <section className={styles.wishlist}>
        <div>
          {/* <CiHeart style={{color:"red"}} /> */}
          <FavoriteIcon color="error"/>
          <span onClick={()=>addwishplus(productsingelAllDetil,user)}>افزودن به علاقه مندی ها</span>
        </div>
        <div>
          <TbSwitch3  />
          {/* <a href="/">مقایسه</a> */}
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {productsingelAllDetil.numberofbehdasht}</strong>
        <p>
          {" "}
          <strong>دسته:</strong> {productsingelAllDetil.dastbandi}
        </p>
        <p>
          <strong>برچسب:</strong> 
          {productsingelAllDetil.categori},{productsingelAllDetil.dastbandi},{productsingelAllDetil.name}

        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;