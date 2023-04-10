import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface SearchResult {
    name: string;
    author: string;
    date: string;
    version: string;
}

interface SearchResultsProps {
    results: SearchResult[];
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options = { year: "numeric" as const, month: "short" as const, day: "2-digit" as const };
    return date.toLocaleDateString(undefined, options);
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    if (results.length === 0) {
        return (
            <Container
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h3>No result found</h3>
            </Container>
        );
    }

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="stretch">
            {results.map((result, index) => (
                <Grid key={index} item xs={4} sm={6} md={4} lg={3}>
                    <Link to={`/package/${result.name}/${result.version}`} style={{ textDecoration: "none" }}>
                        <Box display="flex" flexDirection="column">
                            <Paper sx={{ padding: 2, flexGrow: 1 }}>
                                <Typography variant="h6">{result.name}</Typography>
                                <Typography>Author: {result.author}</Typography>
                                <Typography>Last Update: {formatDate(result.date)}</Typography>
                            </Paper>
                        </Box>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default SearchResults;
