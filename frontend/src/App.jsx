import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Participants from "./pages/Participants";
import Scanner from "./pages/Scanner";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/participants" element={<Participants />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
}
