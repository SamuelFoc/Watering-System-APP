import RequireAuth from "./auth/RequireAuth";
import { Routes, Route } from "react-router-dom";
import "./variables.css";

import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Flower from "./pages/Flower";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/Flower/:id" element={<Flower />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </Layout>
  );
}

export default App;
