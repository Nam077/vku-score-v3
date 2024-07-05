import Image from 'next/image';
import ScoreView from '@/view/score/ScoreView';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

export default function Home() {

    return (
        <>

            <ScoreView/>
        </>

    );
}
