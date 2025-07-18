import { Routes, Route } from "react-router-dom";
import Layout from "@/components/organisms/Layout";
import Dashboard from "@/components/pages/Dashboard";
import MyGuides from "@/components/pages/MyGuides";
import GuideEditor from "@/components/pages/GuideEditor";
import GuideViewer from "@/components/pages/GuideViewer";
import Templates from "@/components/pages/Templates";
import Settings from "@/components/pages/Settings";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="my-guides" element={<MyGuides />} />
          <Route path="guide/:id" element={<GuideEditor />} />
          <Route path="guide/:id/view" element={<GuideViewer />} />
          <Route path="templates" element={<Templates />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;