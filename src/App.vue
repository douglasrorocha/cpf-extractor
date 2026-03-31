<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { extractCpfs, filterValidCpfs } from "./utils/cpfValidator";
import { getAllUploads, saveUpload } from "./services/databaseService";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  async mounted() {
    // Teste do cpfValidator
    const textoFalso =
      "Aqui tem um CPF 123.456.789-09 e outro inválido 111.111.111-11";
    const encontrados = extractCpfs(textoFalso);
    const validos = filterValidCpfs(encontrados);
    await saveUpload(
      "documento-teste.pdf",
      "http://url-falsa.com",
      ["123.456.789-09"] // CPF já no formato correto com pontos e traço
    );
    console.log("CPFs encontrados:", encontrados);
    console.log("CPFs válidos:", validos);

    // Teste do banco
    const uploads = await getAllUploads();
    console.log("Uploads no banco:", uploads);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
