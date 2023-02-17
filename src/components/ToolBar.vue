<template>
  <div class="button-menu">
    <button class="button" :class="isSorting ? 'pause' : ''" @click="play"></button>
    &emsp;|&emsp;
    <label for="speedOpt">Simulation Speed:</label>&emsp;
    <select :value="currentSpeed" @change="onSpeedChange" class="select-dropdown" id="speedOpt" :disabled="isSorting">
      <option v-for="opt in speedOptions" :value="opt.value" :key="opt.value">{{ opt.name }}</option>
    </select>
  </div>
</template>

<script>
import {store} from "@/store/store";

export default {
  name: "ToolBar",
  computed: {
    isSorting() {
      return store.state.isSorting;
    },
    currentSpeed() {
      return store.state.simulationSpeed;
    }
  },
  methods: {
    onSpeedChange(e) {
      store.state.simulationSpeed = e.target.value;
    },
    play() {
      store.state.isSorting = !store.state.isSorting;
      if (store.state.isSorting) {
        this.emitter.emit('start-sort', {});
      } else {
        this.emitter.emit('stop-sort', {});
      }
    },
  },
  data() {
    return {
      speedOptions: [
        {name: "x0.1", value: 0.1},
        {name: "x0.25", value: 0.25},
        {name: "x0.5", value: 0.5},
        {name: "x0.75", value: 0.75},
        {name: "Normal", value: 1},
        {name: "x1.5", value: 1.5},
        {name: "x2", value: 2},
        {name: "x4", value: 4},
        {name: "x10", value: 10},
      ]
    }
  },
}
</script>

<style scoped>
.button-menu {
  display: flex;
  align-items: center;
  background-color: #333232;
  padding: 10px 20px;
  color: #dad9d9;
}
.button {
  width: 20px;
  height: 20px;
  border-style: solid;
  border-width: 10px 0 10px 20px;
  box-sizing: border-box;
  border-color: transparent transparent transparent #499754;
  transition: all 100ms ease-in-out;
  background-color: transparent;
  cursor: pointer;
}

.button:hover {
  border-color: transparent transparent transparent #2d7236;
}

.pause {
  border-color: transparent transparent transparent #e34b4b;
  border-style: double;
  border-width: 0 0 0 16px;
}

.pause:hover {
  border-color: transparent transparent transparent #a83535;
}

.select-dropdown,
.select-dropdown * {
  margin: 0;
  padding: 0;
  position: relative;
  box-sizing: border-box;
}
.select-dropdown {
  position: relative;
  background-color: #dad9d9;
  border-radius: 4px;
  color: #333232;
  font-weight: bolder;
}
.select-dropdown select {
  font-size: 1rem;
  font-weight: normal;
  max-width: 100%;
  padding: 8px 24px 8px 10px;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.select-dropdown select:active, .select-dropdown select:focus {
  outline: none;
  box-shadow: none;
}
.select-dropdown:after {
  content: "";
  position: absolute;
  top: 50%;
  right: 8px;
  width: 0;
  height: 0;
  margin-top: -2px;
  border-top: 5px solid #aaa;
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
}
</style>
