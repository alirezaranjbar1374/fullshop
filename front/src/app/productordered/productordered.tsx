import { Badge, Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import style from './productordered.module.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image';

const Productordered: React.FC = () => {
  // تابع برای تبدیل اعداد به اعداد فارسی
  function convertToPersianDigits(number: number): string {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  }
  
  const number = 402390874;
  const persianNumber = convertToPersianDigits(number);
  const price = 2000000;

  return (
    <Container>
      <Box className={style.containerproduct}>
        <Container className={style.boxdeliver}>
          <CheckCircleOutlineIcon className={style.icondeliver} />
          <Typography variant='h6'>تحویل شده</Typography>
        </Container>

        <Box className={style.boxitemproduct}>
          <ul className={style.boxorderli}>
            <li>
              <Typography className={style.titleorder} variant='body1'>20 مردا 1403</Typography>
            </li>
            <li className={style.codeorder}>
              <Typography className={style.titleorder} variant='body1'>کد سفارش:</Typography>
              <Typography className={style.numberorder} variant='body1'>{persianNumber}</Typography>
            </li>
            <li className={style.codeorder}>
              <Typography className={style.titleorder} variant='body1'>مبلغ:</Typography>
              <Typography className={style.numberorder} variant='body1'>{price.toLocaleString("FA-IR")}</Typography>
            </li>
          </ul>
        </Box>

        <Box className={style.boxitemproduct}>
          <Box className={style.boximg}>

            <img className={style.imgorderd} src='../13.jpg' alt="محصول" />
            <img className={style.imgorderd} src='./13.jpg' alt="محصول" />
            <img className={style.imgorderd} src='./13.jpg' alt="محصول" />
            <img className={style.imgorderd} src='./13.jpg' alt="محصول" />
            <img className={style.imgorderd} src='./13.jpg' alt="محصول" />
            <img className={style.imgorderd} src='./13.jpg' alt="محصول" />
            <img className={style.imgorderd} src='./13.jpg' alt="محصول" />
            <img className={style.imgorderd} src='./13.jpg' alt="محصول" />
            <img className={style.imgorderd} src='./13.jpg' alt="محصول" />
          </Box>
        </Box>

        <Box className={style.boxitemproduct}>
          <Typography className={style.titlefactor} variant='body1'>مشاهده فاکتور</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Productordered;