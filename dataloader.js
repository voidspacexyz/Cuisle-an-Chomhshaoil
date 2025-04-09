const SHEET_ID = "113sbgJbvb8fxb_FeqiuI4tMkU5I3U7x1erZBJc5LUu4";
const SHEET_NAME = "MetaData+Copy";

async function loadArchiveData() {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_NAME}`;
    const response = await fetch(url);
    const data = await response.text();
    const jsonData = JSON.parse(data.substring(47).slice(0, -2));

    // Corrected data access - check if jsonData.table exists and has rows
    const rows = jsonData.table?.rows || [];
    const container = document.getElementById("archive-items");
    // container.innerHTML = "";
    rows.forEach((row, i) => {
      // if (!row || i === 0) return; // Skip header row and empty rows

      // Debug the row structure

      // Safely access cell values
      const getCellValue = (index) => row.c?.[index]?.v || "";

      const item = {
        "Title:en": getCellValue(0),
        "Title:ga": getCellValue(1),
        "Description:en": getCellValue(2),
        "Description:ga": getCellValue(3),
        Language: getCellValue(4),
        Creator: getCellValue(5),
        Date: getCellValue(6),
        License: getCellValue(12),
        Format: getCellValue(13),
        Filename: getCellValue(14),
      };

      if (!item["Title:en"] && !item["Filename"]) return; // Skip empty rows
      const mediaUrl = item.Filename;
      const card = document.createElement("div");
      card.dataset.media = encodeURIComponent(item.Filename);
      card.dataset.format = item.Format.toLowerCase();
      card.dataset.metadata = JSON.stringify(item); // Store the entire item object as JSON
      if (item.Format === "audio") {
        card.className = "grid-item audio";
      } else if (item.Format === "video") {
        card.className = "grid-item video";
      } else {
        card.className = "grid-item image";
      }

      card.innerHTML = `<h3>${item["Title:en"] || "Untitled"}</h3>
            <p>${(item["Description:en"] || "").substring(0, 100)}${
        item["Description:en"] && item["Description:en"].length > 100
          ? "..."
          : ""
      }</p>
                    `;
      container.appendChild(card);
    });

    initFormatter();

    // Add event listeners after all cards are created
    document.querySelectorAll(".grid-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        const mediaUrl = decodeURIComponent(this.dataset.media);
        const metadata = JSON.parse(this.dataset.metadata);
        showMediaDetails(mediaUrl, metadata);
      });
    });
  } catch (error) {
    console.error("Error loading data:", error);
    document.getElementById("archive-items").innerHTML = `
                    <div class="alert alert-danger">
                        Error loading archive data. Please try again later.
                    </div>
                `;
  }
}


function getMediaPreview(url) {
  const extension = url.split(".").pop().toLowerCase();
  const lowerFormat = extension.toLowerCase();
  if (["mp3", "wav", "ogg"].includes(lowerFormat)) {
    return `<audio controls class="w-100"><source src="${url}" type="audio/${lowerFormat}"></audio>`;
  } else if (["mp4", "webm", "avi"].includes(lowerFormat)) {
    return `<video controls class="w-100"><source src="${url}" type="video/${lowerFormat}"></video>`;
  } else if (["jpg", "jpeg", "png", "gif"].includes(lowerFormat)) {
    return `<img src="${url}" alt="Preview" class="img-fluid" onerror="this.parentElement.innerHTML='<div class=\\'text-center py-5\\'>Image not available</div>'">`;
  }
  return '<div class="text-center py-5">Preview not available</div>';
}


function showMediaDetails(url, metadata) {
  const mediaDisplay = document.getElementById("mediaDisplay");
  mediaDisplay.innerHTML = getMediaPreview(url);

  const table = document.getElementById("metadataTable");
  table.innerHTML = "";

  Object.entries(metadata).forEach(([key, value]) => {
    if (value) {
      const row = document.createElement("tr");
      row.innerHTML = `<th>${key}</th><td>${value}</td>`;
      table.appendChild(row);
    }
  });

  new bootstrap.Modal(document.getElementById("mediaModal")).show();
}

document.addEventListener("DOMContentLoaded", loadArchiveData);
