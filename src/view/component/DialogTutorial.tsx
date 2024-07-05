import React, { useState } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { readme2 } from '@/common/data';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Tutorial from '@/view/component/Tutorial';
import { useScore } from '@/view/score/ScoreProvider';

const TutorialDialog: React.FC = () => {


    const { state, dispatch } = useScore();
    const { toggleShowTutorial } = state;

    const handleClose = () => {
        dispatch({ type: 'TOGGLE_SHOW_TUTORIAL' });
    };

    return (

        <Dialog open={toggleShowTutorial} onClose={handleClose} maxWidth='lg' fullWidth>
            <DialogTitle>Hướng dẫn sử dụng</DialogTitle>
            <DialogContent dividers>
                <Tutorial />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>

    );
};

export default TutorialDialog;
