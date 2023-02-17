<template>
  <div :class="`sort-area-${state}`" class="sort-area" ref="sort-area">
    <ArrayElement v-for="element in arrayElement" :key="element.index" :element="element" class="array-element"
                  :style="state === 'simulate' ? {left: element.index * 70 + margin + 'px', transition: `${0.6/speed}s ease-out`} : {order: element.index, transition: `margin ${0.5/speed}s ease-in-out`}"
                  :class="`array-element-${state}`" ref="arr-items"></ArrayElement>
  </div>
</template>

<script>
import ArrayElement from "@/components/ArrayElement";
import {store} from "@/store/store";

export default {
  name: "SortArea",
  components: {ArrayElement},
  mounted() {
    this.emitter.on("start-sort", () => {
      this.resetArray();
      this.startInsertionSort();
    });
    this.emitter.on("stop-sort", () => {
      this.swapEditState();
    });
  },
  data() {
    return {
      arrayElement: store.state.sortArrayElements,
      state: 'editing'
    }
  },
  computed: {
    length() {
      return store.state.sortArrayLength;
    },
    margin() {
      return (this.$refs['sort-area'].offsetWidth - (this.length * 70)) / 2;
    },
    speed() {
      return store.state.simulationSpeed;
    },
    isSorting() {
      return store.state.isSorting;
    }
  },
  methods: {
    swapEditState() {
      this.state = this.state === 'editing' ? 'simulate' : 'editing';
    },
    delay(time) {
      if (this.isSorting)
        return new Promise(resolve => setTimeout(resolve, time/this.speed));
    },
    swapArrayElements: async function(idx1, idx2) {
      await this.delay(500);
      store.state.currentLine = 3;
      await this.delay(500);
      store.state.currentLine = 4;
      await this.delay(500);
      store.state.currentLine = 5;
      let tmp = this.arrayElement[idx1];
      store.state.temp = this.arrayElement[idx1].value;
      this.arrayElement[idx1] = this.arrayElement[idx2];
      this.arrayElement[idx2] = tmp;
      store.commit('swapArrayElements', {idx1, idx2});
    },
    resetArray() {
      this.$refs['arr-items'].forEach(el => {
        el.$el.style.backgroundColor = "transparent";
        el.$el.style.transform = 'translateY(0px)';
      })
      store.state.currentLine = -1;
    },
    startInsertionSort: async function () {
      store.state.isSorting = true;
      this.swapEditState();
      const arrItems = this.$refs['arr-items'];
      await this.delay(1000);

      store.state.currentLine = 0;
      for (let i = 0; i < this.length - 1; i++) {
        store.state.i = i;
        const el1 = arrItems[i].$el;
        el1.style.backgroundColor = '#538c3e';
        for (let j = i + 1; j < this.length; j++) {
          await this.delay(500);
          store.state.currentLine = 1;
          store.state.j = j;
          if (!this.isSorting) {
            this.resetArray();
            return;
          }
          const el2 = arrItems[j].$el;
          el1.style.transform = 'translateY(60px)';
          await this.delay(1000);
          el2.style.transform = 'translateY(60px)';
          el2.style.backgroundColor = '#6593b5';

          store.state.currentLine = 2;
          if (this.arrayElement[i].value > this.arrayElement[j].value) {
            await this.swapArrayElements(i, j);
          }
          await this.delay(1000);
          el2.style.transform = 'translateY(0px)';
          el2.style.backgroundColor = 'transparent';
          await this.delay(1000);
        }
        el1.style.transform = 'translateY(0px)';
        el1.style.backgroundColor = '#FFD700';
      }
      arrItems[arrItems.length-1].$el.style.backgroundColor = '#FFD700';
      this.swapEditState();
      store.state.isSorting = false;
    }
  }
}
</script>

<style scoped>

.sort-area {
  margin: auto;
  background-color: #2c3e50;
  min-height: 150px;
  padding: 20px;
  border-radius: 20px 20px 0 0;
}

.sort-area-simulate {
  position: relative;
}

.sort-area-editing {
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 10px;
}

.array-element-simulate {
  position: absolute;
}

.array-element-editing {
  margin-top: 40px;
}
</style>
