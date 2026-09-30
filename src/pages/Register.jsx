import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import MemberForm from '../components/MemberForm';

function Register({ onAddMember }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  // Plan chosen on the Plans page (if any)
  const preselectedPlan = location.state?.selectedPlan || '';

  const handleRegister = (newMember) => {
    onAddMember(newMember);
    setSuccessMessage('Member registered successfully!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // After a successful registration, go to the Members page after 1.5 seconds
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => navigate('/members'), 1500);
    return () => clearTimeout(timer); // cleanup if the user leaves early
  }, [successMessage, navigate]);

  return (
    <div className="container page">
      <div className="page-header">
        <h1 className="page-title">Register Member</h1>
        <p className="page-subtitle">Fill in the details below to add a new gym member.</p>
      </div>

      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle size={20} />
          <span>{successMessage} Redirecting to members list...</span>
        </div>
      )}

      <div className="card">
        <MemberForm
          preselectedPlan={preselectedPlan}
          onSubmit={handleRegister}
          submitLabel="Register Member"
        />
      </div>
    </div>
  );
}

export default Register;
