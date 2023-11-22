<template>
  <div :style="colorStyle">
    <b class="cardelement">{{ number }}</b>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: ['color', 'number'],
  setup(props) {
    const colorStyle = computed(() => {
      return props.color ? { backgroundColor: props.color } : {}
    })

    return {colorStyle}
  }
}
</script>

<style scoped>
  .cardelement{
    font-size: 8rem; 
    color: rgb(181, 170, 170);
    max-height: 100%;
    height: auto;
  }
</style>