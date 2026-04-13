import React from 'react';
import { getZodiacSign } from '../../utils/zodiac';
import { calculateAge } from '../../utils/dateUtils';
import './ProfileCards.css';

export default function ProfileCards({ user, partner }) {
    const userZodiac = getZodiacSign(user.birthday);
    const partnerZodiac = getZodiacSign(partner.birthday);
    const userAge = calculateAge(user.birthday);
    const partnerAge = calculateAge(partner.birthday);

    const getDefaultAvatar = (gender) => {
        if (gender === 'female') return '👩';
        if (gender === 'other') return '🧑';
        return '👨';
    };

    return (
        <div className="profile-cards">
            <div className="profile-card">
                <div className="profile-avatar">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                    ) : (
                        <span className="default-avatar">{getDefaultAvatar(user.gender)}</span>
                    )}
                </div>
                <h3 className="profile-name">{user.name}</h3>
                <p className="profile-age">{userAge} tuổi</p>
                {userZodiac && (
                    <span className="zodiac-badge">
                        {userZodiac.emoji} {userZodiac.name}
                    </span>
                )}
            </div>

            <div className="profile-heart">
                <span className="heart-icon">❤️</span>
            </div>

            <div className="profile-card">
                <div className="profile-avatar">
                    {partner.avatar ? (
                        <img src={partner.avatar} alt={partner.name} />
                    ) : (
                        <span className="default-avatar">{getDefaultAvatar(partner.gender)}</span>
                    )}
                </div>
                <h3 className="profile-name">{partner.name}</h3>
                <p className="profile-age">{partnerAge} tuổi</p>
                {partnerZodiac && (
                    <span className="zodiac-badge">
                        {partnerZodiac.emoji} {partnerZodiac.name}
                    </span>
                )}
            </div>
        </div>
    );
}
