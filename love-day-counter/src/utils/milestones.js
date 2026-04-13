import { differenceInDays, addDays, addMonths, addYears, addWeeks } from 'date-fns';

export const MILESTONES = [
    { id: '1w', label: '1 Tuần', type: 'week', value: 1, icon: '🌸' },
    { id: '1m', label: '1 Tháng', type: 'month', value: 1, icon: '🎉' },
    { id: '100d', label: '100 Ngày', type: 'day', value: 100, icon: '⭐' },
    { id: '6m', label: '6 Tháng', type: 'month', value: 6, icon: '🌺' },
    { id: '1y', label: '1 Năm', type: 'year', value: 1, icon: '🏆' },
    { id: '500d', label: '500 Ngày', type: 'day', value: 500, icon: '💎' },
    { id: '2y', label: '2 Năm', type: 'year', value: 2, icon: '💕' },
    { id: '1000d', label: '1000 Ngày', type: 'day', value: 1000, icon: '🎆' },
    { id: '3y', label: '3 Năm', type: 'year', value: 3, icon: '💝' },
    { id: '5y', label: '5 Năm', type: 'year', value: 5, icon: '👑' },
    { id: '10y', label: '10 Năm', type: 'year', value: 10, icon: '💍' },
];

export function getMilestoneTargetDate(startDate, milestone) {
    const start = new Date(startDate);
    switch (milestone.type) {
        case 'week':
            return addWeeks(start, milestone.value);
        case 'month':
            return addMonths(start, milestone.value);
        case 'year':
            return addYears(start, milestone.value);
        case 'day':
            return addDays(start, milestone.value);
        default:
            return start;
    }
}

export function getMilestoneProgress(startDate, milestone) {
    const now = new Date();
    const start = new Date(startDate);
    const target = getMilestoneTargetDate(startDate, milestone);

    const totalDays = differenceInDays(target, start);
    const elapsedDays = differenceInDays(now, start);
    const daysRemaining = differenceInDays(target, now);

    const progress = Math.min(100, Math.max(0, (elapsedDays / totalDays) * 100));
    const isCompleted = daysRemaining <= 0;

    return {
        progress,
        daysRemaining: Math.max(0, daysRemaining),
        targetDate: target,
        isCompleted,
        totalDays,
        elapsedDays: Math.min(elapsedDays, totalDays),
    };
}
