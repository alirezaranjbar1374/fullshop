"use client"
import React, { useEffect, useState } from "react";
import { styled, alpha,Theme  } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import style from './appbar.module.css';
import { Grid ,Container} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { decodeToken } from "../../../utils/DecodeToken/DecodeToken";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha("#fff", 0.3),
  '&:hover': {
    backgroundColor: alpha("#fff", 0.85),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme?.transitions?.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchAppBar: React.FC = () => {
  const [nameperson,setNameperson]=useState<string>("عضویت/ورود")
  useEffect(() => {
    const   userId=decodeToken(localStorage?.getItem("loginproduct"))
    setNameperson(userId?.name)


  }, [])
  
  return (
    <Box className={style.appbarcontainer} sx={{ flexGrow: 1 }}>
      <AppBar className={style.containernavbar} position="fixed">
        <Toolbar>
          <Container>

          <Grid className={style.Tollbar} container spacing={12}>
            <Grid item xs={4}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon style={{ color: "#ffff", width: 30 }} />
                <Typography variant='body1' ml={1}>دسته بندی</Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="جستجو محصول ..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Grid>
            <Grid item xs={4} >
              <Grid container spacing={1}>
                <Grid className={style.endbox} item xs={12}>
                  <Typography  variant='body1'>{nameperson}</Typography>
                  <IconButton
                     size="large"
                     edge="end"
                     color="inherit"
                     aria-label="account of current user"
                   //   aria-controls={menuId}
                     aria-haspopup="true"
                   //   onClick={hand
           
           
            >
                <Badge badgeContent={17} color="success">
<ShoppingCartIcon/>
                </Badge>
            </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;