import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, Layers, IndianRupee, Plus, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import plans, { formatCurrency, isMemberActive } from '../data/plans';

function Dashboard({ members }) {
  const navigate = useNavigate();

  // All statistics are calculated from the members array
  const totalMembers = members.length;
  const activeMembers = members.filter(isMemberActive).length;
  const totalRevenue = members.reduce((sum, member) => sum + member.finalFee, 0);

  // Latest 5 members: sort newest first, then take the first 5
  const recentMembers = [...members]
    .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt))
    .slice(0, 5);

  return (
    <div className="container page">
      {/* Hero section */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Gym Membership Management</p>
          <h1>
            WELCOME TO <span className="text-accent">FITFLEX</span>
          </h1>
          <p className="hero-subtitle">Manage your gym memberships with ease.</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
              <Plus size={18} /> Register Member
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => navigate('/plans')}>
              View Plans
            </button>
          </div>
        </div>
      </section>

      {/* Statistics cards */}
      <section className="stats-grid">
        <StatCard icon={Users} label="Total Members" value={totalMembers} note="All registrations" />
        <StatCard icon={UserCheck} label="Active Members" value={activeMembers} note="Membership not expired" />
        <StatCard icon={Layers} label="Membership Plans" value={plans.length} note="Basic to Elite" />
        <StatCard icon={IndianRupee} label="Total Revenue" value={formatCurrency(totalRevenue)} note="After discounts" />
      </section>

      {/* Recent members */}
      <section className="card">
        <div className="card-header">
          <h2 className="section-title">Recent Members</h2>
          {members.length > 0 && (
            <button className="btn btn-ghost" onClick={() => navigate('/members')}>
              View All Members <ArrowRight size={16} />
            </button>
          )}
        </div>

        {recentMembers.length === 0 ? (
          <div className="empty-state">
            <Users size={40} />
            <p>No members registered yet.</p>
            <button className="btn btn-primary" onClick={() => navigate('/register')}>
              Register First Member
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Plan</th>
                  <th>Duration</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {recentMembers.map(({ id, name, plan, duration, finalFee }) => (
                  <tr key={id}>
                    <td className="member-name">{name}</td>
                    <td>
                      <span className={`plan-tag plan-tag-${plan.toLowerCase()}`}>{plan}</span>
                    </td>
                    <td>{duration}</td>
                    <td className="member-fee">{formatCurrency(finalFee)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
