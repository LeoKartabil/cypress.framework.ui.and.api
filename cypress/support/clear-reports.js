const fs = require("fs");
const path = require("path");

const clearDirectory = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

clearDirectory("reports/mochawesome-report");
clearDirectory("reports/screenshots");