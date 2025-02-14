// src/class/main/Setup.ts
var Setup = class {
  /**
   * Sets the global panel URL.
   * @param url - The URL of the Pterodactyl panel.
   */
  static setPanel(url) {
    this.panelUrl = url;
  }
  /**
   * Gets the globally set panel URL.
   * @returns The panel URL.
   * @throws If the panel URL has not been set.
   */
  static getPanel() {
    if (!this.panelUrl) {
      throw new Error("Panel URL is not set. Use Setup.setPanel(url) before making API calls.");
    }
    return this.panelUrl;
  }
};

// src/functions/createAppCall.ts
import axios from "axios";
async function ApplicationAPICall(options) {
  const url = `${options.panel}/api/application/${options.endpoint}`;
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${options.apiKey}`
  };
  let body = void 0;
  if (options.body && options.method !== "GET" && options.method !== "DELETE") {
    body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
  }
  try {
    if (options.method === "PATCH") {
      const response = await axios.patch(url, options.body, { headers });
      return response.data;
    } else {
      const response = await fetch(url, {
        method: options.method,
        headers,
        body
      });
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}: ${await response.text()}`);
      }
      return await response.json();
    }
  } catch (error) {
    throw new Error(`Error in API call: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// src/class/source/app/users/listUsers.ts
async function listUsers(options) {
  const body = {
    servers: options.showLinkedServers ?? false,
    filters: {
      email: options.filters?.email ?? null,
      uuid: options.filters?.uuid ?? null,
      username: options.filters?.username ?? null,
      external_id: options.filters?.external_id ?? null
    },
    sortBy: {
      id: options.sortBy?.id ?? false,
      uuid: options.sortBy?.uuid ?? false
    }
  };
  return ApplicationAPICall({
    panel: options.panel,
    apiKey: options.apiKey,
    endpoint: "users",
    method: "GET",
    body: JSON.stringify(body)
  });
}

// src/class/source/app/users/userDetails.ts
async function userDetails(options) {
  return ApplicationAPICall({
    panel: options.panel,
    apiKey: options.apiKey,
    endpoint: `user/${options.user_id}`,
    method: "GET",
    body: JSON.stringify({ servers: options.listServers ?? false })
    // Ensuring body is a string
  });
}

// src/class/source/app/users/userDetails_externalId.ts
async function userDetailsByExternalIdentifier(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `users/external/${options.external_id}`,
    body: JSON.stringify({ servers: options.listServers ?? false })
    // Ensuring body is a JSON string
  });
}

// src/class/source/app/users/createUser.ts
async function createUser(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "users",
    body: JSON.stringify({
      email: options.user_details.email,
      username: options.user_details.username,
      first_name: options.user_details.first_name ?? "Pterodactyl",
      last_name: options.user_details.last_name ?? "User"
    })
  });
}

// src/class/source/app/users/updateUser.ts
async function updateUser(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    endpoint: `users/${options.user_id}`,
    // Fixed endpoint (removed extra "/")
    method: "PATCH",
    body: JSON.stringify(options.data)
    // Ensured the body is stringified
  });
}

// src/class/source/app/users/deleteUser.ts
async function deleteUser(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: `users/${options.identifier}`
  });
}

// src/class/source/app/nodes/listNodes.ts
async function listNodes(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "nodes"
  });
}

// src/class/source/app/nodes/nodeDetails.ts
async function nodeDetails(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `nodes/${options.node_id}`
  });
}

// src/class/source/app/nodes/nodeConfiguration.ts
async function nodeConfiguration(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `nodes/${options.node_id}/configuration`
  });
}

// src/class/source/app/nodes/createNode.ts
async function createNode(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "nodes",
    body: JSON.stringify(options.node_data)
  });
}

// src/class/source/app/nodes/updateNode.ts
async function updateNode(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PATCH",
    endpoint: `nodes/${options.node_id}`,
    body: JSON.stringify(options.update_data)
  });
}

// src/class/source/app/nodes/deleteNode.ts
async function deleteNode(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: `nodes/${options.node_id}`
  });
}

// src/class/source/app/locations/listLocations.ts
async function listLocations(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "locations"
  });
}

// src/class/source/app/locations/locationDetails.ts
async function locationDetails(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `locations/${options.location_id}`
  });
}

// src/class/source/app/locations/createLocation.ts
async function createLocation(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "locations",
    body: JSON.stringify(options.location_data)
  });
}

// src/class/source/app/locations/updateLocation.ts
async function updateLocation(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PATCH",
    endpoint: `locations/${options.location_id}`,
    body: JSON.stringify(options.update_data)
  });
}

// src/class/source/app/locations/deleteLocation.ts
async function deleteLocation(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: `locations/${options.location_id}`
  });
}

// src/class/source/app/servers/listServers.ts
async function listServers(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "servers"
  });
}

// src/class/source/app/servers/serverDetails.ts
async function serverDetails(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}`
  });
}

