import { useNavigate } from 'react-router-dom';
import MembershipCard from '../components/MembershipCard';
import plans from '../data/plans';

function Plans() {
  const navigate = useNavigate();

  // Send the chosen plan to the Register page using router state
  const handleSelectPlan = (planName) => {
    navigate('/register', { state: { selectedPlan: planName } });
  };

  return (
    <div className="container page">
      <div className="page-header center">
        <h1 className="page-title">Membership Plans</h1>
        <p className="page-subtitle">
          Choose a plan that fits your goals. Students get an extra 10% off.
        </p>
      </div>

      <div className="plans-grid">
        {plans.map((plan) => (
          <MembershipCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
        ))}
      </div>
    </div>
  );
}

export default Plans;
