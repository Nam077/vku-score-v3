import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useScore } from '@/view/score/ScoreProvider';
import { calculateGPA } from '@/common/services/gpa.service';
import { toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

interface GpaDisplayProps {
    oldGpa: number;
    newGpa: number;
    difference: number;
}

const GpaDisplay: React.FC = () => {
    const { state } = useScore();
    const { scores } = state;
    const [gpa, setGpa] = useState(0.0);
    const [gpaNew, setGpaNew] = useState(0.0);
    const [difference, setDifference] = useState(0.0);
    useEffect(() => {
        const { gpa, gpaNew, difference } = calculateGPA(scores);
        setGpa(gpa);
        setGpaNew(gpaNew);
        setDifference(difference);
        toast.success(`GPA đã được cập nhật thành ${gpaNew.toFixed(2)}`, {
            toastId: `update_gpa_${gpaNew}`
        });
    }, [scores]);
    return (
        <Box sx={{ flexGrow: 1, marginTop: 2, marginBottom: 2 }}>
            <Grid container spacing={3} justifyContent='center' alignItems='center'>
                <Grid item xs={12} sm={4}>
                    <Item>
                        <Typography variant='h6' component='div'>
                            GPA Cũ
                        </Typography>
                        <Typography variant='h3' component='div' color='green'>
                            {gpa.toFixed(2)}
                        </Typography>
                        <Typography variant='subtitle1' component='div' color='green'>
                            {gpa.toFixed(15)}
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Item>
                        <Typography variant='h6' component='div'>
                            GPA Mới
                        </Typography>
                        <Typography variant='h3' component='div' color='green'>
                            {gpaNew.toFixed(2)}
                        </Typography>
                        <Typography variant='subtitle1' component='div' color='green'>
                            {gpaNew.toFixed(15)}
                        </Typography>
                    </Item>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Item>
                        <Typography variant='h6' component='div'>
                            Độ Chênh Lệch
                        </Typography>
                        <Typography variant='h3' component='div' color='green'>
                            {difference.toFixed(3)}
                        </Typography>
                        <Typography variant='subtitle1' component='div' color='green'>
                            {difference.toFixed(15)}
                        </Typography>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GpaDisplay;
