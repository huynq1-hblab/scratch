import React from 'react';
import ProfileCards from './ProfileCards';
import Counter from './Counter';
import Milestones from './Milestones';
import './Dashboard.css';

export default function Dashboard({ data }) {
    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="header-heart">❤️</div>
                <h1 className="dashboard-title">Đếm Ngày Yêu</h1>
                <p className="dashboard-subtitle">Từng giây, từng phút — mãi bên nhau</p>
            </div>

            <div className="dashboard-card">
                <ProfileCards user={data.user} partner={data.partner} />
            </div>

            <div className="dashboard-card counter-card-wrapper">
                <Counter
                    anniversary={data.anniversary}
                    userName={data.user.name}
                    partnerName={data.partner.name}
                />
            </div>

            <div className="dashboard-card">
                <Milestones anniversary={data.anniversary} />
            </div>
        </div>
    );
}
