import { Badge, Box } from '@mui/material';
import React from 'react';
import style from './productordered.module.css';
import CommentUser from '../CommentUser/CommentUser';

const Boxcommentuser: React.FC = () => {
  // تابع برای تبدیل اعداد به اعداد فارسی
  function convertToPersianDigits(number: number): string {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    return number.toString().replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
  }

  const number = 402390874;
  const persianNumber = convertToPersianDigits(number);
  let price = 2000000;

  return (
    <Box>
      <h6 className={style.texttitle}>دیدگاه‌ها و پرسش‌ها</h6>
      <ul className={style.boxitemnav}>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'top' }} badgeContent={10} color="warning" style={{ padding: 0.1 }}>
          <li>در انتظار دیدگاه</li>
        </Badge>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'top' }} badgeContent={4} color="success" style={{ padding: 0.1 }}>
          <li>دیدگاه‌های من</li>
        </Badge>
        <Badge anchorOrigin={{ horizontal: 'right', vertical: 'top' }} badgeContent={2} color="info" style={{ padding: 0.1 }}>
          <li>پرسش‌های من</li>
        </Badge>
      </ul>
      <div className={style.actionorder}>
        <CommentUser />
      </div>
    </Box>
  );
};

export default Boxcommentuser;