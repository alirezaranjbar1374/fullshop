import { Badge, Box, Container, Typography } from '@mui/material';
import React from 'react';
import style from './productordered.module.css';
import CancelIcon from '@mui/icons-material/Cancel';

const Ordercaceled: React.FC = () => {
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
          <CancelIcon className={style.iconcancel} />
          <Typography variant='h6'>لغو شده</Typography>
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
            <img className={style.imgorderd} src='./a11.webp' alt="محصول" />
            <img className={style.imgorderd} src='./a11.webp' alt="محصول" />
            <img className={style.imgorderd} src='./a11.webp' alt="محصول" />
            <img className={style.imgorderd} src='./a11.webp' alt="محصول" />
            <img className={style.imgorderd} src='./a11.webp' alt="محصول" />
            <img className={style.imgorderd} src='./a11.webp' alt="محصول" />
            <img className={style.imgorderd} src='./a11.webp' alt="محصول" />
            <img className={style.imgorderd} src='./a11.webp' alt="محصول" />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Ordercaceled;