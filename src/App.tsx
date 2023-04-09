import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { searchPackages } from "./services/npmService";
import Pagination from "./components/Pagination";

import logo from "./logo.svg";
import "./App.css";
import Loading from "./components/Loading";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const itemsCountPerPage = 10;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!searchPerformed) return;

        const fetchSearchResult = async () => {
            setLoading(true);
            try {
                const results = await searchPackages(
                    searchQuery,
                    itemsCountPerPage,
                    (currentPage - 1) * itemsCountPerPage,
                );
                setSearchResults(
                    results.objects.map((obj: any) => ({
                        name: obj.package.name,
                        author: obj.package.publisher.username,
                        date: obj.package.date,
                    })),
                );
                setTotalItemsCount(results.total);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }

            setLoading(false);
        };

        fetchSearchResult();
    }, [searchPerformed, searchQuery, currentPage]);

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
        setSearchPerformed(true);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            {searchPerformed && (
                <>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <SearchResults results={searchResults} />
                            {totalItemsCount > 0 ? (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={Math.ceil(
                                        totalItemsCount / itemsCountPerPage,
                                    )}
                                    onPageChange={handlePageChange}
                                />
                            ) : null}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default App;

