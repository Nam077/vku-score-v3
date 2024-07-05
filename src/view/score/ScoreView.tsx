'use client';
import ScoreTable from '@/view/score/ScoreTable';
import React, { useEffect } from 'react';
import { ScoreProvider } from '@/view/score/ScoreProvider';
import ActionButton from '@/view/score/ActionButton';
import AddScoreDialog from '@/view/component/AddScoreDialog';
import GPAView from '@/view/score/GPAView';


const ScoreView = () => {
    return (
        <>
            <ScoreProvider>
                <GPAView />
                <ScoreTable />
                <ActionButton />
                <AddScoreDialog />
            </ScoreProvider>
        </>
    );
};
export default ScoreView;