
import { Routes, Route } from "react-router"

import HomePage from "./pages/HomePage.jsx"
import CreatePage from "./pages/CreatePage.jsx"
import YourNotesDetail from "./pages/YourNotesDetail.jsx"
import Login from "./pages/Login.jsx" 
import SignUp from "./pages/SignUp.jsx"
import DeleteConfirm from "./components/DeleteConfirm.jsx"
import useSystemTheme from "./lib/theme.js";

const App = () => {

  useSystemTheme();

  return (
    <div>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<YourNotesDetail />} />
        <Route path="/confirm/delete-note/:id" element={<DeleteConfirm />} />
        <Route path="/login" element={<Login /> } />
        <Route path="/signup" element={<SignUp /> } />

      </Routes>

    </div>
  );
};

export default App