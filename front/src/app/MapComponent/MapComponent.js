'use client';
// MapComponent.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer,Circle , Marker, Popup, useMapEvents, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import L, { Icon } from 'leaflet';
import marker from '../img/map-marker.png';
import markericonRetinaUrl from '../img/map-marker.png';
import markershadowUrl from '../img/map-marker.png';
import { Box } from '@mui/material';

const myIcon2 = new L.Icon({
  iconUrl: require('../img/map-marker.png'),
  iconRetinaUrl: require('../img/map-marker.png'),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: 'leaflet-div-icon'
});


var greenIcon = L.icon({
  iconUrl: 'leaf-green.png',
  shadowUrl: 'leaf-shadow.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const myIcon = new Icon({
  iconUrl: 'https://images.ctfassets.net/3prze68gbwl1/assetglossary-17su9wok1ui0z7w/c4c4bdcdf0d0f86447d3efc450d1d081/map-marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32], // نقطه لنگر آیکون
  popupAnchor: [0, -32], // نقطه لنگر پاپ‌آپ
});
 
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markericonRetinaUrl,
  iconUrl: marker,
  shadowUrl: markershadowUrl,
});




const MapComponent = () => {

  const [markers, setMarkers] = useState([
    { position: [35.807220110565176, 51.42872194744086], name: 'تجریش' },
    { position: [35.66430451925379, 51.37897482826794], name: 'سلوط' },
    // { position: [35.7262, 51.4050], name: 'شهرک غرب' },
   
  ]);

  const center = [35.66430451925379, 51.37897482826794]; // مرکز دایره
  const radius = 1500; // شعاع دایره به متر


  const [position, setPosition] = useState([35.7262, 51.4050])
  const [removeafter,setReomveafter]=useState(false)
  const [distance, setDistance] = useState(null); // state برای ذخیره فاصله
  const [route, setRoute] = useState([]);
  const [namemarker,setNamemarker]=useState("")

  const [searchTerm, setSearchTerm] = useState('');
  
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

  const fetchRoute = async (origin, destination) => {
    const response = await fetch(`https://api.neshan.org/v4/direction?type=car&origin=${origin}&destination=${destination}&avoidTrafficZone=false&avoidOddEvenZone=false&alternative=false`, {
      method: 'GET',
      headers: {
        'api-key': 'service.9eca146242164a2ab118f6c84fbf4c47', // کلید API خود را اینجا قرار دهید
      },
    });
    const data = await response.json();
    console.log("dataneshan",data);
    
    if (data.routes.length > 0) {
      const polylinePoints = decodePolyline(data.routes[0].overview_polyline.points);
      console.log("polylinePoints",polylinePoints);
      setRoute(polylinePoints);
    }
  };


  const decodePolyline = (polyline) => {
    const points = [];
    let index = 0, len = polyline.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = ((result >> 1) ^ -(result & 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = ((result >> 1) ^ -(result & 1));
      lng += dlng;

      points.push([lat / 1E5, lng / 1E5]);
    }
    return points;
  };





// تابع برای محاسبه فاصله بین دو نقطه
const calculateDistance = (latlng1, latlng2) => {
  const R = 6371; // شعاع زمین به کیلومتر
  const dLat = (latlng2.lat - latlng1.lat) * (Math.PI / 180);
  const dLon = (latlng2.lng - latlng1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(latlng1.lat * (Math.PI / 180)) * Math.cos(latlng2.lat * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // فاصله به کیلومتر
};



const handleDistanceCalculation = () => {
  if (markers.length >= 2) {
    const dist = calculateDistance(
      { lat: markers[1].position[0], lng: markers[1].position[1] },
      { lat: markers[0].position[0], lng: markers[0].position[1] }
    );
    setDistance(dist.toFixed(2)); // ذخیره فاصله به دو رقم اعشار
  }

  console.log("distance",distance);
  console.log("marker",markers);
};









useEffect(() => {
  if (markers.length === 2) {
    const origin = `${markers[0].position[0]},${markers[0].position[1]}`;
    const destination = `${markers[1].position[0]},${markers[1].position[1]}`;
    fetchRoute(origin, destination);
  }
}, [markers]);




  const MapEvents = ({ addMarker }) => {
    // console.log("MapEvents",addMarker);
    
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
          setTimeout(() => {
            console.log("wswsw",namemarker);
            
          }, 3000);
          await addMarker(latlng, locationName); // اضافه کردن مارکر با نام مکان
        }
      },
    });
    return null; // این کامپوننت هیچ چیزی را رندر نمی‌کند
  };


  const handleSearch = () => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`;
    
    fetch(url)
      .then(response => response.json())
      
      .then(data => {
        console.log(data);

        if (data.length > 0) {
          const { lat, lon } = data[0];
          // setPosition([lat, lon]);
          // const { latitude, longitude } = position.coords;
          console.log("slm",[lat, lon]);
    let feli=      { position: [lat, lon], name: searchTerm }

          setMarkers([...markers,feli ]);
          setPosition([lat, lon]);


        } else {
          alert("No results found");
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        alert("Error fetching location");
      });
  };











  function LocationMarker() {


   
 
    const map = useMapEvents({
      click(event) {
        // addMarker(event.latlng);
    
        map.locate()
        console.log("qw",event?.latlng);
        const newMarker = {
          position: [event?.latlng?.lat, event?.latlng?.lng],
        name: `مارکر ${markers.length + 1}`,
        
        };

        setMarkers([...markers, newMarker]);
        console.log("markers",markers);




      },
     
      
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  const addMarker = (latlng,locationName) => {
    console.log("namremarker",latlng);
    const newMarker = {
      position: [latlng.lat, latlng.lng],
      name: locationName || `مارکر ${markers.length + 1}`, // اگر نام مکان وجود نداشت، از نام پیش‌فرض استفاده کنید
    };
    setMarkers([...markers, newMarker]);
  };
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("slm",[latitude, longitude]);
    let feli=      { position: [latitude, longitude], name: 'felei' }

          setMarkers([...markers,feli ]);
          setPosition([latitude, longitude]);
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };



  

  
  

  return (
    <Box>
      <button onClick={handleGetLocation} style={{ margin: '10px', padding: '10px' }}>
        Get Current Location
      </button>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter location name"
        style={{ margin: '10px', padding: '10px' }}
      />
      <button onClick={handleSearch} style={{ margin: '10px', padding: '10px' }}>
        Search Location
      </button>
    
    <MapContainer   center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
  {/* <LocationMarker/> */}
  <MapEvents addMarker={addMarker} />
  <Circle center={center} radius={radius} color="red" />


  {markers.map((marker, index) => (

        <Marker icon={myIcon}    key={index} position={marker.position}>
          <Popup  >{marker.name}

          
          <button onClick={() => removeMarker(index)} >حذف مارکر</button>
          <button onClick={handleDistanceCalculation}>محاسبه فاصله</button>

   
          </Popup>

        </Marker>
              

      ))}


   

{route.length > 0 && <Polyline positions={route} color="blue" />}

    </MapContainer>
    {distance && (
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'white', padding: '10px' }}>
        فاصله بین مارکرها: {distance} کیلومتر
      </div>
    )}
        </Box>

  );
};

export default MapComponent;