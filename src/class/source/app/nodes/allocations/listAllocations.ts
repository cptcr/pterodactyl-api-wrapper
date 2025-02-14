import ApplicationAPICall from "../../../../../functions/createAppCall";

/**
 * Retrieves a list of all allocations on a specific node.
 * 
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {number} options.node_id - The ID of the node whose allocations should be retrieved.
 * @returns {Promise<any>} - API response containing the list of allocations.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function listAllocations(options: { 
    apiKey: string; 
    panel: string; 
    node_id: number; 
}): Promise<any> {
    return ApplicationAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "GET",
        endpoint: `nodes/${options.node_id}/allocations`
    });
}
