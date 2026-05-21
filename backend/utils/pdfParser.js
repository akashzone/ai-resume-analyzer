const fs = require("fs/promises");
const pdfParse = require("pdf-parse");

async function extractTextFromPDF(filePath) {
  const dataBuffer = await fs.readFile(filePath);
  const result = await pdfParse(dataBuffer);
  const text = result.text;
  return text;
}

module.exports = extractTextFromPDF;
