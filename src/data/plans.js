// All membership plan details live here, so every page uses the same data.
const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 999,
    durationMonths: 1,
    duration: '1 Month',
    benefits: ['Gym access', 'Cardio equipment', 'Weight training'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 2499,
    durationMonths: 3,
    duration: '3 Months',
    benefits: ['Everything in Basic', 'Group classes', 'Locker access'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 4499,
    durationMonths: 6,
    duration: '6 Months',
    benefits: ['Everything in Standard', 'Personal trainer', 'Diet consultation'],
    popular: true,
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 7999,
    durationMonths: 12,
    duration: '12 Months',
    benefits: ['Everything in Premium', 'Personal trainer', 'Diet plan', 'Priority support'],
  },
];

export const STUDENT_DISCOUNT_RATE = 0.1; // 10%

// Find a plan object by its name, e.g. getPlanByName('Premium')
export const getPlanByName = (name) => plans.find((plan) => plan.name === name);

// Fee calculation: base price minus an optional 10% student discount
export const calculateFee = (planName, isStudent) => {
  const plan = getPlanByName(planName);
  const baseFee = plan ? plan.price : 0;
  const discount = isStudent ? Math.round(baseFee * STUDENT_DISCOUNT_RATE) : 0;
  const finalFee = baseFee - discount;
  return { baseFee, discount, finalFee };
};

// Format a number as Indian Rupees, e.g. 78450 -> ₹78,450
export const formatCurrency = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

// Format "2026-09-29" as "29 Sep 2026"
export const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

// A member is "active" if today is before their membership end date
export const isMemberActive = (member) => {
  const plan = getPlanByName(member.plan);
  if (!plan || !member.startDate) return false;
  const endDate = new Date(member.startDate);
  endDate.setMonth(endDate.getMonth() + plan.durationMonths);
  return endDate >= new Date();
};

export default plans;
