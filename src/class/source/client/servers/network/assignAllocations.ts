import ClientAPICall from "../../../../../functions/createAppCall";

export interface Response {
    object: string;
    attributes: {
      id: number;
      ip: string;
      ip_alias: string | null;
      port: number;
      notes: string | null;
      is_default: boolean;
    };
  }

  
/**
 * Assigns a new allocation to a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {number} options.allocation_id - The ID of the allocation to assign.
 * @returns {Promise<Response>} - API response confirming allocation assignment.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function assignAllocations(options: { 
    apiKey: string; 
    panel: string; 
    server_id: string;
    allocation_id: number;
}): Promise<Response> {
    return ClientAPICall({
        apiKey: options.apiKey,
        panel: options.panel,
        method: "POST",
        endpoint: `servers/${options.server_id}/network/allocations`,
        body: JSON.stringify({ allocation_id: options.allocation_id })
    });
}
