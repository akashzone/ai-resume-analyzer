const fs = require("fs/promises");
const pdfParse = require("pdf-parse");

async function extractTextFromPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  console.log();
  const result = await pdfParse(dataBuffer);
  const text = result.text;
  console.log("Extracted Text :", text);
  return text;
}

module.exports = extractTextFromPDF;
