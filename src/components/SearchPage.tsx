// components/SearchPage.tsx
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { Container, Pagination } from "@mui/material";
import { SearchBarContainer } from "../assets/AppStyles";
import { searchPackages } from "../services/npmService";
import Loading from "./Loading";

export default function SearchPage() {
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
                const results = await searchPackages(searchQuery, itemsCountPerPage, (currentPage - 1) * itemsCountPerPage);
                setSearchResults(
                    results.objects.map((obj: any) => ({
                        name: obj.package.name,
                        author: obj.package.publisher.username,
                        date: obj.package.date,
                        version: obj.package.version,
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

    const handleSearch = async (query: string, pageNumber: number = 1) => {
        setSearchQuery(query);
        setCurrentPage(pageNumber);
        setSearchPerformed(true);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
        handleSearch(searchQuery, newPage);
    };

    return (
        <>
            <SearchBarContainer searchPerformed={searchPerformed}>
                <SearchBar onSearch={handleSearch} />
            </SearchBarContainer>
            <Container maxWidth="lg" sx={{ marginTop: searchPerformed ? 16 : 0 }}>
                {searchPerformed && (
                    <>
                        {loading ? (
                            <Loading />
                        ) : (
                            <>
                                <SearchResults results={searchResults} />
                                {totalItemsCount > 0 ? (
                                    <Pagination
                                        count={Math.ceil(totalItemsCount / itemsCountPerPage)}
                                        page={currentPage}
                                        onChange={handlePageChange}
                                        shape="rounded"
                                        color="primary"
                                        sx={{
                                            marginTop: 4,
                                            marginBottom: 4,
                                            justifyContent: "center",
                                            display: "flex",
                                        }}
                                    />
                                ) : null}
                            </>
                        )}
                    </>
                )}
            </Container>
        </>
    );
}
