import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Plans from './pages/Plans';
import Register from './pages/Register';
import Members from './pages/Members';

const STORAGE_KEY = 'fitflex_members';

function App() {
  // The members list is shared by all pages, so it lives here in App
  const [members, setMembers] = useState([]);
  // Becomes true after saved data is loaded, so we never overwrite it with []
  const [isLoaded, setIsLoaded] = useState(false);

  // 1) Runs once when the app starts: load members from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMembers(JSON.parse(saved));
    } catch {
      console.error('Could not read saved members');
    }
    setIsLoaded(true);
  }, []);

  // 2) Runs whenever members change: save them to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    }
  }, [members, isLoaded]);

  const addMember = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
  };

  const updateMember = (updatedMember) => {
    setMembers((prev) =>
      prev.map((member) => (member.id === updatedMember.id ? updatedMember : member))
    );
  };

  const deleteMember = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard members={members} />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/register" element={<Register onAddMember={addMember} />} />
          <Route
            path="/members"
            element={
              <Members
                members={members}
                onUpdateMember={updateMember}
                onDeleteMember={deleteMember}
              />
            }
          />
          <Route path="*" element={<Dashboard members={members} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
