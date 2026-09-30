# FitFlex – Viva Guide

Simple answers you can give in the viva, with the file where each thing happens.

---

### What is React?
React is a JavaScript library made by Meta for building user interfaces.
You split the screen into small reusable pieces called **components**. When the data
(**state**) changes, React updates only the part of the page that changed.

### Why was React used?
- The app is made of reusable parts. For example, `MemberForm` is used for both Register and Edit, and `StatCard` is used four times.
- When state changes, the UI updates by itself. Adding a member immediately changes the dashboard numbers.
- React Router lets us have four pages without reloading the browser. This is called a Single Page Application.
- It is fast to develop with Vite.

### What is JSX?
JSX lets us write HTML-like code inside JavaScript. For example:
```jsx
<h3 className="stat-value">{value}</h3>
```
Anything inside `{ }` is JavaScript. We write `className` instead of `class`.
Vite converts JSX into normal JavaScript before the browser runs it.

### Where is useState used?
`useState` stores data that can change. When it changes, the component re-renders.

| File | State | Purpose |
|---|---|---|
| `App.jsx` | `members` | The main list of all members |
| `MemberForm.jsx` | `formData`, `errors` | Form values and validation messages |
| `Members.jsx` | `searchTerm`, `planFilter` | Search text and the selected plan filter |
| `Members.jsx` | `editingMember`, `deletingMember` | Which member is being edited or deleted (opens the popup) |
| `Navbar.jsx` | `isMenuOpen` | Opens and closes the mobile menu |
| `Register.jsx`, `Members.jsx` | `successMessage`, `message` | Success alerts |

### Where is useEffect used?
`useEffect` runs code **after** the component renders, for "side effects".

1. `App.jsx`, dependency `[]`: **loads** members from localStorage once when the app starts.
2. `App.jsx`, dependency `[members]`: **saves** members to localStorage whenever they change.
3. `Register.jsx`: after a successful registration, waits 1.5 seconds and then goes to `/members`.
4. `Members.jsx`: hides the success message after 3 seconds.
5. `MemberForm.jsx`: fills in the plan chosen on the Plans page.
6. `Modal.jsx`: closes the popup when you press the Escape key.

### Why is localStorage used?
React state is lost when the page refreshes. localStorage is storage built into the browser
that keeps data even after refresh or restart. It only stores **strings**, so we use
`JSON.stringify()` to save and `JSON.parse()` to read. The key is `fitflex_members`.
It is a simple replacement for a database in a project without a backend.

### How does fee calculation work?
In `data/plans.js`:
```js
export const calculateFee = (planName, isStudent) => {
  const plan = getPlanByName(planName);                    // find the plan
  const baseFee = plan ? plan.price : 0;
  const discount = isStudent ? Math.round(baseFee * 0.1) : 0;  // 10%
  const finalFee = baseFee - discount;
  return { baseFee, discount, finalFee };
};
```
`MemberForm` calls this on every render. When the user changes the plan or ticks the
student checkbox, state changes, the component re-renders, and the fee summary updates.
For example, Premium with the student discount is ₹4,499 − ₹450 = **₹4,049**.

### How does form validation work?
In `MemberForm.jsx`, the `validate()` function checks every field and returns an `errors` object:
- Name: required, at least 3 characters
- Email: required, checked with the regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone: exactly 10 digits, checked with `/^\d{10}$/`
- Age: between 16 and 80
- Gender, Plan and Start Date: required

On submit, `event.preventDefault()` stops the page from reloading. If `errors` has any keys,
we show them under the fields and stop. The form has `noValidate`, so **our JavaScript
validation** is used instead of the browser's built-in popups. When the user types in a field,
that field's error is cleared.

### How does search work?
The text box is a controlled input stored in `searchTerm`. On every keystroke the component
re-renders and filters the list:
```js
member.name.toLowerCase().includes(term) || member.email.toLowerCase().includes(term)
```
Both sides are converted to lowercase, so the search is case-insensitive.

### How does filtering work?
The dropdown value is stored in `planFilter`. A member is shown only if **both** conditions are true:
```js
const matchesPlan = planFilter === 'All' || member.plan === planFilter;
return matchesSearch && matchesPlan;
```
That is why search and filter work together.

### How does edit and delete work?
**Edit:** clicking ✏️ stores that member in `editingMember`. That opens a `Modal` containing
the same `MemberForm`, pre-filled through `initialData`. On save, `updateMember()` in `App.jsx`
uses `map()` to replace the member with the same `id`.

**Delete:** clicking 🗑 stores the member in `deletingMember` and shows a confirmation popup.
On "Yes, Delete", `deleteMember()` uses `filter()` to keep every member except that `id`.

