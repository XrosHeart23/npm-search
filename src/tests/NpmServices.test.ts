import { searchPackage, searchPackages } from "../services/npmService";

describe("npmService", () => {
    it("searching for a list of known package should return more than 0", async () => {
        const results = await searchPackages("react", 10, 1);
        expect(results.total).toBeGreaterThan(0);
    });

    it("searching for unknown package should return 0", async () => {
        const results = await searchPackages("thispackagedoesnotexist", 10, 1);
        expect(results.total).toEqual(0);
    });

    it("searching for specific package should return an list of data", async () => {
        let packageName = "react";
        const results = await searchPackage(packageName);
        expect(results.name).toEqual(packageName);
    });

    it("should throw an error when the package is not found", async () => {
        await expect(searchPackage("nonexistentpackage")).rejects.toThrow();
    });
});
