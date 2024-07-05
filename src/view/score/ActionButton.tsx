import { Tooltip } from '@mui/material';
import Fab from '@mui/material/Fab';
import { Add } from '@mui/icons-material';
import React, { useCallback } from 'react';
import { keyframes, styled } from '@mui/system';
import { useScore } from '@/view/score/ScoreProvider';

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
    bottom: 10,
    right: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    zIndex: 1000,
});

const FloatingButtonContainerLeft = styled('div')({
    position: 'fixed',
    bottom: 10,
    left: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
    zIndex: 1000,
});

const FabStyled = styled(Fab)({
    animation: `${subtleBounce} 1s infinite`,
});
const ActionButton = () => {
    const { dispatch } = useScore();
    const toggleDialog = useCallback(() => {
        dispatch({ type: 'TOGGLE_DIALOG' });
    }, [dispatch]);

    return (
        <>
            <FloatingButtonContainerLeft>
                <Tooltip title={'Thêm học phần'} arrow>
                    <Fab color='primary' size={'medium'} aria-label='add'>
                        <Add onClick={toggleDialog} />
                    </Fab>
                </Tooltip>
            </FloatingButtonContainerLeft>
            <FloatingButtonContainerRight>
                <Tooltip title={'Gợi ý cải thiện học phần'} arrow>
                    <FabStyled variant={'extended'} color='primary' aria-label='add' size={'medium'}>
                        Gợi ý cải thiện học phần
                    </FabStyled>
                </Tooltip>
            </FloatingButtonContainerRight>
        </>
    );
};


export default ActionButton;