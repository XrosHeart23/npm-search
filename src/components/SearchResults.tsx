import { Box, Grid, Paper, Typography } from "@mui/material";
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
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
            {results.map((result, index) => (
                <Grid key={index} item xs={4} sm={6} md={4} lg={3}>
                    <Box display="flex" flexDirection="column">
                        <Paper sx={{ padding: 2, flexGrow: 1 }}>
                            <Typography variant="h6">{result.name}</Typography>
                            <Typography>{result.author}</Typography>
                            <Typography>{result.date}</Typography>
                        </Paper>
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchResults;
