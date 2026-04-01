<template>
  <div class="cpf-list">
    <h3>{{ title }}</h3>
    <p v-if="cpfs.length === 0" class="empty">Nenhum CPF para exibir.</p>
    <ul v-else>
      <li class="cpf-list" v-for="cpf in cpfs" :key="cpf">{{ cpf }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CpfList",
  props: {
    title: { type: String, required: true },
    cpfs: { type: Array, default: () => [] },
  },
};
</script>

<style></style>
