import React, { useEffect, useState } from 'react';
import './FloatingHearts.css';

const HEART_SYMBOLS = ['❤️', '💕', '💗', '💖', '💝', '🩷', '♥️'];

export default function FloatingHearts() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const initialHearts = Array.from({ length: 15 }, (_, i) => createHeart(i));
        setHearts(initialHearts);

        const interval = setInterval(() => {
            setHearts(prev => {
                const filtered = prev.filter(h => Date.now() - h.created < 12000);
                if (filtered.length < 15) {
                    return [...filtered, createHeart(Date.now())];
                }
                return filtered;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    function createHeart(id) {
        return {
            id,
            left: Math.random() * 100,
            size: 12 + Math.random() * 20,
            duration: 6 + Math.random() * 8,
            delay: Math.random() * 5,
            opacity: 0.15 + Math.random() * 0.25,
            symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
            created: Date.now(),
        };
    }

    return (
        <div className="floating-hearts-container">
            {hearts.map(heart => (
                <span
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: `${heart.left}%`,
                        fontSize: `${heart.size}px`,
                        animationDuration: `${heart.duration}s`,
                        animationDelay: `${heart.delay}s`,
                        opacity: heart.opacity,
                    }}
                >
                    {heart.symbol}
                </span>
            ))}
        </div>
    );
}
