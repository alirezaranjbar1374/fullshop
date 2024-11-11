'use client';

// MapComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import L, { Icon } from 'leaflet';
import style from './MapComponent.module.css';
import { Box, Button, Typography, Container,Modal } from '@mui/material';

const myIcon = new Icon({
  iconUrl: '/map-marker.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MyMapSearch = ({ inputValue }) => {
  console.log("inputValue12", inputValue !== null || inputValue !== undefined ? inputValue : "anadrim");
  const { lat, lon } = inputValue || {}; // استفاده از destructuring و مقدار پیش‌فرض

  const [markers, setMarkers] = useState([
    { position: [35.807220110565176, 51.42872194744086], name: 'تجریش' },
    { position: [35.66430451925379, 51.37897482826794], name: 'سلوط' },
  ]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [position, setPosition] = useState([35.7262, 51.4050]);
  const [searchshode, setSearchshode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [listlocationsearch, setListlocationsearch] = useState([]);
  const [selectOpen, setSelectOpen] = useState(false);
  const [namemarker,setNamemarker]=useState("")
  const [removeafter,setReomveafter]=useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  
  const getLocationName = async (latlng) => {
    const { lat, lng } = latlng;
    const response = await fetch(`https://api.neshan.org/v4/reverse?lat=${lat}&lng=${lng}`, {
      method: 'GET',
      headers: {
        'api-key': 'service.9eca146242164a2ab118f6c84fbf4c47', // کلید API خود را اینجا قرار دهید
      },
    });
    
    if (!response.ok) {
      throw new Error('Error fetching location');
    }
    
    const data = await response.json();
    setNamemarker(data?.route_name)
    console.log("address",data);
    console.log("data.address",data?.route_name);
    
    

    return data?.route_name; // نام آدرس یا مکان را برمی‌گرداند // نام آدرس یا مکان را برمی‌گرداند
  };

  const handleChange = (inputValue) => {
    setSearchshode(true)

    console.log("inputValuechang", inputValue);
    const selectedItem = inputValue;

    // بررسی اینکه آیا selectedItem شامل lat و lon است
    if (selectedItem && typeof selectedItem === 'object' && 'lat' in selectedItem && 'lon' in selectedItem) {
      const { lat, lon } = selectedItem;

      console.log("Coordinates12:", [lat, lon]);
      let feli = { position: [lat, lon], name: searchTerm }; // ذخیره موقعیت انتخاب شده
console.log("feli",feli);
      setMarkers([...markers, feli]); // به‌روزرسانی markers
      setPosition([lat, lon]); // به‌روزرسانی position
      setSelectOpen(false); // بستن Select بعد از انتخاب
    }
  };

  useEffect(() => {
    if (lat !== undefined && lon !== undefined) {
      console.log("kkkkkjk");
      handleChange(inputValue); // فراخوانی handleChange با inputValue
    }
  }, [lat, lon, inputValue]); // وابستگی به lat و lon و inputValue

  const MapEvents = () => {
    const map = useMapEvents({
      locationfound(e) {
        if (searchshode) {
          map.setView(e.latlng, 14);
        }
      },
    });

    if (position) {
      if (searchshode) {
        map.setView(position, 14);
      }
    }

   
    useMapEvents({
      click: async(event) => {
        if(removeafter==true){
          setTimeout(() => {
            setReomveafter(false)
          }, 1000);
          return false
        }else{
          const latlng = event.latlng;
          const locationName = await getLocationName(latlng); // دریافت نام مکان
          console.log("locationName12",locationName);
        
          await addMarker(latlng, locationName); // اضافه کردن مارکر با نام مکان
        }
      },
    });
    return null;
  };
  const removeMarker = (index) => {
    const newMarkers = markers.filter((_, i) => i !== index); // حذف مارکر با استفاده از فیلتر

    setMarkers(newMarkers); 
    setReomveafter(true)
    return false
  };
  const addMarker = (latlng, locationName) => {
    const newMarker = {
      position: [latlng.lat, latlng.lng],
      name: locationName || `مارکر ${markers.length + 1}`,
    };
    setMarkers([...markers, newMarker]);
    setTimeout(() => {
      handleOpen()

    }, 4000);
  };

  return (
    <Box className={style.BoxContainer} style={{ textAlign: "center", padding: 2 }}>
      {/* <Container className={style.Boxinput12} style={{ textAlign: "center" }}>
        <Button variant='contained' color='success' onClick={handleSearch} style={{ margin: '10px', padding: '10px' }}>
          سرچ موقعیت
        </Button>
      </Container> */}
      <MapContainer className={style.mapcontainer} center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        {markers.map((marker, index) => (
          <Marker icon={myIcon} key={index} position={marker.position}>
            <Popup>
              <Typography variant='h6'>{marker.name}</Typography>
              <Button variant='contained' color='error' onClick={() => removeMarker(index)}>حذف</Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
       <Box>
       <Typography id="modal-modal-title" variant="h6" component="h2">
            لطفا ادرس خود را بنویسید
          </Typography>
       </Box>
     <Container style={{textAlign:"center",border:"1px solid green"}}>
     <textarea
          id="comment"
          name="comment"
          cols={30}
          rows={4}
          required
          placeholder=""
        ></textarea>
                <Button onClick={handleClose}>ذخیره</Button>

     </Container>

        </Box>

       
      </Modal>
    </div>
    </Box>
  );
};

export default MyMapSearch;