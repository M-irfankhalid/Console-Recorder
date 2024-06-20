document.getElementById("startLogs").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "startLogs" }, () => {
    document.getElementById("startLogs").disabled = true;
    document.getElementById("stopLogs").disabled = false;
    document.getElementById("exportLogs").disabled = false;
  });
});

document.getElementById("stopLogs").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "stopLogs" }, () => {
    document.getElementById("startLogs").disabled = false;
    document.getElementById("stopLogs").disabled = true;
  });
});

document.getElementById("exportLogs").addEventListener("click", () => {
  chrome.runtime.sendMessage({ type: "exportLogs" }, (response) => {
    const logs = response.logs;
    const csvContent = "data:text/csv;charset=utf-8," + logs.map(log => log.replace(/,/g, ";")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "console_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

// Check logging state on popup load
chrome.runtime.sendMessage({ type: "getState" }, (response) => {
  if (response.recording) {
    document.getElementById("startLogs").disabled = true;
    document.getElementById("stopLogs").disabled = false;
    document.getElementById("exportLogs").disabled = false;
  }
});
