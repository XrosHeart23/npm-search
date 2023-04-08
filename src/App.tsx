import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { searchPackages } from "./services/npmService";

import logo from "./logo.svg";
import "./App.css";

function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleSearch = async (query: string) => {
        setSearchPerformed(true);
        try {
            const results = await searchPackages(query, 10, 0);
            setSearchResults(
                results.objects.map((obj: any) => ({
                    name: obj.package.name,
                    author: obj.package.publisher.username,
                    date: obj.package.date,
                })),
            );
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {searchPerformed && <SearchResults results={searchResults} />}
        </div>
    );
}

export default App;

