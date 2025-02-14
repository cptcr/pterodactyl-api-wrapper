import ApplicationAPICall from "../../../../functions/createAppCall";

/**
 * Retrieves the configuration settings of a specific node.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.node_id - The ID of the node whose configuration is requested.
 * @returns {Promise<any>} - API response containing the node configuration.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function nodeConfiguration(options: { 
    apiKey: string; 
    panel: string; 
    node_id: number; 
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nodes/${options.node_id}/configuration`
    });
}
