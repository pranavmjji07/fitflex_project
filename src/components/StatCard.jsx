// Small reusable card used for the dashboard statistics
function StatCard({ icon: Icon, label, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={22} />
      </div>
      <div>
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
        {note && <p className="stat-note">{note}</p>}
      </div>
    </div>
  );
}

export default StatCard;
