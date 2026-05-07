import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Leo from "./pages/Leo";
import Lab from "./pages/Lab";
import Certs from "./pages/Certs";
import Quiz from "./pages/Quiz";

function MainContent() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Topbar />
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-xdr-bg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/experience" element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/skills" element={<Home />} />
          <Route path="/leo" element={<Leo />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/security" element={<Lab />} />
          <Route path="/certs" element={<Certs />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/blog" element={<div>Blog page (Coming soon)</div>} />
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

