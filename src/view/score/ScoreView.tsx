'use client';
import { IScore } from '@/common/interfaces/score';
import ScoreTable from '@/view/score/ScoreTable';
import { main } from '@popperjs/core';
import scores from '@/common/data';


const ScoreView = () => {
    return (
        <ScoreTable scores={scores} />
    );
};
export default ScoreView;