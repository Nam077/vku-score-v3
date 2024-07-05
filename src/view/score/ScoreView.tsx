'use client';
import React, { useEffect } from 'react';
import { ScoreProvider } from '@/view/score/ScoreProvider';
import MainView from '@/view/score/MainView';


const ScoreView = () => {
    return (
        <>
            <ScoreProvider>
                <MainView/>
            </ScoreProvider>
        </>
    );
};
export default ScoreView;