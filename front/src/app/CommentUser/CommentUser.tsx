import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import style from './productordered.module.css';
import StoreIcon from '@mui/icons-material/Store';
import Image from 'next/image';

const CommentUser: React.FC = () => {
  // تابع برای تبدیل اعداد به اعداد فارسی
  function convertToPersianDigits(number: number): string {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  }

  const number = 402390874;
  const persianNumber = convertToPersianDigits(number);
  let price = 2000000;

  return (
    <Container>
      <Box className={style.containerproduct}>
        <Box className={style.boxitemproduct}>
          <Box className={style.mainbox}>
            <Box className={style.boximg}>
      
              <img className={style.imgorderd} src='./11.webp' alt="محصول" />
              <Typography className={style.titleproductcomment} variant='h6'>محصول زیبایی اخرین</Typography>
            </Box>
            <Box className={style.boxdeliver}>
              <CheckCircleOutlineIcon className={style.icondeliver} />
              <Typography className={style.titleproductcomment} variant='body1'>تایید شده</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={style.boxitemproduct}>
          <Typography className={style.commentuser} variant='body1'>خیلی خوب بود</Typography>
        </Box>
        <Box className={style.boxidetilproduct}>
          <StoreIcon />
          <Typography className={style.titlecompanyproduct} variant='body2'>مغازه حسن</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default CommentUser;