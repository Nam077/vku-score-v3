import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { IScore, ScoreCh } from '@/common/interfaces/score';
import { toast } from 'react-toastify';

// Định nghĩa interface cho state
interface ScoreState {
    scores: IScore[];
    toggleDialog: boolean;
    toggleUploadFile: boolean;
}

// Định nghĩa interface cho ScoreContext
interface ScoreContextType {
    state: ScoreState;
    dispatch: Dispatch<Action>;
}

// Khởi tạo giá trị mặc định cho state
const initialState: ScoreState = {
    scores: [],
    toggleDialog: false,
    toggleUploadFile: true,
};

// Định nghĩa type cho các hành động
type Action =
    | { type: 'ADD_SCORE'; payload: IScore }
    | { type: 'UPDATE_SCORE'; payload: { id: number; updatedScore: IScore } }
    | { type: 'DELETE_SCORE'; payload: { id: number } }
    | { type: 'TOGGLE_DIALOG' }
    | { type: 'SET_SCORES'; payload: IScore[] }
    | { type: 'CHANGE_SCORE_T10'; payload: { row: IScore; newValue: number } }
    | { type: 'TOGGLE_UPLOAD_FILE' }
    | { type: 'CHANGE_SCORE_CH'; payload: { row: IScore; newValue: ScoreCh } };

// Tạo ScoreContext với giá trị mặc định
const ScoreContext = createContext<ScoreContextType>({
    state: initialState,
    dispatch: () => undefined,
});
const generateIdUnique = (scores: IScore[]): number => {
    const ids = scores.map((score) => score.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
};
// Tạo reducer
const scoreReducer = (state: ScoreState, action: Action): ScoreState => {
    switch (action.type) {
        case 'ADD_SCORE':
            if (state.scores.find((s) => s.name === action.payload.name)) {
                return state;
            }
            action.payload.id = generateIdUnique(state.scores);
            toast.success(JSON.stringify(action.payload), {
                toastId: `add_score_${action.payload.id}`,
            });
            return { ...state, scores: [...state.scores, action.payload] };
        case 'UPDATE_SCORE':
            return {
                ...state,
                scores: state.scores.map((score) =>
                    score.id === action.payload.id ? action.payload.updatedScore : score,
                ),
            };
        case 'DELETE_SCORE':
            return {
                ...state,
                scores: state.scores.filter((score) => score.id !== action.payload.id),
            };
        case 'SET_SCORES':
            return { ...state, scores: action.payload };
        case 'CHANGE_SCORE_CH':
            return {
                ...state,
                scores: state.scores.map((score) =>
                    score.id === action.payload.row.id
                        ? {
                            ...score,
                            scoreChChange: action.payload.newValue === action.payload.row.scoreCh ? null : action.payload.newValue,
                        }
                        : score,
                ),
            };
        case 'CHANGE_SCORE_T10':
            return {
                ...state,
                scores: state.scores.map((score) =>
                    score.id === action.payload.row.id
                        ? {
                            ...score,
                            scoreT10: action.payload.newValue,
                        }
                        : score,
                ),
            };
        case 'TOGGLE_DIALOG':
            return { ...state, toggleDialog: !state.toggleDialog };
        case 'TOGGLE_UPLOAD_FILE':
            return { ...state, toggleUploadFile: !state.toggleUploadFile };
        default:
            return state;
    }
};

// Tạo ScoreProvider
const ScoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(scoreReducer, initialState);

    return (
        <ScoreContext.Provider value={{ state, dispatch }}>
            {children}
        </ScoreContext.Provider>
    );
};

// Custom hook để sử dụng ScoreContext
const useScore = () => {
    const context = useContext(ScoreContext);
    if (context === undefined) {
        throw new Error('useScore must be used within a ScoreProvider');
    }
    return context;
};

export { ScoreProvider, useScore };
