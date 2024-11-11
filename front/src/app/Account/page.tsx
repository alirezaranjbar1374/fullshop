'use client';

import { Badge, Box, Container, DialogActions, DialogContent, DialogContentText, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import React, { ReactNode, useState } from 'react';
import style from './boxacc.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import Diyalogcart from '../Diyalogcart/Diyalogcart';
import MyMapSearch from '../MapComponent/MyMapSearch';

interface BoxAccProps {
  children: ReactNode; // تغییر نوع به ReactNode
}


const BoxAcc: React.FC<BoxAccProps> = ({ children }) => {
  const [opendiylog, setOpendiylog] = useState<boolean>(false);
  const [valueinput, setValueInput] = useState<string>(''); // اضافه کردن state برای مقدار ورودی

  const handleClickOpen1 = () => {
    setOpendiylog(true);
  };

  const theme = useTheme();

  const handleClosedyalog = () => {
    setOpendiylog(false);
  };

  return (
    <Container className={style.BoxContainer}>
      <Box className={style.boxacc}>
        <Box className={style.boxrtl}>
          <Container>
            <ul>
              <div className={style.boxitem}>
                <PersonIcon className={style.iconitem} />
                <Link className={style.linkacc} href="/">اطلاعات حساب کاربری</Link>
              </div>
              <div className={style.boxitem}>
                <LocalMallIcon className={style.iconitem} />
                <Link className={style.linkacc} href="/">سفارش ها</Link>
              </div>
              <div className={style.boxitem}>
                <ForumIcon className={style.iconitem} />
                <Link className={style.linkacc} href="/">دیدگاها و پرسش ها</Link>
              </div>
              <div className={style.boxitem}>
                <FmdGoodIcon className={style.iconitem} />
                <Link className={style.linkacc} href="/">آدرس ها</Link>
              </div>
              <div className={style.boxitem}>
                <LocalOfferIcon className={style.iconitem} />
                <Link className={style.linkacc} href="/">کدتخفیف ها</Link>
              </div>
              <div onClick={handleClickOpen1} className={style.boxitem}>
                <LogoutIcon className={style.iconitem} />
                <Link className={style.linkacc} href="#">خروج</Link>
              </div>
            </ul>
          </Container>
        </Box>
        <Container className={style.boxltr}>
          {children}
        </Container>
      </Box>
      <Diyalogcart handleClosedyalog={handleClosedyalog} opendiyalog={opendiylog}>
        {(inputValue) => (
          
          <div>
          
            <MyMapSearch  inputValue={inputValue}/>

          </div>
        )}
      </Diyalogcart>
    </Container>
  );
};

export default BoxAcc;