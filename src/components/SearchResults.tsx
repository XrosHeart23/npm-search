import React from "react";

interface SearchResult {
    name: string;
    author: string;
    date: string;
}

interface SearchResultsProps {
    results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    if (results.length === 0) {
        return (
            <div>
                <p>No result found</p>
            </div>
        );
    }

    return (
        <div>
            {results.map((result, index) => (
                <div key={index}>
                    <h3>{result.name}</h3>
                    <p>Author: {result.author}</p>
                    <p>Last updated: {result.date}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;
