<template>
  <div class="code-area">
    <p class="array-line">
      <span class="variable">var</span> array = [
      <span v-for="{index, value} in elements" :key="index">
        <input type="number" :disabled="isSorting"
               :name="'array-el-' + index" :id="'array-el-' + index" class="array-element-input" :value="value"
               @change="arrayChanged($event, index)" min="0" max="99">
          <sup v-show="!isSorting" class="close-btn" @click="deleteLatArrayElement(index)">x</sup>
        </span>
      ];
      <span v-show="length < 10 && !isSorting" class="plus-btn" @click="addArrayElement">+</span>
    </p>
    <br>
    <slot></slot>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "CodeArea",
  emits: ["arrayUpdate"],
  data() {
    return {
      elements: store.state.sortArrayElements,
    }
  },
  computed: {
    length() {
      return store.state.sortArrayLength;
    },
    isSorting() {
      return store.state.isSorting;
    }
  },
  methods: {
    onSpeedChange(e) {
      store.state.simulationSpeed = e.target.value;
    },
    addArrayElement() {
      store.commit('pushSortArrayElement');
    },
    deleteLatArrayElement(index) {
      store.commit('removeSortArrayElement', index);
    },
    arrayChanged(event, index) {
      const target = event.target;
      if (target.value > 99) target.value = 99;
      else if (target.value < 0) target.value = 0;

      store.commit('updateSortArrayElementValue', {index, value: +target.value});
    },
  }
}
</script>

<style scoped>
.code-area {
  margin: auto;
  background-color: #444444;
  min-height: 300px;
  max-height: 500px;
  overflow: scroll;
  padding: 20px;
  color: #dad9d9;
  font-weight: bold;
  text-align: start;
  border-radius: 0 0 20px 20px;
  position: relative;
}

.array-element-input {
  width: 25px;
  margin-inline-start: 5px;
  background-color: #444444;
  color: #dad9d9;
  text-align: center;
  font-weight: bold;
  border: solid 1px #dad9d9;
}

.plus-btn {
  color: #dfb767;
  font-weight: bolder;
  margin-inline: 10px;
  cursor: pointer;
}

.plus-btn:hover {
  color: darkslategrey;
}

.close-btn {
  color: #b61a1a;
  font-weight: bolder;
  margin-left: -5px;
  cursor: pointer;
  background-color: #444444;
  height: 5px;
  border-radius: 25%;
  padding-inline: 3px;
}

.close-btn:hover {
  color: #7e1616;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.variable {
  color: #dfb767;
}
</style>
