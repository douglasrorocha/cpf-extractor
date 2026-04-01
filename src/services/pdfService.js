import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Worker carregado da pasta public (evita problemas com webpack)
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    fullText += content.items.map((item) => item.str).join(" ") + " ";
  }

  return fullText;
}
