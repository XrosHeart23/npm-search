import React, { useRef } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const searchQuery = useRef<HTMLInputElement>(null);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (searchQuery.current) {
            onSearch(searchQuery.current.value);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input type="text" ref={searchQuery} />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
