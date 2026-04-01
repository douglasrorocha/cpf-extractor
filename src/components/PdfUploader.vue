<template>
  <div class="uploader">
    <label class="drop-area" @dragover.prevent @drop.prevent="onDrop">
      <input
        type="file"
        accept=".pdf"
        @change="onFileChange"
        ref="input"
        style="display: none"
      />
      <i class="fa-solid fa-file-pdf"></i>
      <span v-if="file">{{ file.name }}</span>
      <span v-else class="input-document"
        >Arraste um PDF aqui ou clique para selecionar</span
      >
    </label>
    <i v-if="file" class="fa-solid fa-trash btn-remove" @click="removeFile">
      Deletar arquivo
    </i>
    <i
      class="fa-solid fa-file-arrow-up file"
      :class="{ disabled: !file || loading }"
      @click="file && !loading && $emit('upload', file)"
      :title="loading ? 'Enviando...' : 'Enviar PDF'"
    >
      Enviar PDF
    </i>
  </div>
</template>

<script>
export default {
  name: "PdfUploader",
  props: {
    loading: { type: Boolean, default: false },
  },
  data() {
    return { file: null };
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0] || null;
    },
    onDrop(e) {
      const dropped = e.dataTransfer.files[0];
      if (dropped?.type === "application/pdf") this.file = dropped;
    },
    removeFile() {
      this.file = null;
      this.$refs.input.value = "";
    },
  },
};
</script>

<style></style>
