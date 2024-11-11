import { Badge, Box } from '@mui/material';
import React from 'react';
import style from './productordered.module.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Productordered from '../productordered/productordered';
import Ordercaceled from '../ordercaceled/Ordercaceled';

const BoxOrdered: React.FC = () => {
  // تابع برای تبدیل اعداد به اعداد فارسی
  function convertToPersianDigits(number: number): string {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  }
  
  const number = 402390874;
  const persianNumber = convertToPersianDigits(number);
  const price = 2000000;

  return (
    <Box>
      <h6 className={style.texttitle}>تاریخچه سفارشات</h6>
      <ul className={style.boxitemnav}>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'top' }} badgeContent={10} color="warning" style={{ padding: 0.1 }}>
          <li>جاری</li>
        </Badge>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'top' }} badgeContent={4} color="success" style={{ padding: 0.5 }}>
          <li>تحویل شده</li>
        </Badge>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'top' }} badgeContent={2} color="info" style={{ padding: 0.5 }}>
          <li>مرجوع شده</li>
        </Badge>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'top' }} badgeContent={2} color="error" style={{ padding: 0.5 }}>
          <li>لغو شده</li>
        </Badge>
      </ul>
      <div className={style.actionorder}>
        <Productordered />
        <Productordered />
        <Ordercaceled/>
     
      </div>
    </Box>
  );
};

export default BoxOrdered;