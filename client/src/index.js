import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PostCard from "./pages/components/PostCard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/feed" element={<PostCard />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
