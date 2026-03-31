import { db } from "./firebase";

// Salva um upload com seus CPFs válidos
export async function saveUpload(fileName, storageUrl, cpfs) {
  const uploadRef = db.ref("uploads").push(); // Aponta para o nó uploads no db (pasta) e cria um novo registro no push (custumer)

  const cpfsMap = {};
  cpfs.forEach((cpf) => {
    cpfsMap[cpf.replace(/\D/g, "")] = cpf; //Remove a formatação do CPF
  });
  // Salva o objeto no db
  await uploadRef.set({
    fileName,
    storageUrl,
    uploadedAt: Date.now(),
    cpfs: cpfsMap,
  });

  return uploadRef.key; // retorna o ID gerado (custumer)
}

// Busca todos os uploads (para listar CPFs históricos)
export async function getAllUploads() {
  const snapshot = await db.ref("uploads").once("value"); // Aponta para a pasta de uploads e faz uma leitura única( não fica monitorando )
  return snapshot.val() || {}; // Extrai os dados do objeto do firebase
}

// Busca o upload mais recente
export async function getLatestUpload() {
  const snapshot = await db
    .ref("uploads")
    .orderByChild("uploadedAt") // Ordena todos os uploads
    .limitToLast(1) // Pega apenas o último da lista gerada
    .once("value"); //leitura única

  const val = snapshot.val(); // Retorna nulo se o banco estiver vázio
  if (!val) return null;

  const key = Object.keys(val)[0]; // Descobre o valor da key
  return { id: key, ...val[key] }; //retorna o objeto gerado no firebase
}
