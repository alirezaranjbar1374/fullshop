"use client"
import { Grid, Container, Box, Typography, TextField, InputAdornment, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import style from './userdetil.module.css';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { ApiGetService } from '../../../utils/Baseyurlget';
import { decodeToken } from '../../../utils/DecodeToken/DecodeToken';

const UserDeti: React.FC = () => {

    interface datatyoeuser {
        name: string,
        email: string,
        password?: string,
        phone: string,
        isaccept: boolean,
        natioancode: string,
        birthDate: string,
        ibn: string
    }
    const [dataform, setDataform] = useState<datatyoeuser>()


    const [date, setDate] = useState<DateObject | null>(null);
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [id,setId]=useState("")
const [phone,setPhone]=useState("")
const [natioancode,setNatioancode]=useState("")
const [birthDate,setBirthDate]=useState("")
const [ibn,setIban]=useState("")

    const [open, setOpen] = useState(false);
    const datePickerRef = useRef<any>(null); // استفاده از any برای تطبیق با نوع مرجع DatePicker
    const refdate = useRef<HTMLDivElement | null>(null);
    const apiService = new ApiGetService('url');




    const handleDateChange = (selectedDate: DateObject | null) => {
        console.log(selectedDate);
        
        setDate(selectedDate);
        setBirthDate(selectedDate ? selectedDate.format("YYYY/MM/DD") : ""); // به روز رسانی birthDate
        setOpen(false);
    };

    const handleTextFieldClick = () => {
        setOpen(true);
        datePickerRef.current?.openCalendar();
    };

    const hadelemuduldate = () => {
      console.log("dada");
      
    };
    const hadnelesubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // جلوگیری از رویدادهای اضافی، در صورت نیاز
    
        const body = {
            _id: id,
            name: name,
            email: email,
            phone: phone,
            natioancode: natioancode,
            birthDate: birthDate,
            ibn: ibn,
        };
        const dateTEST = new Date(birthDate);
    
    

        console.log("body",body,date,dateTEST);
        
    
        try {
            const postdata = await apiService.UserUpdate("product/updateUserDetil", body);
            alert("با موفقیت برروزرسانی شد")
            console.log(postdata);
        } catch (error) {
            console.error("Error updating user details:", error);
        }
    };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
          
                const   userId=decodeToken(localStorage?.getItem("loginproduct"))
            
               


                const result = await apiService.fetchUserData("product/finduser", userId?._id);
                setName(result.name)
                setEmail(result.email)
                setPhone(result.phone)
                setBirthDate(result.birthDate)
                setIban(result.ibn)
                setNatioancode(result.natioancode)
                setId(result._id)
             
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if(localStorage?.getItem("loginproduct")){
            fetchData();
     
        }
        
    }, []);

    return (
        <>
            <Grid container spacing={2} style={{ padding: '10px' }} >
                {/* سمت چپ */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        label="نام و نام خانوادگی"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <BorderColorIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="کد ملی"
                        value={natioancode}
onChange={(e)=>setNatioancode(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <BorderColorIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        fullWidth
                        ref={refdate}
                        label="ایمیل"
                        value={email}
onChange={(e)=>setEmail(e.target.value)}
                        variant="outlined"
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <BorderColorIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                {/* سمت راست */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        onMouseDownCapture={hadelemuduldate}
                        fullWidth
                        value={ibn}
onChange={(e)=>setIban(e.target.value)}
                        label="روش بازگرداندن پول"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <BorderColorIcon />
                                </InputAdornment>
                            ),
                        }}
                    />



           

<TextField
    onChange={(e) => setBirthDate(e.target.value)} // این خط می‌تواند حذف شود زیرا شما از DatePicker استفاده می‌کنید
    onClick={handleTextFieldClick}
    value={birthDate} // فقط از birthDate استفاده کنید
    fullWidth
    label="تاریخ تولد"
    variant="outlined"
    InputLabelProps={{ shrink: true }}
    margin="normal"
    InputProps={{
        endAdornment: (
            <InputAdornment position="start">
                <BorderColorIcon />
            </InputAdornment>
        ),
    }}
/>

                    <TextField
                        fullWidth
                        label="شماره موبایل"
                        variant="outlined"
                        value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        margin="normal"
                        InputLabelProps={{ shrink: true }} // لیبل به بالا حرکت می‌کند

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <BorderColorIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button onClick={hadnelesubmit} variant="contained" color="success" fullWidth>
                        ارسال
                    </Button>
                </Grid>

                <DatePicker
                    ref={datePickerRef}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    value={date}
                    format="YYYY/MM/DD HH:mm:ss"
                    onChange={handleDateChange}
                    style={{ display: open ? "block" : "none", opacity: 0 }}
                    className="rmdp-mobile"
                />
            </Grid>
        </>
    );
};

export default UserDeti;