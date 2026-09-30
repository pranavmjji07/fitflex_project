import { Check } from 'lucide-react';
import { formatCurrency } from '../data/plans';

// One pricing card on the Membership Plans page
function MembershipCard({ plan, onSelect }) {
  const { name, price, duration, benefits, popular } = plan;

  return (
    <div className={`plan-card ${popular ? 'plan-card-popular' : ''}`}>
      {popular && <span className="plan-badge">Most Popular</span>}

      <h3 className="plan-name">{name.toUpperCase()}</h3>
      <p className="plan-price">{formatCurrency(price)}</p>
      <p className="plan-duration">{duration}</p>

      <ul className="plan-benefits">
        {benefits.map((benefit) => (
          <li key={benefit}>
            <Check size={16} className="check-icon" />
            {benefit}
          </li>
        ))}
      </ul>

      <button
        className={`btn ${popular ? 'btn-primary' : 'btn-outline'} btn-block`}
        onClick={() => onSelect(name)}
      >
        Select Plan
      </button>
    </div>
  );
}

export default MembershipCard;