// src/class/source/app/servers/serverDetails_externalId.ts
async function serverDetailsExternalIdentifier(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/external/${options.external_id}`
  });
}

// src/class/source/app/servers/updateDetails.ts
async function updateDetails(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PATCH",
    endpoint: `servers/${options.server_id}/details`,
    body: JSON.stringify(options.update_data)
  });
}

// src/class/source/app/servers/updateServerBuild.ts
async function updateServerBuild(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PATCH",
    endpoint: `servers/${options.server_id}/build`,
    body: JSON.stringify(options.build_data)
  });
}

// src/class/source/app/servers/updateServerStartup.ts
async function updateServerStartup(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PATCH",
    endpoint: `servers/${options.server_id}/startup`,
    body: JSON.stringify(options.startup_data)
  });
}

// src/class/source/app/servers/createServer.ts
async function createServer(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "servers",
    body: JSON.stringify(options.server_data)
  });
}

// src/class/source/app/servers/suspendServer.ts
async function suspendServer(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/suspend`
  });
}

// src/class/source/app/servers/unsuspendServer.ts
async function unsuspendServer(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/unsuspend`
  });
}

// src/class/source/app/servers/reinstallServer.ts
async function reinstallServer(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/reinstall`
  });
}

// src/class/source/app/servers/deleteServer.ts
async function deleteServer(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: `servers/${options.server_id}`
  });
}

// src/class/source/app/servers/forceDeleteServer.ts
async function forceDeleteServer(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: `servers/${options.server_id}/force`
  });
}

// src/class/source/app/nests/eggs/listEggs.ts
async function listEggs(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `nests/${options.nest_id}/eggs`
  });
}

// src/class/source/app/nests/eggs/eggDetails.ts
async function eggDetails(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `nests/${options.nest_id}/eggs/${options.egg_id}`
  });
}

// src/class/source/app/nests/listNests.ts
async function listNests(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "nests"
  });
}

// src/class/source/app/nests/nestDetails.ts
async function nestDetails(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `nests/${options.nest_id}`
  });
}

