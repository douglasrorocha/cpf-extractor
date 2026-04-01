<template>
  <div class="feedback" v-if="status !== 'idle'" :class="['feedback', status]">
    <span v-if="status === 'loading'">
      <i class="fa-solid fa-spinner fa-spin"></i> Processando...
    </span>
    <span v-else-if="status === 'success'">
      <i class="fa-solid fa-check"></i> {{ message }}
    </span>
    <span v-else-if="status === 'error'">❌ {{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "StatusFeedback",
  props: {
    status: { type: String, default: "idle" }, // 'idle' | 'loading' | 'success' | 'error'
    message: { type: String, default: "" },
  },
};
</script>

<style></style>
