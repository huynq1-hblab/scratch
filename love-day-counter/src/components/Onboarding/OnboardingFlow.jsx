import React, { useState, useRef } from 'react';
import { getZodiacSign } from '../../utils/zodiac';
import './OnboardingFlow.css';

const GENDER_OPTIONS = [
    { value: 'male', label: 'Nam', icon: '👨' },
    { value: 'female', label: 'Nữ', icon: '👩' },
    { value: 'other', label: 'Khác', icon: '🧑' },
];

function AvatarUpload({ avatar, onAvatarChange, gender }) {
    const fileRef = useRef(null);
    const defaultAvatar = gender === 'female' ? '👩' : gender === 'other' ? '🧑' : '👨';

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => onAvatarChange(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="avatar-upload" onClick={() => fileRef.current.click()}>
            <input
                type="file"
                ref={fileRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            {avatar ? (
                <img src={avatar} alt="Avatar" className="avatar-preview" />
            ) : (
                <div className="avatar-placeholder">
                    <span className="avatar-emoji">{defaultAvatar}</span>
                    <span className="avatar-hint">📷</span>
                </div>
            )}
        </div>
    );
}

function StepPersonInfo({ data, onChange, title, subtitle }) {
    const zodiac = getZodiacSign(data.birthday);

    return (
        <div className="onboarding-step">
            <div className="step-icon">{subtitle === 'partner' ? '💑' : '💝'}</div>
            <h2 className="step-title">{title}</h2>

            <AvatarUpload
                avatar={data.avatar}
                onAvatarChange={(avatar) => onChange({ ...data, avatar })}
                gender={data.gender}
            />

            <div className="form-group">
                <label className="form-label">Họ và tên</label>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Nhập tên của bạn"
                    value={data.name}
                    onChange={e => onChange({ ...data, name: e.target.value })}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Giới tính</label>
                <div className="gender-options">
                    {GENDER_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            className={`gender-btn ${data.gender === opt.value ? 'active' : ''}`}
                            onClick={() => onChange({ ...data, gender: opt.value })}
                        >
                            <span>{opt.icon}</span> {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Ngày sinh</label>
                <input
                    type="date"
                    className="form-input"
                    value={data.birthday}
                    onChange={e => onChange({ ...data, birthday: e.target.value })}
                />
                {zodiac && data.birthday && (
                    <div className="zodiac-display">
                        {zodiac.emoji} {zodiac.name}
                    </div>
                )}
            </div>
        </div>
    );
}

function StepAnniversary({ date, onChange }) {
    return (
        <div className="onboarding-step">
            <div className="step-icon">💕</div>
            <h2 className="step-title">Ngày bắt đầu yêu</h2>
            <p className="step-subtitle">Chọn ngày mà hai bạn chính thức bên nhau</p>

            <div className="form-group anniversary-input">
                <label className="form-label">Ngày bắt đầu yêu</label>
                <input
                    type="date"
                    className="form-input date-input-large"
                    value={date}
                    onChange={e => onChange(e.target.value)}
                />
            </div>

            <div className="anniversary-preview">
                {date && (
                    <p className="preview-text">
                        ❤️ Bắt đầu từ ngày <strong>{new Date(date).toLocaleDateString('vi-VN')}</strong>
                    </p>
                )}
            </div>
        </div>
    );
}

export default function OnboardingFlow({ onComplete }) {
    const [step, setStep] = useState(0);
    const [user, setUser] = useState({ name: '', gender: 'male', birthday: '', avatar: '' });
    const [partner, setPartner] = useState({ name: '', gender: 'female', birthday: '', avatar: '' });
    const [anniversary, setAnniversary] = useState('');

    const canProceed = () => {
        if (step === 0) return user.name && user.birthday;
        if (step === 1) return partner.name && partner.birthday;
        if (step === 2) return anniversary;
        return false;
    };

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1);
        } else {
            onComplete({ user, partner, anniversary });
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <div className="step-indicator">
                    {[0, 1, 2].map(i => (
                        <div key={i} className={`step-dot ${i === step ? 'active' : i < step ? 'completed' : ''}`}>
                            {i < step ? '✓' : i + 1}
                        </div>
                    ))}
                </div>

                <div className="step-content" key={step}>
                    {step === 0 && (
                        <StepPersonInfo
                            data={user}
                            onChange={setUser}
                            title="Thông tin của bạn"
                            subtitle="user"
                        />
                    )}
                    {step === 1 && (
                        <StepPersonInfo
                            data={partner}
                            onChange={setPartner}
                            title="Thông tin người yêu"
                            subtitle="partner"
                        />
                    )}
                    {step === 2 && (
                        <StepAnniversary
                            date={anniversary}
                            onChange={setAnniversary}
                        />
                    )}
                </div>

                <div className="step-actions">
                    {step > 0 && (
                        <button className="btn-secondary" onClick={handleBack}>
                            ← Quay lại
                        </button>
                    )}
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                        disabled={!canProceed()}
                    >
                        {step === 2 ? '💕 Bắt đầu đếm' : 'Tiếp theo →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