// src/class/main/Application.ts
var Application = class {
  constructor(apiKey) {
    /** User Management */
    this.users = {
      list: () => listUsers({ apiKey: this.apiKey, panel: this.panel }),
      getDetails: (user_id) => userDetails({ apiKey: this.apiKey, panel: this.panel, user_id }),
      getDetailsByExternalId: (external_id) => userDetailsByExternalIdentifier({ apiKey: this.apiKey, panel: this.panel, external_id }),
      create: (user_details) => createUser({ apiKey: this.apiKey, panel: this.panel, user_details }),
      update: (user_id, user_data) => updateUser({ apiKey: this.apiKey, panel: this.panel, user_id: parseInt(user_id), data: user_data }),
      delete: (user_id) => deleteUser({ apiKey: this.apiKey, panel: this.panel, identifier: parseInt(user_id) })
    };
    /** Node Management */
    this.nodes = {
      list: () => listNodes({ apiKey: this.apiKey, panel: this.panel }),
      getDetails: (node_id) => nodeDetails({ apiKey: this.apiKey, panel: this.panel, node_id: parseInt(node_id) }),
      getConfiguration: (node_id) => nodeConfiguration({ apiKey: this.apiKey, panel: this.panel, node_id: parseInt(node_id) }),
      create: (node_data) => createNode({ apiKey: this.apiKey, panel: this.panel, node_data }),
      update: (node_id, node_data) => updateNode({ apiKey: this.apiKey, panel: this.panel, node_id: parseInt(node_id), update_data: node_data }),
      delete: (node_id) => deleteNode({ apiKey: this.apiKey, panel: this.panel, node_id: parseInt(node_id) })
    };
    /** Location Management */
    this.locations = {
      list: () => listLocations({ apiKey: this.apiKey, panel: this.panel }),
      getDetails: (location_id) => locationDetails({ apiKey: this.apiKey, panel: this.panel, location_id: parseInt(location_id) }),
      create: (location_data) => createLocation({ apiKey: this.apiKey, panel: this.panel, location_data }),
      update: (location_id, location_data) => updateLocation({ apiKey: this.apiKey, panel: this.panel, location_id: parseInt(location_id), update_data: location_data }),
      delete: (location_id) => deleteLocation({ apiKey: this.apiKey, panel: this.panel, location_id: parseInt(location_id) })
    };
    /** Server Management */
    this.servers = {
      list: () => listServers({ apiKey: this.apiKey, panel: this.panel }),
      getDetails: (server_id) => serverDetails({ apiKey: this.apiKey, panel: this.panel, server_id }),
      getDetailsByExternalId: (external_id) => serverDetailsExternalIdentifier({ apiKey: this.apiKey, panel: this.panel, external_id }),
      updateDetails: (server_id, update_data) => updateDetails({ apiKey: this.apiKey, panel: this.panel, server_id, update_data }),
      updateBuild: (server_id, build_data) => updateServerBuild({ apiKey: this.apiKey, panel: this.panel, server_id, build_data }),
      updateStartup: (server_id, startup_data) => updateServerStartup({ apiKey: this.apiKey, panel: this.panel, server_id, startup_data }),
      create: (server_data) => createServer({ apiKey: this.apiKey, panel: this.panel, server_data }),
      suspend: (server_id) => suspendServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
      unsuspend: (server_id) => unsuspendServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
      reinstall: (server_id) => reinstallServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
      delete: (server_id) => deleteServer({ apiKey: this.apiKey, panel: this.panel, server_id }),
      forceDelete: (server_id) => forceDeleteServer({ apiKey: this.apiKey, panel: this.panel, server_id })
    };
    /** Nest & Egg Management */
    this.nests = {
      listNests: () => listNests({ apiKey: this.apiKey, panel: this.panel }),
      getNestDetails: (nest_id) => nestDetails({ apiKey: this.apiKey, panel: this.panel, nest_id: parseInt(nest_id) }),
      listEggs: (nest_id) => listEggs({ apiKey: this.apiKey, panel: this.panel, nest_id: parseInt(nest_id) }),
      getEggDetails: (nest_id, egg_id) => eggDetails({ apiKey: this.apiKey, panel: this.panel, nest_id: parseInt(nest_id), egg_id: parseInt(egg_id) })
    };
    this.apiKey = apiKey;
    this.panel = Setup.getPanel();
  }
};

// src/class/source/client/account/accountDetails.ts
async function accountDetails(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "account"
  });
}

// src/class/source/client/account/2faEnable.ts
async function twoFactorEnable(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "account/two-factor",
    body: { codes: options.codes }
  });
}

// src/class/source/client/account/2faDisable.ts
async function twoFactorDisable(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: "account/two-factor",
    body: { tokens: options.tokens }
  });
}

// src/class/source/client/account/updateEmail.ts
async function updateEmail(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PUT",
    endpoint: "account/email",
    body: {
      email: options.email,
      password: options.password
    }
  });
}

// src/class/source/client/account/updatePassword.ts
async function updatePassword(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PUT",
    endpoint: "account/password",
    body: {
      current_password: options.current_password,
      password: options.new_password
    }
  });
}

// src/class/source/client/account/createApiKey.ts
async function createApiKey(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: "account/api-keys",
    body: {
      description: options.description,
      allowed_ips: options.allowed_ips
    }
  });
}

// src/class/source/client/account/deleteApiKey.ts
async function deleteApiKey(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "DELETE",
    endpoint: `account/api-keys/${options.key_id}`
  });
}

// src/class/source/client/account/listApiKeys.ts
async function listApiKeys(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "account/api-keys"
  });
}

// src/class/source/client/listServers.ts
async function listServers2(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: "servers"
  });
}

// src/class/source/client/showPermissions.ts
async function showPermissions(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/permissions`
  });
}

// src/class/source/client/servers/command.ts
async function command(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/command`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    },
    body: JSON.stringify({ command: options.command })
  });
  if (!response.ok) {
    throw new Error(`Failed to send command: ${await response.text()}`);
  }
}

