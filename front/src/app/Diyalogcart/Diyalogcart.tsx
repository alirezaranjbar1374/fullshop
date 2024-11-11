import React, { ReactNode, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Container,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent // وارد کردن SelectChangeEvent
} from '@mui/material';
import style from './diaylog.module.css';

// تعریف اینترفیس برای Props
interface DiyalogcartProps {
  children: (valueinput: string) => ReactNode; // children به عنوان تابع
  opendiyalog: boolean; // وضعیت باز یا بسته بودن دیالوگ
  handleClosedyalog: () => void; // تابع برای بستن دیالوگ
}

const Diyalogcart: React.FC<DiyalogcartProps> = ({ children, opendiyalog, handleClosedyalog }) => {
  const [valueinput, setValueInput] = useState<string>(""); // وضعیت ورودی جستجو
  const [searchTerm, setSearchTerm] = useState<string>(''); // وضعیت اصطلاح جستجو
  const [listLocationSearch, setListLocationSearch] = useState<any[]>([]); // لیست نتایج جستجو
  const [selectOpen, setSelectOpen] = useState<boolean>(false); // وضعیت باز و بسته بودن Select
  const [searchDone, setSearchDone] = useState<boolean>(false); // وضعیت انجام جستجو
  const [age, setAge] = useState<string>(''); // وضعیت انتخاب شده

  // تابع برای جستجو
  const handleSearch = () => {
    setSearchDone(true);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setListLocationSearch(data); // ذخیره نتایج جستجو در وضعیت
        if (data.length > 0) {
          setSelectOpen(true); // باز کردن Select در صورت وجود نتایج
        } else {
          alert("No results found"); // نمایش پیام در صورت عدم وجود نتایج
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error); // چاپ خطا در کنسول
        alert("Error fetching location"); // نمایش پیام خطا
      });
  };

  // تابع برای تغییر انتخاب
  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedItem = event.target.value; // مقدار انتخاب شده

    // بررسی اینکه آیا selectedItem شامل lat و lon است
    if (selectedItem && typeof selectedItem === 'object' && 'lat' in selectedItem && 'lon' in selectedItem) {
      const { lat, lon } = selectedItem; // استخراج lat و lon

      console.log("Coordinates:", [lat, lon]);
      let selectedLocation = { position: [lat, lon], name: searchTerm }; // ذخیره موقعیت انتخاب شده
console.log("selectedItem",selectedItem);

      setAge(selectedItem); // ذخیره مقدار انتخاب شده
      setSelectOpen(false); // بستن Select بعد از انتخاب
    } else {
      console.error("Selected item does not contain lat and lon", selectedItem);
    }
  };

  return (
    <Box>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={opendiyalog} // وضعیت باز بودن دیالوگ
        onClose={handleClosedyalog} // تابع برای بستن دیالوگ
      >
        {/* <DialogTitle>
          علیرضارنجبر
        </DialogTitle> */}
        <DialogContent>
        <Box className={`${listLocationSearch.length == 0 ? style.Boxinput1 : style.Boxinput2}`} style={{ textAlign: "center" }}>
        <input
              value={searchTerm} // مقدار ورودی جستجو
              onChange={(e) => setSearchTerm(e.target.value)} // به‌روزرسانی وضعیت جستجو
              placeholder="جستجو"
            />
            {listLocationSearch.length}
            <Button 
              variant='contained' 
              color='success' 
              onClick={handleSearch} // فراخوانی تابع جستجو
              style={{ margin: '3px', padding: '4px',borderRadius:"5px" }}
            >
              سرچ موقعیت
            </Button>         
            <Select 
            autoWidth
            fullWidth={false}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age} // مقدار انتخاب شده
              label="Age"
              onChange={handleChange} // به‌روزرسانی وضعیت انتخاب
              open={selectOpen} // کنترل وضعیت باز بودن Select
              onOpen={() => setSelectOpen(true)} // باز کردن Select
              onClose={() => setSelectOpen(false)} // بستن Select
            >
              {listLocationSearch.map(item => (
                
                <MenuItem key={item.place_id} value={item}>
                  <em> {item.display_name}</em>
        
                </MenuItem>
              ))}
            </Select>
          </Box>
          {children(age)} {/* ارسال valueinput به تابع children */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosedyalog}>نه منصرف شدم</Button>
          <Button>میرم برمیگردم بابا</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Diyalogcart;