In both cases the `members` state changes, which triggers the save `useEffect` to update
localStorage. The dashboard statistics also update, because they are calculated from `members`.

### How does React Router work?
- `main.jsx` wraps the app in `<BrowserRouter>`.
- `App.jsx` defines `<Route path="/plans" element={<Plans />} />` and the other pages.
- `NavLink` in the Navbar changes the URL without reloading and adds the `active` class to the current page.
- `useNavigate()` moves between pages from code, for example the "Register Member" button.
- **Passing the selected plan:** `Plans.jsx` calls
  `navigate('/register', { state: { selectedPlan: 'Premium' } })`, and `Register.jsx` reads it with
  `useLocation().state?.selectedPlan`.

### What are the main components?
| Component | Job |
|---|---|
| `App` | Holds the members state, the add/update/delete functions and the routes |
| `Navbar` | Navigation links, active-page highlight, mobile menu |
| `StatCard` | One statistic box on the dashboard |
| `MembershipCard` | One pricing card with a Select Plan button |
| `MemberForm` | Form, validation and fee summary (used for Add **and** Edit) |
| `MemberTable` | Shows members with Edit/Delete buttons (becomes cards on mobile) |
| `Modal` | Reusable popup for the Edit form and the Delete confirmation |
| `Footer` | Page footer |
| Pages | `Dashboard`, `Plans`, `Register`, `Members` |

### How are the dashboard statistics calculated?
In `Dashboard.jsx`:
- **Total Members** = `members.length`
- **Active Members** = `members.filter(isMemberActive).length`. A member is active if start date + plan months is still in the future.
- **Membership Plans** = `plans.length`
- **Total Revenue** = `members.reduce((sum, m) => sum + m.finalFee, 0)`

---

## Requirement → Feature Mapping

| # | College Requirement | How it is met (file) |
|---|---|---|
| 1 | ReactJS | Whole app is built with React 18 |
| 2 | HTML5 | `index.html` plus semantic tags such as `header`, `nav`, `main`, `section`, `aside`, `footer`, `form`, `table` |
| 3 | CSS3 | `index.css`: variables, Flexbox, Grid, transitions, keyframes, media queries |
| 4 | JavaScript ES6 | Arrow functions, destructuring, spread, template literals, `map`/`filter`/`find`/`reduce`, modules |
| 5 | React components | 7 components + 4 pages |
| 6 | JSX | Every `.jsx` file |
| 7 | useState | App, MemberForm, Members, Navbar, Register |
| 8 | useEffect | App (localStorage), Register, Members, MemberForm, Modal |
| 9 | Form handling | `MemberForm.jsx`: controlled inputs, one `handleChange`, `handleSubmit` |
| 10 | Client-side validation | `validate()` in `MemberForm.jsx` |
| 11 | Add | Register page, `addMember()` in `App.jsx` |
| 12 | Edit | Edit popup, `updateMember()` in `App.jsx` |
| 13 | Delete | Confirmation popup, `deleteMember()` in `App.jsx` |
| 14 | Search | `Members.jsx`, search by name or email |
| 15 | Filter | `Members.jsx`, plan dropdown |
| 16 | Calculation | `calculateFee()` in `plans.js`; dashboard revenue with `reduce` |
| 17 | 3+ pages | 4 pages: Dashboard, Plans, Register, Members |
| 18 | Responsive design | Media queries at 1024 / 900 / 768 / 480 px; table becomes cards on mobile; hamburger menu |
| 19 | Meaningful names | `MemberForm`, `MembershipCard`, `calculateFee`, `isMemberActive` … |
| 20 | Clear structure | `components/`, `pages/`, `data/` folders |
| + | React Router | `Routes`, `NavLink`, `useNavigate`, `useLocation` |
| + | localStorage | `App.jsx`, key `fitflex_members` |

## Suggested Demo Flow (2–3 minutes)
1. Open the Dashboard with no members and show the empty state.
2. Go to Plans and click **Select Plan** on Premium. The Register page opens with Premium selected.
3. Click Register with empty fields to show the validation errors.
4. Fill in the form and tick Student Discount. The fee changes from ₹4,499 to ₹4,049.
5. Submit. The success message appears and the app redirects to Members.
6. Add 2–3 more members, then **refresh the browser** to show that the data is still there.
7. Search by name, filter by plan, and combine both.
8. Edit a member, change the plan, and show the new fee.
9. Delete a member after the confirmation popup.
10. Return to the Dashboard to show the updated statistics.
11. Resize the browser or open mobile view in DevTools to show the responsive layout.
