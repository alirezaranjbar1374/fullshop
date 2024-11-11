import React, { useState, useEffect } from 'react';

// تعریف نوع ورودی‌ها
interface OTPTimeoutProps {
    disoptbtn: string;
    setDisoptbtn: (value: string) => void;
    resendOTP: () => void; // تعریف نوع تابع resendOTP
  }
const OTPTimeout: React.FC<OTPTimeoutProps> = ({ disoptbtn, setDisoptbtn,resendOTP }) => {
  const [timeLeft, setTimeLeft] = useState<number>(60);

  useEffect(() => {
    const savedTime = localStorage.getItem('otpTimestamp');
    console.log("savedTime", savedTime);
    
    if (savedTime) {
      const timeElapsed = Math.floor((Date.now() - parseInt(savedTime)) / 1000);
      console.log("timeElapsed", timeElapsed);
      if (timeElapsed < 60) {
        setDisoptbtn("reza");
        setTimeLeft(60 - timeElapsed);
      } else {
        setTimeLeft(0);
        setDisoptbtn("ali");
      }
    } else {
      localStorage.setItem('otpTimestamp', Date.now().toString());
    }
  }, [setDisoptbtn]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const resendOTP1 = () => {
    // پیاده‌سازی منطق ارسال مجدد OTP
    setDisoptbtn("javad1")
    setTimeLeft(60);
    localStorage.setItem('otpTimestamp', Date.now().toString());
    resendOTP()
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      {timeLeft > 0 ? (
        <>
          <p>
            {minutes.toLocaleString("fa-IR").padStart(2, "۰")}:
            {seconds.toLocaleString("fa-IR").padStart(2, "۰")} مانده تا دریافت مجدد کد 
          </p>
        </>
      ) : (
        <p style={{ cursor: "pointer" }} onClick={resendOTP1}>دریافت مجدد کد</p>
      )}
    </div>
  );
};

export default OTPTimeout;