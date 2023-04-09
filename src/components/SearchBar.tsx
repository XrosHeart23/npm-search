import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
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
            <TextField
                inputRef={searchQuery}
                variant="outlined"
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton type="submit" edge="end">
                                <Search />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "50px",
                        paddingLeft: "10px",
                    },
                }}
            />
        </form>
    );
};

export default SearchBar;
