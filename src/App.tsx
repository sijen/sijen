import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts"; // Repurposed as Projects
import IPTracker from "./pages/IPTracker"; // Repurposed as Skills
import Logs from "./pages/Logs"; // Repurposed as Experience

function MainContent() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-xdr-bg">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Alerts />} />
          <Route path="/skills" element={<IPTracker />} />
          <Route path="/experience" element={<Logs />} />
          <Route path="/leo" element={<div>Leo Club details page (TBD)</div>} />
          <Route path="/certs" element={<div>Certifications page (TBD)</div>} />
          <Route path="/contact" element={<Login />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

function AppContent() {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-xdr-bg text-xdr-text">
      <Sidebar />
      <MainContent />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

