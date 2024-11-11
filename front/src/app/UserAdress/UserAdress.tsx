import { Box, Button, Container, Typography, Grid } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
import style from './useadress.module.css';

const UserAdress: React.FC = () => {
  return (
    <Box>
      <Container className={style.Boxadress}>
        <Typography className={style.titleadress} variant='h6'>آدرس ها</Typography>
        <Button className={style.btnadress} variant="outlined" startIcon={<AddLocationIcon />}>
          ثبت آدرس جدید
        </Button>
      </Container>

      <Container className={style.boxmainadrees1}>
        <Grid container spacing={2} className={style.boxgrid}>
          <Grid item xs={10} sm={11}>
            <Box>
              <Typography className={style.streatdress} variant='h5'>
                خ. کلاهدوز، خ. دیباجی جنوبی، ک. شمسایی
              </Typography>
              <ul className={style.boxul}>
                <div className={style.boxulitem}>
                  <li>
                    <ApartmentIcon />
                  </li>
                  <li>
                    تهران
                  </li>
                </div>
                <div className={style.boxulitem}>
                  <li>
                    <MailIcon />
                  </li>
                  <li>
                    1959154889
                  </li>
                </div>
                <div className={style.boxulitem}>
                  <li>
                    <CallIcon />
                  </li>
                  <li>
                    0939123908
                  </li>
                </div>
                <div className={style.boxulitem}>
                  <li>
                    <PersonIcon />
                  </li>
                  <li>
                    علیرضارنجبر
                  </li>
                </div>
              </ul>
            </Box>
          </Grid>

          <Grid item xs={2} sm={1}>
            <Box className={style.boxltrmap}>
              <MoreVertIcon />
              <img src='/istockphoto-1308342065-612x612.jpg' />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserAdress;