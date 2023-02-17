<template>
  <div class="array-element">
    <h2 class="element-text">{{element.value}}</h2>
    <sup class="element-text-index">{{element.index}}</sup>
  </div>
</template>

<script>
export default {
  name: "ArrayElement",
  props: ['element']
}
</script>

<style scoped>
.array-element {
  border: white 3px solid;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.element-text {
  color: white;
  width: 80%;
  font-size: 2vw;
  overflow: hidden;
}
.element-text-index {
  color: #2c3e50;
  background-color: white;
  padding-inline: 5px;
  border-radius: 25%;
  font-weight: bolder;
  font-size: 1vw;
  position: absolute;
  bottom: -8px;
}
</style>
