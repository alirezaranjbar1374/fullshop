import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const Addproduct=()=> {
    const [title,setTitle]=useState("")
    const [name,setName]=useState("")
    const [href,setHref]=useState("")
    const [price,setprice]=useState("")
    const [ofprice,setOprice]=useState("")
    const [categori,setCategori]=useState("")
    const [dastbandi,setDastbandi]=useState("")
    const [numberof,setNumberof]=useState("")
    const [color,setColor]=useState("")
    const [rate,setRate]=useState("")
    const [weight,setWeight]=useState("")
    const [pic, setPic] = useState<File | null |any>(null);
    const formdata=new FormData()
    formdata.append("title",title.trim())
    formdata.append("name",name.trim())
    formdata.append("href",href.trim())
    formdata.append("price",price.trim())
    formdata.append("ofprice",ofprice.trim())
    formdata.append("categori",categori.trim())
    formdata.append("dastbandi",dastbandi.trim())
    formdata.append("numberof",numberof.trim())
    formdata.append("color",color.trim())
    formdata.append("rate",rate.trim())
    formdata.append("weight",weight.trim())
    formdata.append("coverasli",pic)
const handleSumbmitAddCourse=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    axios.post("http://localhost:3001/api/product/createproductAdd",formdata).then(res=>{
        alert("باموفقیت اضافه شد")
        console.log("res",res);
    }).catch(err=>{
        console.log("err",err);
    })


}
    function handleUpload(event:React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setPic(file);
        } else {
            console.error("No file selected");
        }
      }
    

  return (
    <div>
        
  <form onSubmit={handleSumbmitAddCourse} action="/action_page.php" style={{textAlign:"center",display:"flex",flexWrap:"wrap",justifyContent:"space-between",padding:10}}>
        <div style={{margin:"3px"}}>
        <TextField value={title} onChange={(e)=>setTitle(e.target.value)} id="standard-basic" label="عنوان" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={name} onChange={(e)=>setName(e.target.value)}  id="standard-basic" label="نام" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={href} onChange={(e)=>setHref(e.target.value)} id="standard-basic" label="مسیرمحصول" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={price} onChange={(e)=>setprice(e.target.value)} id="standard-basic" label="قیمت محصول" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={ofprice} onChange={(e)=>setOprice(e.target.value)} id="standard-basic" label="قیمت اف خورده" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={categori} onChange={(e)=>setCategori(e.target.value)} id="standard-basic" label="کتگوری" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={dastbandi} onChange={(e)=>setDastbandi(e.target.value)} id="standard-basic" label="دست بندی" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={numberof} onChange={(e)=>setNumberof(e.target.value)} id="standard-basic" label="موجودی در انبار (تعداد)" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}> 
        <TextField value={color} onChange={(e)=>setColor(e.target.value)} id="standard-basic" label="رنگ" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={rate} onChange={(e)=>setRate(e.target.value)} id="standard-basic" label="امتیاز محصول" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={weight} onChange={(e)=>setWeight(e.target.value)} id="standard-basic" label="وزن" variant="outlined" />
        </div>
    <div>
        
      <input type="file" onChange={handleUpload} />
    </div>
    <div>
      <input  style={{background:"green",color:"white",width:"100px",height:"40px",fontSize:"25px" ,cursor:"pointer"}} type="submit" value="ذخیره"/>
    </div>
    </form>
    </div>
  )
}

export default Addproduct;