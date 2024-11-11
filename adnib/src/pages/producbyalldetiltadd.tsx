import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'

const Producbyalldetiltadd=()=> {
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
    const [adress,setAdress]=useState<string>("")
    const [created,setCreated]=useState<string>("")
    const [dec,setDec]=useState<string>("")
    const [citycreate,setCitycreate]=useState<string>("")
    const [numberofbehdasht,setNumberofbehdasht]=useState<string>("")

    
    
    
    
    const [phonenumber,setPhonenumber]=useState<string>("")
    const [video, setVideo] = useState<File | null |any>(null);
    const [pic, setPic] = useState<File | null |any>(null);
    const [additionalImages, setAdditionalImages] = useState<File[]>([]);

    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAdditionalImages(Array.from(e.target.files)); // چندین فایل برای عکس‌های اضافی
        }
    };
    // console.log(Array.from(3));
    
    function handleUploadvideo(event:React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setVideo(file);
        } else {
            console.error("No file selected");
        }
      }


      function handleUpload(event:React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            setPic(file);
        } else {
            console.error("No file selected");
        }
      }


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
    formdata.append("created",created.trim())
    formdata.append("dec",dec.trim())
    formdata.append("citycreate",citycreate.trim())
    formdata.append("numberofbehdasht",numberofbehdasht.trim())

    
    
    
    
    formdata.append("coverasli",pic)
    formdata.append("adress",adress.trim())
    formdata.append("phonenumber",phonenumber.trim())
    formdata.append("video",video)

    

    
    
    additionalImages.forEach((image) => {
        formdata.append('additionalImages', image);
        console.log(additionalImages);
        
    });

const handleSumbmitAddCourse=(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    console.log('Additional Images:', additionalImages);


    axios.post("http://localhost:3001/api/product/createproductdetil/671106a53058be3438ed85df",formdata).then(res=>{
        alert("باموفقیت اضافه شد")
        console.log("res",res);
    }).catch(err=>{
        console.log("err",err);
    })


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
        <TextField value={adress} onChange={(e)=>setAdress(e.target.value)} id="standard-basic" label="آدرس محصول" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} id="standard-basic" label="شماره تلفن محصول" variant="outlined" />
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
        <TextField value={dastbandi} onChange={(e)=>setDastbandi(e.target.value)} id="standard-basic" label="ساخته شده (اسم شرکت یا فروشگاه)" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={dec} onChange={(e)=>setDec(e.target.value)} id="standard-basic" label="توضیحات مفصل" variant="outlined" />
        </div>
        
        <div style={{margin:"3px"}}>
        <TextField value={created} onChange={(e)=>setCreated(e.target.value)} id="standard-basic" label="دست بندی" variant="outlined" />
        </div>
        <div style={{margin:"3px"}}>
        <TextField value={citycreate} onChange={(e)=>setCitycreate(e.target.value)} id="standard-basic" label="شهر-محله" variant="outlined" />
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
        <div style={{margin:"3px"}}>
        <TextField value={numberofbehdasht} onChange={(e)=>setNumberofbehdasht(e.target.value)} id="standard-basic" label="شماره بهداشت " variant="outlined" />
        </div>
        
        <div>
        <span>اپلود ویدو تکی محصول</span>

        <input type="file" onChange={handleUploadvideo} />

        
        </div>
    <div style={{background:"skyblu"}}>
        <span>اپلود عکس تکی محصول</span>
    <input type="file" onChange={handleUpload} />

    </div>
    <div>
    <span>اپلود عکس چندتایی محصول</span>

    <input type="file" accept="image/*" multiple onChange={handleAdditionalImagesChange} />

    </div>
   

      <input  style={{background:"green",color:"white",width:"100px",height:"40px",fontSize:"25px" ,cursor:"pointer"}} type="submit" value="ذخیره"/>
   
   
    
    </form>
    </div>
  )
}

export default Producbyalldetiltadd;