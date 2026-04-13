import React, { useState, useEffect } from 'react';
import { calculateDuration, calculateTotalDays, formatVietnameseDate } from '../../utils/dateUtils';
import './Counter.css';

export default function Counter({ anniversary, userName, partnerName }) {
    const [duration, setDuration] = useState(() => calculateDuration(anniversary));
    const [totalDays, setTotalDays] = useState(() => calculateTotalDays(anniversary));

    useEffect(() => {
        const timer = setInterval(() => {
            setDuration(calculateDuration(anniversary));
            setTotalDays(calculateTotalDays(anniversary));
        }, 1000);

        return () => clearInterval(timer);
    }, [anniversary]);

    return (
        <div className="counter-section">
            <div className="anniversary-info">
                <p className="anniversary-label">Yêu nhau từ ngày</p>
                <p className="anniversary-date">{formatVietnameseDate(anniversary)}</p>
            </div>

            {userName && partnerName && (
                <div className="couple-names-badge">
                    <span>{userName}</span>
                    <span className="names-heart">💕</span>
                    <span>{partnerName}</span>
                </div>
            )}

            <div className="counter-main">
                <div className="counter-card">
                    <span className="counter-value">{String(duration.years).padStart(2, '0')}</span>
                    <span className="counter-label">NĂM</span>
                </div>
                <span className="counter-heart">💕</span>
                <div className="counter-card">
                    <span className="counter-value">{String(duration.months).padStart(2, '0')}</span>
                    <span className="counter-label">THÁNG</span>
                </div>
                <span className="counter-heart">💕</span>
                <div className="counter-card">
                    <span className="counter-value counter-days">{String(duration.days).padStart(2, '0')}</span>
                    <span className="counter-label">NGÀY</span>
                </div>
            </div>

            <div className="counter-secondary">
                <div className="counter-card small">
                    <span className="counter-value-sm">{String(duration.hours).padStart(2, '0')}</span>
                    <span className="counter-label-sm">GIỜ</span>
                </div>
                <span className="counter-heart-sm">💕</span>
                <div className="counter-card small">
                    <span className="counter-value-sm">{String(duration.minutes).padStart(2, '0')}</span>
                    <span className="counter-label-sm">PHÚT</span>
                </div>
                <span className="counter-heart-sm">💕</span>
                <div className="counter-card small">
                    <span className="counter-value-sm counter-seconds">{String(duration.seconds).padStart(2, '0')}</span>
                    <span className="counter-label-sm">GIÂY</span>
                </div>
            </div>

            <div className="total-days-badge">
                Tổng cộng: {totalDays.toLocaleString()} ngày bên nhau <span>❤️</span>
            </div>
        </div>
    );
}
