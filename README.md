# FitFlex – Gym Membership Management System

## 1. Project Description

**FitFlex** is a responsive React web application for managing gym memberships.
It solves the problem statement:

> *"Gym Membership Interface – Select membership plans, register members, and calculate fees."*

Gym staff can view membership plans, register members, calculate fees automatically
(with an optional 10% student discount), and search, filter, edit and delete members.
All data is saved in the browser's **localStorage**, so it is still there after a page refresh.

No backend, login or database is needed. It runs entirely in the browser.

## 2. Features

| Feature | Where |
|---|---|
| Dashboard with live statistics (Total Members, Active Members, Plans, Revenue) | `/` |
| Latest 5 registered members | `/` |
| 4 membership plan cards (Basic, Standard, Premium, Elite) | `/plans` |
| "Select Plan" opens the register form with that plan already chosen | `/plans` → `/register` |
| Registration form with personal and membership details | `/register` |
| Automatic fee calculation with a 10% student discount | `/register` |
| Client-side validation with error messages under each field | `/register`, Edit popup |
| Member table with Member ID, Name, Email, Phone, Plan, Duration, Start Date, Fee | `/members` |
| Live search by name or email | `/members` |
| Filter by plan (works together with search) | `/members` |
| Edit a member in a popup (same form, pre-filled) | `/members` |
| Delete a member after confirmation | `/members` |
| Success messages for add, edit and delete | all forms |
| Empty states ("No members registered yet." / "No members found.") | `/`, `/members` |
| Data saved in localStorage | whole app |
| Responsive layout for desktop, tablet and mobile, with a mobile menu | whole app |

## 3. Technologies Used

- **ReactJS 18**: UI library
- **Vite**: development server and build tool
- **React Router DOM 6**: page navigation
- **JavaScript (ES6+)**
- **HTML5 / JSX**
- **CSS3**: plain CSS with CSS variables, Flexbox, Grid and media queries (no Tailwind or Bootstrap)
- **Lucide React**: icons
- **localStorage**: browser storage

## 4. React Concepts Demonstrated

| Concept | Where it is used |
|---|---|
| Functional components | Every file in `components/` and `pages/` |
| JSX | All components |
| Props | `members`, `onAddMember`, `onUpdateMember`, `onDeleteMember`, `plan`, `onSelect` … |
| `useState` | `App.jsx` (members), `MemberForm.jsx` (form data, errors), `Members.jsx` (search, filter, edit/delete target, message), `Navbar.jsx` (mobile menu), `Register.jsx` (success message) |
| `useEffect` | `App.jsx` (load and save localStorage), `Register.jsx` (redirect after success), `Members.jsx` (auto-hide message), `MemberForm.jsx` (apply preselected plan), `Modal.jsx` (Escape key) |
| Controlled form inputs | `MemberForm.jsx` |
| Conditional rendering | Empty states, error messages, modals, success alerts |
| List rendering with `map` and `key` | Plan cards, table rows, nav links |
| Lifting state up | `members` lives in `App.jsx` and is shared with every page |
| React Router | `Routes`, `Route`, `NavLink`, `useNavigate`, `useLocation`, router `state` |
| Component reuse | `MemberForm` is used for **both** Register and Edit; `StatCard` is used 4 times |

**ES6 features used:** `const`/`let`, arrow functions, template literals, destructuring,
the spread operator (`...`), `map`, `filter`, `find`, `reduce`, optional chaining (`?.`),
and `import`/`export` modules.

## 5. Project Structure

```
fitflex/
├── index.html              # HTML page that React is loaded into
├── package.json            # Project info and dependencies
├── vite.config.js          # Vite configuration
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # Entry point: renders <App/> inside <BrowserRouter>
    ├── App.jsx             # Routes + members state + localStorage
    ├── index.css           # All styles (variables, layout, responsive rules)
    ├── data/
    │   └── plans.js        # Plan data + helper functions (fee calculation, formatting)
    ├── components/
    │   ├── Navbar.jsx          # Top navigation with active link and mobile menu
    │   ├── Footer.jsx          # Page footer
    │   ├── StatCard.jsx        # One statistic card on the dashboard
    │   ├── MembershipCard.jsx  # One pricing card on the plans page
    │   ├── MemberForm.jsx      # Register/Edit form with validation and fee summary
    │   ├── MemberTable.jsx     # Members table with Edit/Delete buttons
    │   └── Modal.jsx           # Popup used for Edit and Delete confirmation
    └── pages/
        ├── Dashboard.jsx   # "/"         Hero, stats, recent members
        ├── Plans.jsx       # "/plans"    Membership cards
        ├── Register.jsx    # "/register" Registration form
        └── Members.jsx     # "/members"  Search, filter, table, edit, delete
```

## 6. How to Install

You need **Node.js 18 or newer**. Check with `node -v`.

```bash
cd fitflex
npm install
```

## 7. How to Run

```bash
npm run dev
```

Open the URL shown in the terminal (usually **http://localhost:5173**).

To create a production build (optional):

```bash
npm run build
npm run preview
```

## 8. How localStorage Is Used

- **Key:** `fitflex_members`
- **Value:** the members array, stored as a JSON string

In `App.jsx`:

1. **Load:** a `useEffect` with an empty dependency array `[]` runs once when the app starts.
   It reads `localStorage.getItem('fitflex_members')`, converts it with `JSON.parse()`
   and puts it into state with `setMembers()`.
2. **Save:** a second `useEffect` with `[members]` as its dependency runs every time the
   members list changes (add, edit or delete). It saves the list with
   `localStorage.setItem('fitflex_members', JSON.stringify(members))`.
3. An `isLoaded` flag makes sure the empty starting list `[]` is never saved over the real
   data before loading has finished.

To clear all data, open DevTools, go to Application → Local Storage and delete `fitflex_members`.

## 9. Member Data Model

```js
{
  id: 'FF-MUM84TJG',          // unique ID made from the current time
  name: 'Arjun Kumar',
  email: 'arjun@gmail.com',
  phone: '9876543210',
  age: 21,
  gender: 'Male',
  plan: 'Premium',
  duration: '6 Months',
  startDate: '2026-09-01',
  paymentMethod: 'UPI',
  isStudent: true,
  baseFee: 4499,
  discount: 450,
  finalFee: 4049,
  registeredAt: '2026-09-29T05:10:00.000Z'
}
```

## 10. Future Enhancements

- A backend (Node.js/Express plus MySQL or MongoDB) so data is shared across devices
- Admin login
- Membership renewal and expiry reminders
- Export the member list to Excel or PDF
- Printable payment receipts
- Attendance check-in using a QR code
- Monthly revenue charts
