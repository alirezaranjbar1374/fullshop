'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AccountCircle, Password } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Button, Container, InputAdornment, TextField, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import OtpInputbox from '../Otpinput/OtpInput';
import swal from 'sweetalert';
import Image from 'next/image';

import style from './register.module.css';
import OTPTimeout from '../OtipTimeOut/OTPTimeout';

const Register: React.FC = () => {
  const [Otpinter, setOtpinter] = useState<boolean>(false);
  const [Titlematn, setTitlematn] = useState<string>('ثبت نام');
  const [valueotp, setValueotp] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [disoptbtn,setDisoptbtn]=useState<string>("ali")
  const [valuerest, setValuerest] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null); 
  const registerButtonRef = useRef<HTMLButtonElement | null>(null); 

  const resendOTP = () => {

   handelsubmitbeforcode();

  };

  const submitregister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if(disoptbtn==="javad1"  && valueotp.length<2){
    //   alert("aaaaaa")
    //   // handelsubmitbeforcode();

    // }else{
    //   alert("hhjh")
    // }

    if( name=="" || email=="" || password=="" || phonenumber==""){
      swal({
        title: "وارد کردن تمام فیلد های فرم اجباری است",
        icon: "warning",
        dangerMode: true,
        buttons: {
            confirm: {
                text: "تلاش مجدد",
                value: true,
                visible: true,
                className: "btn-confirm",
                closeModal: true, 
            },
        },
    });
    }else{
      if(valueotp.length>4){
        verifaycode(); 
      }
      if (valueotp === ''   ) {
        handelsubmitbeforcode();
      }
    }
   
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); 
    }


  }, [valueotp,valuerest]);


  const verifaycode = async () => {
    const body = { name, password, email, phone: phonenumber, code: valueotp };

    const res = await fetch("http://localhost:3001/api/user/verfiayfaraz", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (res.status === 403) {
        swal({
            title: "کاربر تکراری است",
            icon: "warning",
            dangerMode: true,
            buttons: {
                confirm: {
                    text: "تلاش مجدد",
                    value: true,
                    visible: true,
                    className: "btn-confirm",
                    closeModal: true, 
                },
            },
        });
        

        }

    if (res.status === 409) {
        swal({
            title: "کد به درستی وارد نشده",
            icon: "warning",
            dangerMode: true,
            buttons: {
                confirm: {
                    text: "تلاش مجدد",
                    value: true,
                    visible: true,
                    className: "btn-confirm",
                    closeModal: true, 
                },
            },
        });
    }

    if (res.status === 410) {
      swal({
        title: "متاسفانه دیر کد را وارد کردید مجدددرخواست  دهید",
        icon: "warning",
        dangerMode: true,
        buttons: {
            confirm: {
                text: "تلاش مجدد",
                value: true,
                visible: true,
                className: "btn-confirm",
                closeModal: true, 
            },
        },
    });
    }

    if (res.status === 201) {
        swal({
            title: "با موفقیت وارد شدید",
            icon: "warning",
            dangerMode: true,
            buttons: {
                confirm: {
                    text: "تلاش مجدد",
                    value: true,
                    visible: true,
                    className: "btn-confirm",
                    closeModal: true, // اگر می‌خواهید دیالوگ بسته شود
                },
            },
        }).then(() => {
            window.location.assign("http://localhost:3000/poroduct");
          });

   
    }
  };

  const handelsubmitbeforcode = async () => {
    const body = { name, password, email, phone: phonenumber };

    const res = await fetch("http://localhost:3001/api/user/registerproduct", {
      method: "post",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (res.status === 400) {
  


      swal({
        title: "کاربر تکراری",
        text: "ایمیل یا شماره وارد شده قبلا در سیستم ثبت شده",

        icon: "warning",
        dangerMode: true,
        buttons: {
            confirm: {
                text: "تلاش مجدد",
                value: true,
                visible: true,
                className: "btn-confirm",
                closeModal: true, // اگر می‌خواهید دیالوگ بسته شود
            },
        },
    });





    }

    if (res.status === 401) {
 



      swal({
        title: "وارد کردن تمام فیلد ها اجباری است",

        icon: "warning",
        dangerMode: true,
        buttons: {
            confirm: {
                text: "تلاش مجدد",
                value: true,
                visible: true,
                className: "btn-confirm",
                closeModal: true, // اگر می‌خواهید دیالوگ بسته شود
            },
        },
    });



    }

    if (res.status === 501) {
      setOtpinter(true);
      setTitlematn("کد ارسالی را وارد کنید");

      swal({
        title: "مشکلی در ارسال کد داریم لطفا چند دقیقه بعد مجدد تلاش کنید",

        icon: "warning",
        dangerMode: true,
        buttons: {
            confirm: {
                text: "تلاش مجدد",
                value: true,
                visible: true,
                className: "btn-confirm",
                closeModal: true, // اگر می‌خواهید دیالوگ بسته شود
            },
        },
    });



    }

    if (res.status === 201) {
 
      
      swal({
        title: "کد با موفقیت ارسال شد",

        icon: "success",
        dangerMode: false,
        buttons: {
            confirm: {
                text: "تلاش مجدد",
                value: true,
                visible: true,
                className: "btn-confirm",
                closeModal: true, // اگر می‌خواهید دیالوگ بسته شود
            },
        },
    }).then(() => {
        setOtpinter(true);
        setTitlematn("کد ارسالی را وارد کنید");
      });
    }
  };

  return (
    
    <form style={{ height: "auto",textAlign:"center" }} className={style.boxregister} onSubmit={submitregister}>
      <div className={style.containerlogin}>
        <div className={style.animatedimg}>


        <div className={style.bordercontainer}>
    <div className={style.border}></div> 
    <Image className={style.imglogo}
                src="data:image/png;base64,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" // مسیر تصویر (می‌تواند یک URL خارجی نیز باشد)
                alt="logo=oicture"
                width={100} 
                height={300} 
                priority 
            /></div>
   
        </div>
      </div>
      <Container className={style.boxaval}>
        <Box className={style.boxinput}>
          <Typography className={style.titletext} variant='h4'>{Titlematn}</Typography>
          <Container>
            {
              !Otpinter ? (
                <>
                  <TextField
                    className={style.divinput}
                    fullWidth
                    inputRef={inputRef}
               
                    value={name}
                    onChange={e => setName(e.target.value)}
                    label="نام کاربری"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle color='info' />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />

                  <TextField
                    className={style.divinput}
                    fullWidth
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    label="ایمیل(اختیاری)"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon color='info' />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    className={style.divinput}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    label="رمزعبور"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Password color='info' />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    value={phonenumber}
                    onChange={e => setPhonenumber(e.target.value)}
                    className={style.divinput}
                    label="شماره موبایل"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PhoneIcon color='info' />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </>
              ) : (
             <>
       
             <OtpInputbox  setValueotp={setValueotp} />
                <OTPTimeout   resendOTP={resendOTP}  
                disoptbtn={disoptbtn} setDisoptbtn={setDisoptbtn}  />

             </>
            
              )
              
            }
            <Container>
              <Button
               ref={registerButtonRef}
              disabled={  valueotp.length>4 || Otpinter==false ?false:true}
                type="submit"
                fullWidth
                className={style.btn}
                variant="contained"
                color='success'
                disableElevation
              >
                ثبت نام
              </Button>
            </Container>
          </Container>
        </Box>
      </Container>
    </form>
  );
};

export default Register;