import axios from "axios";

export const searchPackages = async (
    searchTerm: string,
    resultsPerPage: number,
    offset: number,
) => {
    try {
        const response = await axios.get(
            `https://registry.npmjs.com/-/v1/search?text=${searchTerm}&size=${resultsPerPage}&from=${offset}`,
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
