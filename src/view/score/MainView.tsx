import FileUploadForm from '@/view/component/UploadFile';
import GPAView from '@/view/score/GPAView';
import ScoreTable from '@/view/score/ScoreTable';
import ActionButton from '@/view/score/ActionButton';
import AddScoreDialog from '@/view/component/AddScoreDialog';
import React from 'react';
import { useScore } from '@/view/score/ScoreProvider';

const MainView = () => {
    const { state } = useScore();
    const { scores } = state;
    return (
        <>
            <FileUploadForm />
            {scores.length > 0 && (
                <>
                    <GPAView />
                    <ScoreTable />
                </>
            )}
            <ActionButton />
            <AddScoreDialog />
        </>
    );
};
export default MainView;