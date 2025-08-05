import React from "react";
import ReactDOM from "react-dom/client"; // Using 'react-dom/client' for React 18+
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "assets/styles/tailwind.css";
import 'assets/styles/index.css';

// layouts
import Admin from "layouts/Admin.jsx";
import Auth from "layouts/Auth.jsx";
import Login from "views/auth/Login.jsx";
import Register from "views/auth/Register.jsx";

// views without layouts
import Landing from "views/Landing.jsx";
import Profile from "views/Profile.jsx";
import Index from "views/Index.jsx";
import RecipeSearch from "views/Edamam/RecipeSearch.jsx";
import DailyAffirmation from "views/services/DailyAffirmation.jsx";
import Meditation from "views/services/Meditation.jsx";
import QuickMeditation from "views/services/QuickMeditation.jsx";
import SleepBetter from "views/services/SleepBetter.jsx";
import FeelStronger from "views/services/FeelStronger.jsx";
import ToDoList from "views/services/ToDoList.jsx";
import AIchatbox from "views/AIchatbox.jsx";
import ChatboxSurvey from "views/chatbox_Survey.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Routes with layouts */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/auth" element={<Auth />} />

      {/* Routes without layouts */}
      <Route path="/landing" element={<Landing />} />
      <Route path="/index" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/recipe-search" element={<RecipeSearch />} />
      <Route path="/meditation" element={<Meditation />} />
      <Route path="/daily-affirmation" element={<DailyAffirmation />} />
      <Route path="/sleep-better" element={<SleepBetter />} />
      <Route path="/quick-meditation" element={<QuickMeditation />} />
      <Route path="/feel-stronger" element={<FeelStronger />} />
      <Route path="/to-do-list" element={<ToDoList />} />
      <Route path="/ai-chatbox" element={<AIchatbox />} />
      <Route path="/chatbox-survey" element={<ChatboxSurvey />} />
      {/* Redirect for first page */}
      <Route path="*" element={<Navigate to="/index" />} />
    </Routes>
  </BrowserRouter>
);
