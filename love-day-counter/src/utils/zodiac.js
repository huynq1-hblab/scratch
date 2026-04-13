const ZODIAC_SIGNS = [
    { name: 'Ma Kết', emoji: '♑', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
    { name: 'Bảo Bình', emoji: '♒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
    { name: 'Song Ngư', emoji: '♓', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
    { name: 'Bạch Dương', emoji: '♈', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
    { name: 'Kim Ngưu', emoji: '♉', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
    { name: 'Song Tử', emoji: '♊', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
    { name: 'Cự Giải', emoji: '♋', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
    { name: 'Sư Tử', emoji: '♌', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
    { name: 'Xử Nữ', emoji: '♍', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
    { name: 'Thiên Bình', emoji: '♎', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
    { name: 'Bọ Cạp', emoji: '♏', startMonth: 10, startDay: 24, endMonth: 11, endDay: 21 },
    { name: 'Nhân Mã', emoji: '♐', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
];

export function getZodiacSign(birthday) {
    if (!birthday) return null;
    const date = new Date(birthday);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    for (const sign of ZODIAC_SIGNS) {
        if (sign.startMonth === sign.endMonth) {
            if (month === sign.startMonth && day >= sign.startDay && day <= sign.endDay) {
                return sign;
            }
        } else if (sign.startMonth > sign.endMonth) {
            // Capricorn wraps around year
            if ((month === sign.startMonth && day >= sign.startDay) ||
                (month === sign.endMonth && day <= sign.endDay)) {
                return sign;
            }
        } else {
            if ((month === sign.startMonth && day >= sign.startDay) ||
                (month === sign.endMonth && day <= sign.endDay)) {
                return sign;
            }
        }
    }
    return ZODIAC_SIGNS[0]; // Default to Capricorn
}