// src/class/source/client/servers/power.ts
async function power(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/power`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    },
    body: JSON.stringify({ signal: options.signal })
  });
  if (!response.ok) {
    throw new Error(`Failed to send power action: ${await response.text()}`);
  }
}

// src/class/source/client/servers/consoleDetails.ts
async function consoleDetails(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/websocket`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch console details: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/resources.ts
async function resources(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/resources`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch server resources: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/serverDetails.ts
async function serverDetails2(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch server details: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/files/listFiles.ts
async function listFiles(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/files/list${options.directory ? `?directory=${options.directory}` : ""}`
  });
}

// src/class/source/client/servers/files/getFileContent.ts
async function getFileContent(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/files/contents?file=${encodeURIComponent(options.file_path)}`
  });
}

// src/class/source/client/servers/files/downloadFile.ts
async function downloadFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "GET",
    endpoint: `servers/${options.server_id}/files/download?file=${encodeURIComponent(options.file_path)}`
  });
}

// src/class/source/client/servers/files/renameFile.ts
async function renameFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "PUT",
    endpoint: `servers/${options.server_id}/files/rename`,
    body: JSON.stringify({ files: options.files })
  });
}

// src/class/source/client/servers/files/copyFile.ts
async function copyFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/copy`,
    body: JSON.stringify({ location: options.file_path })
  });
}

// src/class/source/client/servers/files/writeFile.ts
async function writeFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/write`,
    body: JSON.stringify({
      file: options.file_path,
      contents: options.content
    })
  });
}

// src/class/source/client/servers/files/compressFile.ts
async function compressFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/compress`,
    body: JSON.stringify({ files: options.files })
  });
}

// src/class/source/client/servers/files/decompressFile.ts
async function decompressFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/decompress`,
    body: JSON.stringify({ file: options.file_path })
  });
}

// src/class/source/client/servers/files/deleteFile.ts
async function deleteFile(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/delete`,
    body: JSON.stringify({ files: options.files })
  });
}

// src/class/source/client/servers/files/createFolder.ts
async function createFolder(options) {
  return ApplicationAPICall({
    apiKey: options.apiKey,
    panel: options.panel,
    method: "POST",
    endpoint: `servers/${options.server_id}/files/create-folder`,
    body: JSON.stringify({ name: options.folder_path })
  });
}

// src/class/source/client/servers/files/uploadFile.ts
import axios2 from "axios";
async function uploadFile(options) {
  return axios2.post(`${options.panel}/api/client/servers/${options.server_id}/files/upload`, options.file_data, {
    headers: {
      "Authorization": `Bearer ${options.apiKey}`,
      "Content-Type": "multipart/form-data"
    }
  });
}

// src/class/source/client/servers/schedules/listSchedules.ts
async function listSchedules(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch schedules: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/schedules/createSchedule.ts
async function createSchedule(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    },
    body: JSON.stringify(options.schedule_data)
  });
  if (!response.ok) {
    throw new Error(`Failed to create schedule: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/schedules/scheduleDetails.ts
async function scheduleDetails(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch schedule details: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/schedules/updateSchedule.ts
async function updateSchedule(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    },
    body: JSON.stringify(options.schedule_data)
  });
  if (!response.ok) {
    throw new Error(`Failed to update schedule: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/schedules/deleteSchedule.ts
async function deleteSchedule(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to delete schedule: ${await response.text()}`);
  }
}

// src/class/source/client/servers/schedules/createTask.ts
async function createTask(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}/tasks`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    },
    body: JSON.stringify(options.task_data)
  });
  if (!response.ok) {
    throw new Error(`Failed to create task: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/schedules/updateTask.ts
async function updateTask(options) {
  const { apiKey, panel, server_id, schedule_id, task_id, ...task_data } = options;
  const response = await fetch(`${panel}/api/client/servers/${server_id}/schedules/${schedule_id}/tasks/${task_id}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(task_data)
  });
  if (!response.ok) {
    throw new Error(`Failed to update task: ${await response.text()}`);
  }
  return await response.json();
}

// src/class/source/client/servers/schedules/deleteTask.ts
async function deleteTask(options) {
  const response = await fetch(`${options.panel}/api/client/servers/${options.server_id}/schedules/${options.schedule_id}/tasks/${options.task_id}`, {
    method: "DELETE",
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${options.apiKey}`
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to delete task: ${await response.text()}`);
  }
}

