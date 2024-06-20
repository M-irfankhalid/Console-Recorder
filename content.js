const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

function sendLogToBackground(logType, ...args) {
  chrome.runtime.sendMessage({ type: "log", log: `[${logType}] ${args.join(" ")}` });
}

console.log = function(...args) {
  originalConsoleLog.apply(console, args);
  sendLogToBackground("log", ...args);
};

console.warn = function(...args) {
  originalConsoleWarn.apply(console, args);
  sendLogToBackground("warn", ...args);
};

console.error = function(...args) {
  originalConsoleError.apply(console, args);
  sendLogToBackground("error", ...args);
};

console.log("Console logger initialized");
