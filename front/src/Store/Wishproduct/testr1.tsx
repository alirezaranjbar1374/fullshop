// "use client"
// import React, { useEffect } from 'react'
// import { useProductStore } from '../Store/Product/Product'
// import { useBasket } from '../Store/Basket/Basket'
// import BasketMojodi from '../BasketMojodi/BasketMojodi'
// import Basket from '../Basket/Basket'
// import { useBasketwish } from '../Store/Wishproduct/Wishproduct'
// import { Product10 } from '../Store/Product/type'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// export default function Allbasket() {




//     const allproduct=useProductStore((state)=>state.productall)
//     const datawish=useBasketwish((state)=>state)
//     const datawish1=useBasketwish((state)=>state.actions)

 
//      const {fetchUserBasketwish}=datawish1

//     const addbasket=useBasket((state)=>state.actions.addBasket)
// const addwish=useBasketwish((state)=>state.actions.addBasketwish)
// const removewish=useBasketwish((state)=>state.actions.removeBasketwish)
// const Fetcdwish=useBasketwish((state)=>state.actions.fetchUserBasketwish)
// const addwishplus=(item:Product10,user:any)=>{
//  const data= Fetcdwish("66c98d8484cf743ce80c1ffb")
//   setTimeout(() => {
//     addwish(item,user)
//   }, 200);
// }
// const { items, actions } = useBasketwish(); // دسترسی به آیتم‌ها و اکشن‌ها

//   useEffect(() => {
//     // فراخوانی اطلاعات علاقمندی‌های کاربر
//     actions.fetchUserBasketwish("66c98d8484cf743ce80c1ffb"); // فرضی: شناسه کاربر 1 است
//   }, []);

// const handelike=(item:Product10,user:any)=>{

// }

// // useEffect(() => {
// //   Fetcdwish("66c98d8484cf743ce80c1ffb")
// //  const fafa= fetchUserBasketwish("66c98d8484cf743ce80c1ffb")
// //   console.log('====================================');
// // console.log("datawish",items,fafa);
// // console.log('====================================');
// // }, [])

// // fetchUserBasketwish
// const user={_id: "66c98d8484cf743ce80c1ffb", name: "alireza", email: "ali@gmail.com" }
//   return (
//     <div>
// {allproduct.map(item=>{
//     return <div style={{background:"white",margin:10,textAlign:"center",borderRadius:"10px",alignItems:"center",padding:"10px"}}>
//     <h3>{item.price}</h3>
//     <h1>{item.name}</h1>
//     <button onClick={()=>addbasket(item)}>+</button>
//     <button onClick={()=>addwish(item,user)}>*</button>
//     <button onClick={()=>removewish(item,user)}>-</button>
//     <button onClick={()=>addwishplus(item,user)}>fetch</button>
//     <h1>{items.find(items=>items.productId==item.id)?.productId !=undefined ?items.find(items=>items.productId==item.id)?.productId:"nadard"}</h1>
// <FavoriteBorderIcon onClick={()=>handelike(item,user)} color={items.find(items=>items.productId==item.id)?.productId !=undefined ? "error":"info" }/>
//     </div>
// })}
//    {items.map((item) => (
//         <div key={item.id}>{item._id}</div>
//       ))}

// <Basket/>
// <BasketMojodi/>
//     </div>
//   )
// }