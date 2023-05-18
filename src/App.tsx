import { Routes, Route } from "react-router-dom";
import "./App.scss";
import SurveyForm from "./pages/SurveyPage/SurveyForm";
import SuccessPage from "./pages/SuccesPage/SuccessPage";
import Layout from "./components/LayoutCustom/LayoutCustom";
import NoMatchPage from "./pages/NoMatchPage/NoMatchPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SurveyForm />} />
          <Route path="success" element={<SuccessPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
