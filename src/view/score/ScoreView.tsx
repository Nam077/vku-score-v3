'use client';
import { IScore } from '@/common/interfaces/score';
import ScoreTable from '@/view/score/ScoreTable';
import { main } from '@popperjs/core';
import scores from '@/common/data';
import { keyframes, styled } from '@mui/system';
import Fab from '@mui/material/Fab';
import { Add, Navigation } from '@mui/icons-material';
import React from 'react';
import { Tooltip } from '@mui/material';

const subtleBounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
  60% {
    transform: translateY(-3px);
  }
`;

const FloatingButtonContainerRight = styled('div')({
    position: 'fixed',
    bottom: 5,
    right: 5,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
});

const FloatingButtonContainerLeft = styled('div')({
    position: 'fixed',
    bottom: 5,
    left: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
});

const FabStyled = styled(Fab)({
    animation: `${subtleBounce} 1s infinite`,
});
const ScoreView = () => {
    return (
        <>
            <ScoreTable scores={scores} />
            <FloatingButtonContainerLeft>
                <Tooltip title={'Thêm học phần'}>
                    <Fab color='primary' aria-label='add'>
                        <Add />
                    </Fab>
                </Tooltip>
            </FloatingButtonContainerLeft>
            <FloatingButtonContainerRight>
                <Tooltip title={'Gợi ý cải thiện học phần'}>
                    <FabStyled variant={'extended'} color='primary' aria-label='add'>
                        Gợi ý cải thiện học phần
                    </FabStyled>
                </Tooltip>
            </FloatingButtonContainerRight>

        </>
    );
};
export default ScoreView;