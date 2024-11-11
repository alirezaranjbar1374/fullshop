import React, { useEffect, useRef, useState } from 'react';
import OtpInput from 'react-otp-input';
import style from './Otpstyle.module.css';

interface OtpInputBoxProps {
  setValueotp: (otp: string) => void; // نوع props
}

const OtpInputbox: React.FC<OtpInputBoxProps> = ({ setValueotp }) => {
  const [otp, setOtp] = useState<string>(''); // نوع state
  const inputRef = useRef<HTMLInputElement | null>(null); // نوع ref
  const clearOtp = () => {
    setOtp('');
    setValueotp("") // خالی کردن ورودی OTP
  };
  useEffect(() => {
    
    if (otp) {
      setValueotp(otp);
    }
    if (inputRef.current) {
      inputRef.current.focus(); // فوکوس روی اولین ورودی پس از بارگذاری کامپوننت
    }
  }, [otp, setValueotp,setOtp]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      direction: "ltr"
    }}>
      <OtpInput
        containerStyle={style.boxinputotp}
        value={otp}
        onChange={setOtp}
        numInputs={5}
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />} // اختصاص ref به اولین ورودی
        inputStyle={{
          width: '50px',
          height: '50px',
          fontSize: '20px',
          borderRadius: '8px',
          border: '2px solid #ccc',
        }}
      />

    </div>
  );
}

export default OtpInputbox;