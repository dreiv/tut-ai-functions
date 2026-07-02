const API_BASE_URL = "/api";

const btnHome = document.getElementById("btn-home") as HTMLButtonElement;
const btnTest = document.getElementById("btn-test") as HTMLButtonElement;
const btnData = document.getElementById("btn-data") as HTMLButtonElement;
const btnStats = document.getElementById("btn-stats") as HTMLButtonElement;
const statusDiv = document.getElementById("status") as HTMLDivElement;

/**
 * Helper function to handle standard API fetch operations
 */
async function triggerApiCall(endpoint: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.text();
}

/**
 * Helper function to handle parsing and pretty-printing JSON data
 */
function displayFormattedJson(rawText: string, successMessage: string) {
  try {
    const parsedData = JSON.parse(rawText);
    statusDiv.textContent = `${successMessage}\n\n${JSON.stringify(parsedData, null, 2)}`;
  } catch {
    statusDiv.textContent = `${successMessage}\n\n${rawText}`;
  }
}

btnHome.addEventListener("click", async () => {
  statusDiv.textContent = "Fetching welcome message...";
  try {
    const data = await triggerApiCall("");
    statusDiv.textContent = `Success!\n\n${data}`;
  } catch (error) {
    statusDiv.textContent = `Error: ${error}`;
  }
});

btnTest.addEventListener("click", async () => {
  statusDiv.textContent = "Running verification test...";
  try {
    const data = await triggerApiCall("/test");
    statusDiv.textContent = `Success!\n\n${data}`;
  } catch (error) {
    statusDiv.textContent = `Error: ${error}`;
  }
});

btnData.addEventListener("click", async () => {
  statusDiv.textContent = "Requesting users list...";
  try {
    const data = await triggerApiCall("/data");
    displayFormattedJson(data, "Success! Retrieved Mock Users:");
  } catch (error) {
    statusDiv.textContent = `Error: ${error}`;
  }
});

btnStats.addEventListener("click", async () => {
  statusDiv.textContent = "Requesting system metrics...";
  try {
    const data = await triggerApiCall("/stats");
    displayFormattedJson(data, "Success! Current Server Diagnostics:");
  } catch (error) {
    statusDiv.textContent = `Error: ${error}`;
  }
});
