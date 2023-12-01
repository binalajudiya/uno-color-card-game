<template>
  <div :style="colorStyle">
    <b class="cardelement" v-if="number">{{ number }}</b>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: ['color', 'number'],
  setup(props) {
    const colorStyle = computed(() => {
      return props.color ? { background: props.color } : {}
    })

    return { colorStyle }
  }
}
</script>

<style scoped>
.cardelement {
  font-size: 3rem;
  color: rgb(72 62 62);
  background: rgb(255 255 255 / 51%);
  height: 60px;
  width: 60px;
  border-radius: 50%;
  line-height: 65px;
}

.cardselement {
  font-size: 1rem;
}
</style>