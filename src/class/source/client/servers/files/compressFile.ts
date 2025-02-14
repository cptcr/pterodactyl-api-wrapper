import ClientAPICall from "../../../../../functions/createAppCall";

/**
 * Compresses files or directories on a server into a ZIP archive.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {string[]} options.files - An array of files or directories to compress.
 * @returns {Promise<any>} - API response confirming compression.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function compressFile(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    files: string[];
}): Promise<any> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/files/compress`,
        body: JSON.stringify({ files: options.files })
    });
}
