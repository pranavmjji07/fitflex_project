import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, UserPlus, CheckCircle, SearchX } from 'lucide-react';
import MemberTable from '../components/MemberTable';
import MemberForm from '../components/MemberForm';
import Modal from '../components/Modal';
import plans from '../data/plans';

function Members({ members, onUpdateMember, onDeleteMember }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('All');
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);
  const [message, setMessage] = useState('');

  // Hide the success message automatically after 3 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  // Search and filter work together: a member must pass BOTH checks
  const filteredMembers = members.filter((member) => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      member.name.toLowerCase().includes(term) || member.email.toLowerCase().includes(term);
    const matchesPlan = planFilter === 'All' || member.plan === planFilter;
    return matchesSearch && matchesPlan;
  });

  const handleUpdate = (updatedMember) => {
    onUpdateMember(updatedMember);
    setEditingMember(null);
    setMessage('Member details updated successfully!');
  };

  const confirmDelete = () => {
    onDeleteMember(deletingMember.id);
    setDeletingMember(null);
    setMessage('Member deleted successfully!');
  };

  return (
    <div className="container page">
      <div className="page-header row">
        <div>
          <h1 className="page-title">Members</h1>
          <p className="page-subtitle">
            {members.length} registered {members.length === 1 ? 'member' : 'members'}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/register')}>
          <UserPlus size={18} /> Add Member
        </button>
      </div>

      {message && (
        <div className="alert alert-success">
          <CheckCircle size={20} />
          <span>{message}</span>
        </div>
      )}

      {members.length === 0 ? (
        <div className="card empty-state">
          <Users size={40} />
          <p>No members registered yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>
            Register First Member
          </button>
        </div>
      ) : (
        <div className="card">
          {/* Search + filter toolbar */}
          <div className="toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search members by name or email..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <select
              className="filter-select"
              value={planFilter}
              onChange={(event) => setPlanFilter(event.target.value)}
            >
              <option value="All">All Plans</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="empty-state">
              <SearchX size={40} />
              <p>No members found.</p>
            </div>
          ) : (
            <MemberTable
              members={filteredMembers}
              onEdit={setEditingMember}
              onDelete={setDeletingMember}
            />
          )}
        </div>
      )}

      {/* Edit modal reuses the same MemberForm component */}
      {editingMember && (
        <Modal title="Edit Member" onClose={() => setEditingMember(null)}>
          <MemberForm
            initialData={editingMember}
            onSubmit={handleUpdate}
            onCancel={() => setEditingMember(null)}
            submitLabel="Save Changes"
          />
        </Modal>
      )}

      {/* Delete confirmation modal */}
      {deletingMember && (
        <Modal title="Delete Member" size="small" onClose={() => setDeletingMember(null)}>
          <p className="confirm-text">
            Are you sure you want to delete <strong>{deletingMember.name}</strong>? This action
            cannot be undone.
          </p>
          <div className="confirm-actions">
            <button className="btn btn-outline" onClick={() => setDeletingMember(null)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={confirmDelete}>
              Yes, Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Members;
