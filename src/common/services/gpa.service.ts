import { IScore, ScoreCh } from '@/common/interfaces/score';

const gpaMap: Record<ScoreCh, number> = {
    'A': 4.0,
    'B': 3.0,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0,
};

// Hàm chuyển đổi điểm chữ thành giá trị GPA
function convertScoreChToGPA(scoreCh: ScoreCh | null | ''): number {
    if (scoreCh === null || scoreCh === '') return 0.0;
    return gpaMap[scoreCh as ScoreCh];
}

// Hàm tính GPA từ danh sách các điểm
export function calculateGPA(scores: IScore[]): { gpa: number, gpaNew: number, difference: number } {
    if (scores.length === 0) return { gpa: 0.0, gpaNew: 0.0, difference: 0.0 };

    let totalGPA = 0;
    let totalCredits = 0;
    let totalGPANew = 0;
    let totalCreditsNew = 0;

    for (const score of scores) {
        const credits = score.countTC || 0;

        if (score.scoreCh !== null) {
            totalGPA += convertScoreChToGPA(score.scoreCh as ScoreCh) * credits;
            totalCredits += credits;
        }

        const effectiveScoreCh = score.scoreChChange !== null ? score.scoreChChange : score.scoreCh;
        if (effectiveScoreCh !== null) {
            totalGPANew += convertScoreChToGPA(effectiveScoreCh as ScoreCh) * credits;
            totalCreditsNew += credits;
        }
    }

    const gpa = totalCredits === 0 ? 0.0 : totalGPA / totalCredits;
    const gpaNew = totalCreditsNew === 0 ? 0.0 : totalGPANew / totalCreditsNew;
    const difference = gpaNew - gpa;

    return { gpa, gpaNew, difference };
}
