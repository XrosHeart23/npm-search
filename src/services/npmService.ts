import axios from "axios";

// const NPM_REGISTRY_URL = "https://registry.npmjs.org";
const NPM_SEARCH_URL = "https://registry.npmjs.com/-/v1/search";

export const searchPackages = async (searchTerm: string, resultsPerPage: number, offset: number) => {
    try {
        const response = await axios.get(NPM_SEARCH_URL, {
            params: {
                text: searchTerm,
                size: resultsPerPage,
                from: offset,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
