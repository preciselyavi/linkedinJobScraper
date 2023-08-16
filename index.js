const form = document.getElementById("job-form");
const statusDiv = document.getElementById("status");
// const APIurl = "https://linkedinjobscraper.azurewebsites.net";
// const APIurl = "http://localhost:8000";
const APIurl = 'http://172.178.105.46:8000';
// const APIurl = "linkedinjobscraper.eastus.cloudapp.azure.com";

form.addEventListener("submit", async (e) => {  
  e.preventDefault();
  const formData = new FormData(form);
  const requestBody = {};

  formData.forEach((value, key) => {
    if (key === "companyList") {
      requestBody[key] = convertToList(value);
    } else {
      requestBody[key] = value;
    }
  });

  try {
    statusDiv.textContent = "Please wait Scraping...";
    // console.log(requestBody);
    const response = await fetch(`${APIurl}/getJobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    statusDiv.textContent = "Scraping...";
    
    const data = await response.json();
    
    console.log(data);

    if (response.ok) {
      statusDiv.textContent = `Success! Scraped ${data.length} jobs Airtable Updated! `;
    
    } else {
      statusDiv.textContent = data.message || "Error scraping jobs";
    }
  } catch (error) {
    statusDiv.textContent = "Error: " + error.message;
  }
});

function convertToList(input) {
  if (input !== "") {
    const companies = input.split("\n").map((company) => company.trim());
    return companies.filter((company) => company !== "").join(",");
  }
  return "";
}
