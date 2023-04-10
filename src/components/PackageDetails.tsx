import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchPackage } from "../services/npmService";
import Loading from "./Loading";
import { Box, Container, IconButton, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { ArrowBack } from "@mui/icons-material";

export default function PackageDetails() {
    const { packageName } = useParams();
    const [packageDetails, setPackageDetails] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPackageDetails = async () => {
            try {
                const data = await searchPackage(packageName as string);
                setPackageDetails(data);
            } catch (error) {
                console.error("Failed to fetch package details", error);
            }
        };

        fetchPackageDetails();
    }, [packageName]);

    const handleGoBack = () => {
        navigate(-1);
    };

    if (!packageDetails) {
        return <Loading />;
    }

    const packageVersion = packageDetails["dist-tags"].latest;
    const packageDate = formatDate(packageDetails.time[packageVersion]);
    const packageVersionDetail = packageDetails.versions[packageVersion];

    function getReadMe() {
        if (packageVersionDetail.readme == null) {
            return "No readme found";
        }
        return packageVersionDetail.readme;
    }

    // Display package details
    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: "10%", position: "relative" }}>
                <IconButton sx={{ position: "absolute", top: 0, left: 0, marginTop: "10px" }} onClick={handleGoBack}>
                    <ArrowBack />
                </IconButton>
                <Typography variant="h2" sx={{ textAlign: "center" }}>
                    {packageDetails.name}
                </Typography>
            </Box>
            <hr />
            <Typography>Author: {packageVersionDetail._npmUser.name}</Typography>
            <Typography>Version: {packageVersion}</Typography>
            <Typography>Last Update: {packageDate}</Typography>
            <Typography>Description: {packageDetails.description}</Typography>
            <Typography>License: {packageDetails.license}</Typography>
            <hr />

            <Typography variant="h4" textAlign="center">
                Read Me
            </Typography>
            <ReactMarkdown>{getReadMe()}</ReactMarkdown>
        </Container>
    );
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options = { year: "numeric" as const, month: "short" as const, day: "2-digit" as const };
    return date.toLocaleDateString(undefined, options);
}
