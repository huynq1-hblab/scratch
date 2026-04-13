import { solarToLunar } from './lunarCalendar';

// Vietnamese holidays - mix of solar and lunar calendar dates
const SOLAR_HOLIDAYS = [
    { name: 'Tết Dương lịch', month: 1, day: 1, icon: '🎆', type: 'holiday' },
    { name: 'Valentine', month: 2, day: 14, icon: '💕', type: 'special' },
    { name: 'Quốc tế Phụ nữ', month: 3, day: 8, icon: '🌹', type: 'holiday' },
    { name: 'Ngày Giải phóng', month: 4, day: 30, icon: '🇻🇳', type: 'holiday' },
    { name: 'Quốc tế Lao động', month: 5, day: 1, icon: '✊', type: 'holiday' },
    { name: 'Ngày của Mẹ', month: 5, day: 11, icon: '👩‍👧', type: 'special' },
    { name: 'Ngày Quốc tế Gia đình', month: 6, day: 28, icon: '👨‍👩‍👧', type: 'special' },
    { name: 'Ngày của Bố', month: 6, day: 15, icon: '👨‍👧', type: 'special' },
    { name: 'Quốc khánh', month: 9, day: 2, icon: '🇻🇳', type: 'holiday' },
    { name: 'Phụ nữ Việt Nam', month: 10, day: 20, icon: '🌸', type: 'holiday' },
    { name: 'Nhà giáo Việt Nam', month: 11, day: 20, icon: '📚', type: 'holiday' },
    { name: 'Giáng sinh', month: 12, day: 25, icon: '🎄', type: 'special' },
];

// Lunar holidays (month, day in lunar calendar)
const LUNAR_HOLIDAYS = [
    { name: 'Tết Nguyên Đán', lunarMonth: 1, lunarDay: 1, icon: '🧧', type: 'holiday', duration: 3 },
    { name: 'Rằm tháng Giêng', lunarMonth: 1, lunarDay: 15, icon: '🏮', type: 'holiday' },
    { name: 'Tết Hàn Thực', lunarMonth: 3, lunarDay: 3, icon: '🍡', type: 'special' },
    { name: 'Giỗ Tổ Hùng Vương', lunarMonth: 3, lunarDay: 10, icon: '🏛️', type: 'holiday' },
    { name: 'Tết Đoan Ngọ', lunarMonth: 5, lunarDay: 5, icon: '🍃', type: 'special' },
    { name: 'Lễ Vu Lan', lunarMonth: 7, lunarDay: 15, icon: '🪷', type: 'holiday' },
    { name: 'Tết Trung Thu', lunarMonth: 8, lunarDay: 15, icon: '🥮', type: 'holiday' },
    { name: 'Ông Táo về trời', lunarMonth: 12, lunarDay: 23, icon: '🐟', type: 'special' },
];

/**
 * Convert a lunar date to approximate solar date for a given year.
 * This is a rough reverse lookup using solarToLunar.
 */
function lunarToSolarApprox(lunarMonth, lunarDay, solarYear) {
    // Search forward from a reasonable start date
    // Lunar month N roughly corresponds to solar month N (with slight offset)
    const startMonth = Math.max(0, lunarMonth - 2);
    const startDate = new Date(solarYear, startMonth, 1);

    for (let offset = 0; offset < 90; offset++) {
        const testDate = new Date(startDate);
        testDate.setDate(testDate.getDate() + offset);

        const lunar = solarToLunar(
            testDate.getDate(),
            testDate.getMonth() + 1,
            testDate.getFullYear()
        );

        if (lunar.month === lunarMonth && lunar.day === lunarDay && lunar.leap === 0) {
            return testDate;
        }
    }

    // Fallback: approximate
    return new Date(solarYear, lunarMonth - 1, lunarDay);
}

/**
 * Get all holidays for a specific year with their solar dates
 */
export function getHolidaysForYear(year) {
    const holidays = [];

    // Solar holidays
    for (const holiday of SOLAR_HOLIDAYS) {
        holidays.push({
            ...holiday,
            date: new Date(year, holiday.month - 1, holiday.day),
            isLunar: false,
        });
    }

    // Lunar holidays
    for (const holiday of LUNAR_HOLIDAYS) {
        const solarDate = lunarToSolarApprox(holiday.lunarMonth, holiday.lunarDay, year);
        holidays.push({
            ...holiday,
            date: solarDate,
            isLunar: true,
        });
    }

    return holidays.sort((a, b) => a.date - b.date);
}

/**
 * Get upcoming holidays from today
 */
export function getUpcomingHolidays(limit = 5) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const currentYear = now.getFullYear();

    // Get holidays for current year and next year
    const allHolidays = [
        ...getHolidaysForYear(currentYear),
        ...getHolidaysForYear(currentYear + 1),
    ];

    const upcoming = allHolidays
        .filter(h => h.date >= now)
        .sort((a, b) => a.date - b.date)
        .slice(0, limit);

    return upcoming.map(h => {
        const diffTime = h.date.getTime() - now.getTime();
        const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...h, daysUntil };
    });
}

/**
 * Check if a specific solar date has a holiday
 */
export function getHolidaysForDate(day, month, year) {
    const holidays = getHolidaysForYear(year);
    return holidays.filter(h =>
        h.date.getDate() === day &&
        h.date.getMonth() === month - 1
    );
}
