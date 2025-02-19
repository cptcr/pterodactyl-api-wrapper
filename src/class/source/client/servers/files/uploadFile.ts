import axios from "axios";

export interface Response {
  object: string;
  attributes: {
    url: string;
  };
}

/**
 * Uploads a file to a server.
 *
 * @param {Object} options - API call options.
 * @param {string} options.apiKey - The API key for authentication.
 * @param {string} options.panel - The base URL of the Pterodactyl panel.
 * @param {string} options.server_id - The ID of the server.
 * @param {FormData} options.file_data - The file data to upload.
 * @returns {Promise<Response>} - API response confirming file upload.
 *
 * @throws {Error} - Throws an error if the API request fails.
 */
export default async function uploadFile(options: {
  apiKey: string;
  panel: string;
  server_id: string;
  file_data: FormData;
}): Promise<Response> {
  const response = await axios.post<Response>(
    `${options.panel}/api/client/servers/${options.server_id}/files/upload`,
    options.file_data,
    {
      headers: {
        "Authorization": `Bearer ${options.apiKey}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}

