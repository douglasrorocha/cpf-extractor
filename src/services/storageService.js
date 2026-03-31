import { storage } from "./firebase";

export async function uploadPdf(file) {
  const timestamp = Date.now(); // Cria o Identificador único através dos milisegundos
  const fileName = `pdfs/${timestamp}_${file.name}`; // Cria o caminho e o nome do arquivo, com os milisegundos + o nome do upload
  const ref = storage.ref(fileName); // Cria a referencia apontando onde o arquivo vai ficar no storage

  await ref.put(file);
  const url = await ref.getDownloadURL(); // Cria a URL pública para acessar o arquivo

  return { url, fileName: file.name }; // Cria o objeto que retorna o nome do arquivo
}
