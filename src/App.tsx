import { Route, Routes } from "react-router-dom";
import PackageDetails from "./components/PackageDetails";
import SearchPage from "./components/SearchPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<SearchPage />}></Route>
            <Route path="/package/:packageName/:version" element={<PackageDetails />} />
        </Routes>
    );
}

export default App;

