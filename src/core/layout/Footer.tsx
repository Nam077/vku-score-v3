import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';




const Footer = () => (
    <Box sx={{
        backgroundColor: '#333', // Màu nền của box bọc ngoài
        padding: '16px', // Khoảng đệm xung quanh nội dung
        color: '#fff', // Màu chữ của footer
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Typography variant="body1" >
            © {new Date().getFullYear()} {' '}
            <Link href="https://github.com/Nam077" target="_blank">
                by Nam077
            </Link>
        </Typography>
    </Box>
);

export default Footer;
