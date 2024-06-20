let logs = [];
let recording = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "log" && recording) {
    logs.push(message.log);
  } else if (message.type === "startLogs") {
    logs = [];
    recording = true;
    sendResponse();
  } else if (message.type === "stopLogs") {
    recording = false;
    sendResponse();
  } else if (message.type === "exportLogs") {
    sendResponse({ logs });
  } else if (message.type === "getState") {
    sendResponse({ recording });
  }
});

chrome.scripting.registerContentScripts([
  {
    id: "contentScript",
    js: ["content.js"],
    matches: ["<all_urls>"],
  },
]);
