import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header: React.FC = () => {
    return (
        <AppBar position='static' className='mb-4'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu' className='mr-2'>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' className='flex-grow'>
                    My App
                </Typography>
                <Button color='inherit'>Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
