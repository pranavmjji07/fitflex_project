import { useState, useEffect } from 'react';
import { User, CreditCard, Receipt } from 'lucide-react';
import plans, { getPlanByName, calculateFee, formatCurrency } from '../data/plans';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  age: '',
  gender: '',
  plan: '',
  startDate: '',
  paymentMethod: 'Cash',
  isStudent: false,
};

// Checks every field and returns an object of error messages
const validate = (values) => {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;

  if (!values.name.trim()) errors.name = 'Full name is required';
  else if (values.name.trim().length < 3) errors.name = 'Name must be at least 3 characters';

  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!emailPattern.test(values.email.trim())) errors.email = 'Enter a valid email address';

  if (!values.phone.trim()) errors.phone = 'Phone number is required';
  else if (!phonePattern.test(values.phone.trim())) errors.phone = 'Phone must be exactly 10 digits';

  if (values.age === '') errors.age = 'Age is required';
  else if (Number(values.age) < 16 || Number(values.age) > 80) errors.age = 'Age must be between 16 and 80';

  if (!values.gender) errors.gender = 'Please select a gender';
  if (!values.plan) errors.plan = 'Please select a membership plan';
  if (!values.startDate) errors.startDate = 'Start date is required';

  return errors;
};

/*
  Reusable form used for BOTH registering and editing a member.
  - initialData: existing member (edit mode) or null (add mode)
  - preselectedPlan: plan name passed from the Plans page
  - onSubmit: called with the complete member object when the form is valid
*/
function MemberForm({ initialData = null, preselectedPlan = '', onSubmit, onCancel, submitLabel }) {
  const [formData, setFormData] = useState(
    initialData ? { ...emptyForm, ...initialData } : { ...emptyForm, plan: preselectedPlan }
  );
  const [errors, setErrors] = useState({});

  // If the user picks another plan on the Plans page, update the form
  useEffect(() => {
    if (preselectedPlan && !initialData) {
      setFormData((prev) => ({ ...prev, plan: preselectedPlan }));
    }
  }, [preselectedPlan, initialData]);

  const selectedPlan = getPlanByName(formData.plan);
  const { baseFee, discount, finalFee } = calculateFee(formData.plan, formData.isStudent);

  // One change handler for every input, using the input's "name" attribute
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });

    // Clear the error of a field as soon as the user edits it
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const member = {
      ...formData,
      id: initialData ? initialData.id : `FF-${Date.now().toString(36).toUpperCase()}`,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      age: Number(formData.age),
      duration: selectedPlan.duration,
      baseFee,
      discount,
      finalFee,
      registeredAt: initialData ? initialData.registeredAt : new Date().toISOString(),
    };

    onSubmit(member);

    // After adding a new member, clear the form
    if (!initialData) {
      setFormData(emptyForm);
    }
  };

  // Small helper so every text field is written the same way
  const renderInput = (label, name, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label htmlFor={name}>{label} *</label>
      <input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className={errors[name] ? 'input-error' : ''}
      />
      {errors[name] && <span className="error-text">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="member-form" onSubmit={handleSubmit} noValidate>
      <div className="form-layout">
        <div className="form-fields">
          {/* Personal details */}
          <section className="form-section">
            <h3 className="form-section-title">
              <User size={18} /> Personal Details
            </h3>
            <div className="form-grid">
              {renderInput('Full Name', 'name', 'text', 'e.g. Arjun Kumar')}
              {renderInput('Email', 'email', 'email', 'e.g. arjun@gmail.com')}
              {renderInput('Phone Number', 'phone', 'tel', '10-digit mobile number')}
              {renderInput('Age', 'age', 'number', '16 - 80')}

              <div className="form-group">
                <label>Gender *</label>
                <div className="radio-group">
                  {['Male', 'Female', 'Other'].map((option) => (
                    <label key={option} className="radio-option">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={formData.gender === option}
                        onChange={handleChange}
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>
            </div>
          </section>

          {/* Membership details */}
          <section className="form-section">
            <h3 className="form-section-title">
              <CreditCard size={18} /> Membership Details
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="plan">Membership Plan *</label>
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className={errors.plan ? 'input-error' : ''}
                >
                  <option value="">-- Select a plan --</option>
                  {plans.map((plan) => (
                    <option key={plan.id} value={plan.name}>
                      {plan.name} – {formatCurrency(plan.price)} / {plan.duration}
                    </option>
                  ))}
                </select>
                {errors.plan && <span className="error-text">{errors.plan}</span>}
              </div>

              {renderInput('Start Date', 'startDate', 'date')}

              <div className="form-group">
                <label htmlFor="paymentMethod">Payment Method</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    name="isStudent"
                    checked={formData.isStudent}
                    onChange={handleChange}
                  />
                  Apply Student Discount (10%)
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Fee summary card – recalculated on every render */}
        <aside className="fee-summary">
          <h3 className="form-section-title">
            <Receipt size={18} /> Fee Summary
          </h3>

          {selectedPlan ? (
            <div className="selected-plan-info">
              <p className="selected-plan-name">{selectedPlan.name} Plan</p>
              <p className="selected-plan-meta">
                {selectedPlan.duration} · {formatCurrency(selectedPlan.price)}
              </p>
            </div>
          ) : (
            <p className="fee-placeholder">Select a plan to see the fee.</p>
          )}

          <div className="fee-row">
            <span>Base Fee</span>
            <span>{formatCurrency(baseFee)}</span>
          </div>
          <div className="fee-row discount">
            <span>Discount {formData.isStudent && '(10%)'}</span>
            <span>− {formatCurrency(discount)}</span>
          </div>
          <div className="fee-row total">
            <span>Final Fee</span>
            <span>{formatCurrency(finalFee)}</span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-block">
              {submitLabel}
            </button>
            {onCancel && (
              <button type="button" className="btn btn-outline btn-block" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>
        </aside>
      </div>
    </form>
  );
}

export default MemberForm;
