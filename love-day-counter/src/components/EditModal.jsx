import React, { useState } from 'react';
import { getZodiacSign } from '../utils/zodiac';
import './EditModal.css';

const GENDER_OPTIONS = [
    { value: 'male', label: 'Nam', icon: '👨' },
    { value: 'female', label: 'Nữ', icon: '👩' },
    { value: 'other', label: 'Khác', icon: '🧑' },
];

export default function EditModal({ data, onSave, onClose }) {
    const [user, setUser] = useState({ ...data.user });
    const [partner, setPartner] = useState({ ...data.partner });
    const [anniversary, setAnniversary] = useState(data.anniversary);

    const userZodiac = getZodiacSign(user.birthday);
    const partnerZodiac = getZodiacSign(partner.birthday);

    const canSave = user.name && user.birthday && partner.name && partner.birthday && anniversary;

    const handleSave = () => {
        if (!canSave) return;
        onSave({ user, partner, anniversary });
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content edit-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>✏️ Chỉnh sửa thông tin</h2>
                    <button className="modal-close-btn" onClick={onClose}>✕</button>
                </div>

                <div className="modal-body edit-modal-body">
                    {/* User section */}
                    <div className="edit-section">
                        <h4 className="edit-section-title">👤 Thông tin của bạn</h4>

                        <div className="form-group">
                            <label className="form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-input"
                                value={user.name}
                                onChange={e => setUser({ ...user, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Giới tính</label>
                            <div className="gender-options">
                                {GENDER_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        className={`gender-btn ${user.gender === opt.value ? 'active' : ''}`}
                                        onClick={() => setUser({ ...user, gender: opt.value })}
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
                                value={user.birthday}
                                onChange={e => setUser({ ...user, birthday: e.target.value })}
                            />
                            {userZodiac && user.birthday && (
                                <div className="zodiac-display">{userZodiac.emoji} {userZodiac.name}</div>
                            )}
                        </div>
                    </div>

                    {/* Partner section */}
                    <div className="edit-section">
                        <h4 className="edit-section-title">💕 Thông tin người yêu</h4>

                        <div className="form-group">
                            <label className="form-label">Họ và tên</label>
                            <input
                                type="text"
                                className="form-input"
                                value={partner.name}
                                onChange={e => setPartner({ ...partner, name: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Giới tính</label>
                            <div className="gender-options">
                                {GENDER_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        className={`gender-btn ${partner.gender === opt.value ? 'active' : ''}`}
                                        onClick={() => setPartner({ ...partner, gender: opt.value })}
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
                                value={partner.birthday}
                                onChange={e => setPartner({ ...partner, birthday: e.target.value })}
                            />
                            {partnerZodiac && partner.birthday && (
                                <div className="zodiac-display">{partnerZodiac.emoji} {partnerZodiac.name}</div>
                            )}
                        </div>
                    </div>

                    {/* Anniversary */}
                    <div className="edit-section">
                        <h4 className="edit-section-title">💝 Ngày bắt đầu yêu</h4>
                        <div className="form-group">
                            <input
                                type="date"
                                className="form-input date-input-large"
                                value={anniversary}
                                onChange={e => setAnniversary(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="modal-footer edit-modal-footer">
                    <button className="btn-secondary" onClick={onClose}>Hủy</button>
                    <button className="btn-primary" onClick={handleSave} disabled={!canSave}>
                        💾 Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
}
