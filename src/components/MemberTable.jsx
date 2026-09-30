import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../data/plans';

// Displays members in a table with Edit and Delete buttons
function MemberTable({ members, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table className="member-table">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Plan</th>
            <th>Duration</th>
            <th>Start Date</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td data-label="Member ID" className="member-id">{member.id}</td>
              <td data-label="Name" className="member-name">{member.name}</td>
              <td data-label="Email">{member.email}</td>
              <td data-label="Phone">{member.phone}</td>
              <td data-label="Plan">
                <span className={`plan-tag plan-tag-${member.plan.toLowerCase()}`}>
                  {member.plan}
                </span>
              </td>
              <td data-label="Duration">{member.duration}</td>
              <td data-label="Start Date">{formatDate(member.startDate)}</td>
              <td data-label="Fee" className="member-fee">{formatCurrency(member.finalFee)}</td>
              <td data-label="Actions">
                <div className="action-buttons">
                  <button className="icon-btn edit" onClick={() => onEdit(member)} title="Edit member">
                    <Pencil size={16} />
                  </button>
                  <button className="icon-btn delete" onClick={() => onDelete(member)} title="Delete member">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MemberTable;