// src/class/main/Client.ts
var Client = class {
  constructor(apiKey) {
    /** Account Management */
    this.account = {
      getDetails: () => accountDetails({ apiKey: this.apiKey, panel: this.panel }),
      enable2FA: (codes) => twoFactorEnable({ apiKey: this.apiKey, panel: this.panel, codes }),
      disable2FA: (tokens) => twoFactorDisable({ apiKey: this.apiKey, panel: this.panel, tokens }),
      updateEmail: (email, password) => updateEmail({ apiKey: this.apiKey, panel: this.panel, email, password }),
      updatePassword: (current_password, new_password) => updatePassword({ apiKey: this.apiKey, panel: this.panel, current_password, new_password }),
      createApiKey: (description, allowed_ips) => createApiKey({ apiKey: this.apiKey, panel: this.panel, description, allowed_ips }),
      deleteApiKey: (key_id) => deleteApiKey({ apiKey: this.apiKey, panel: this.panel, key_id }),
      listApiKeys: () => listApiKeys({ apiKey: this.apiKey, panel: this.panel })
    };
    /** Server Management */
    this.servers = {
      list: () => listServers2({ apiKey: this.apiKey, panel: this.panel }),
      showPermissions: (server_id) => showPermissions({ apiKey: this.apiKey, panel: this.panel, server_id }),
      sendCommand: (server_id, commandStr) => command({ apiKey: this.apiKey, panel: this.panel, server_id, command: commandStr }),
      powerAction: (server_id, signal) => power({ apiKey: this.apiKey, panel: this.panel, server_id, signal }),
      getConsoleDetails: (server_id) => consoleDetails({ apiKey: this.apiKey, panel: this.panel, server_id }),
      getResources: (server_id) => resources({ apiKey: this.apiKey, panel: this.panel, server_id }),
      getDetails: (server_id) => serverDetails2({ apiKey: this.apiKey, panel: this.panel, server_id })
    };
    /** File Management */
    this.files = {
      list: (server_id, directory) => listFiles({ apiKey: this.apiKey, panel: this.panel, server_id, directory }),
      getContent: (server_id, file_path) => getFileContent({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
      download: (server_id, file_path) => downloadFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
      rename: (server_id, from, to) => renameFile({ apiKey: this.apiKey, panel: this.panel, server_id, files: [{ from, to }] }),
      copy: (server_id, file_path) => copyFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
      write: (server_id, file_path, content) => writeFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path, content }),
      compress: (server_id, files) => compressFile({ apiKey: this.apiKey, panel: this.panel, server_id, files }),
      decompress: (server_id, file_path) => decompressFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_path }),
      delete: (server_id, files) => deleteFile({ apiKey: this.apiKey, panel: this.panel, server_id, files }),
      createFolder: (server_id, folder_path) => createFolder({ apiKey: this.apiKey, panel: this.panel, server_id, folder_path }),
      upload: (server_id, file_data) => uploadFile({ apiKey: this.apiKey, panel: this.panel, server_id, file_data })
    };
    /** Schedule Management */
    this.schedules = {
      list: (server_id) => listSchedules({ apiKey: this.apiKey, panel: this.panel, server_id }),
      createSchedule: (server_id, schedule_data) => createSchedule({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_data }),
      scheduleDetails: (server_id, schedule_id) => scheduleDetails({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id }),
      updateSchedule: (server_id, schedule_id, schedule_data) => updateSchedule({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id, schedule_data }),
      deleteSchedule: (server_id, schedule_id) => deleteSchedule({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id }),
      createTask: (server_id, schedule_id, task_data) => createTask({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id, task_data }),
      updateTask: (server_id, schedule_id, task_id, task_data) => updateTask({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id, task_id, task_data }),
      deleteTask: (server_id, schedule_id, task_id) => deleteTask({ apiKey: this.apiKey, panel: this.panel, server_id, schedule_id, task_id })
    };
    this.apiKey = apiKey;
    this.panel = Setup.getPanel();
  }
};

// src/index.ts
var index_default = {
  Application,
  Client,
  Setup
};
export {
  index_default as default
};
//# sourceMappingURL=index.mjs.map