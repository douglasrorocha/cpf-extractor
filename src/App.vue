<template>
  <div id="app">
    <h1 class="app-title">Extrator de CPFs</h1>

    <PdfUploader :loading="status === 'loading'" @upload="handleUpload" />
    <StatusFeedback :status="status" :message="statusMessage" />

    <div class="lists">
      <CpfList title="CPFs do último upload" :cpfs="latestCpfs" />
      <CpfList title="Todos os CPFs armazenados" :cpfs="allCpfs" />
    </div>
  </div>
</template>

<script>
import PdfUploader from "./components/PdfUploader.vue";
import StatusFeedback from "./components/StatusFeedback.vue";
import CpfList from "./components/CpfList.vue";

import { extractTextFromPdf } from "./services/pdfService";
import { uploadPdf } from "./services/storageService";
import {
  saveUpload,
  getLatestUpload,
  getAllUploads,
} from "./services/databaseService";
import { extractCpfs, filterValidCpfs } from "./utils/cpfValidator";

export default {
  name: "App",
  components: { PdfUploader, StatusFeedback, CpfList },
  data() {
    return {
      status: "idle", // 'idle' | 'loading' | 'success' | 'error'
      statusMessage: "",
      latestCpfs: [],
      allCpfs: [],
    };
  },
  async created() {
    await this.loadData();
  },
  methods: {
    async handleUpload(file) {
      this.status = "loading";
      try {
        // 1. Extrai texto do PDF
        const text = await extractTextFromPdf(file);

        // 2. Extrai e valida CPFs
        console.log("TEXTO EXTRAÍDO:", JSON.stringify(text));
        const found = extractCpfs(text);
        console.log("CPFs ENCONTRADOS:", found);
        const valid = filterValidCpfs(found);
        console.log("CPFs VÁLIDOS:", valid);

        if (valid.length === 0) {
          this.status = "error";
          this.statusMessage = "Nenhum CPF válido encontrado no PDF.";
          return;
        }

        // 3. Faz upload do arquivo
        const { url, fileName } = await uploadPdf(file);

        // 4. Salva no banco
        await saveUpload(fileName, url, valid);

        // 5. Atualiza listas
        await this.loadData();

        this.status = "success";
        this.statusMessage = `${valid.length} CPF(s) extraído(s) e salvos com sucesso!`;
      } catch (err) {
        console.error(err);
        this.status = "error";
        this.statusMessage = "Erro ao processar o PDF. Tente novamente.";
      }
    },

    async loadData() {
      const [latest, all] = await Promise.all([
        getLatestUpload(),
        getAllUploads(),
      ]);

      // CPFs do último upload
      this.latestCpfs = latest?.cpfs ? Object.values(latest.cpfs) : [];

      // Todos os CPFs (sem duplicatas)
      const cpfSet = new Set();
      Object.values(all).forEach((upload) => {
        if (upload.cpfs)
          Object.values(upload.cpfs).forEach((cpf) => cpfSet.add(cpf));
      });
      this.allCpfs = [...cpfSet];
    },
  },
};
</script>

<style lang="scss"></style>
