import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const {loadHandler} = props;
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);

  useEffect(() => {
    setActive(!loadHandler);
    setActive2(loadHandler);
    setName(localStorage.getItem('Name'));
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate('/');
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 160 }}
          >
            <MenuIcon />
          </IconButton>
          {true && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose2}
              >
                {active2 && <MenuItem onClick={handleClose}>Namaste🙏, {name}!</MenuItem>}
                {active && <MenuItem onClick={handleClose}>Login Please!</MenuItem>}
                {active2 && <MenuItem onClick={handleClose}>Logout</MenuItem>}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
