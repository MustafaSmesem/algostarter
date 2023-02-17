<template>
  <p :class="currentLine===0?'active':''">
    <span class="operator">for</span> ( <span class="type">let</span> <span class="i-pointer">i</span> = <span class="number">0</span>; <span class="i-pointer">i</span> &lt; array.<span class="element">length</span> - <span class="number">1</span>; <span class="i-pointer">i</span>++ ) {
    <span class="comment">&emsp;//&emsp;<span class="i-pointer">i</span> = <span :class="undefinedState(i)">{{i}}</span>; length = <span class="number">{{length}}</span></span>
  </p>
  <p :class="currentLine===1?'active':''">
    &emsp;&emsp;<span class="operator">for</span> ( <span class="type">let</span> <span class="j-pointer">j</span> = <span class="i-pointer">i</span>; <span class="j-pointer">j</span> &lt; array.<span class="element">length</span>; <span class="j-pointer">j</span>++ ) {
    <span class="comment">&emsp;//&emsp;<span class="j-pointer">j</span> = <span :class="undefinedState(j)">{{j}}</span></span>
  </p>
  <p :class="currentLine===2?'active':''">
    &emsp;&emsp;&emsp;&emsp;<span class="operator">if</span> ( array[<span class="j-pointer">j</span>] &lt; array[<span class="i-pointer">i</span>] ) {
    <span class="comment">&emsp;//&emsp;array[<span class="i-pointer">i</span>] = <span :class="undefinedState(arr_i)">{{arr_i}}</span>; array[<span class="j-pointer">j</span>] = <span :class="undefinedState(arr_j)">{{arr_j}}</span></span>
  </p>
  <p :class="currentLine===3?'active':''">
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<span class="type">const</span> temp = array[<span class="i-pointer">i</span>];
    <span class="comment">&emsp;//&emsp;temp = <span :class="undefinedState(temp)">{{temp}}</span></span>
  </p>
  <p :class="currentLine===4?'active':''">
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;array[<span class="i-pointer">i</span>] = array[<span class="j-pointer">j</span>];
    <span class="comment">&emsp;//&emsp;array[<span class="i-pointer">i</span>] = <span :class="undefinedState(arr_i)">{{arr_i}}</span></span>
  </p>
  <p :class="currentLine===5?'active':''">
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;array[<span class="j-pointer">j</span>] = temp;
    <span class="comment">&emsp;//&emsp;array[<span class="j-pointer">j</span>] = <span :class="undefinedState(arr_j)">{{arr_j}}</span></span>
  </p>
  <p>&emsp;&emsp;&emsp;&emsp;}</p>
  <p>&emsp;&emsp;}</p>
  <p>}</p>
</template>

<script>
import {store} from "@/store/store";
export default {
  name: "InsertionSort",
  computed: {
    currentLine() {
      return store.state.currentLine;
    },
    i() {
      return store.state.i;
    },
    arr_i() {
      return this.i === 'undefined' ? 'undefined' : store.state.sortArrayElements[this.i].value;
    },
    j() {
      return store.state.j;
    },
    arr_j() {
      return this.j === 'undefined' ? 'undefined' : store.state.sortArrayElements[this.j].value;
    },
    temp() {
      return store.state.temp;
    },
    length() {
      return store.state.sortArrayLength;
    }
  },
  data() {
    const elements = store.state.sortArrayElements;
    return {
      elements: elements
    }
  },
  methods: {
    undefinedState: (attr) => {
      return attr === 'undefined' ? '' : 'number';
    }
  }
}
</script>

<style scoped>
.type {
  color: #dfb767;
}
.operator {
  color: #a36531;
}
.i-pointer {
  color: #538c3e;
}
.j-pointer {
  color: #6593b5;
}
.element {
  color: #9473a5;
}
.number {
  color: #c55a6d;
}
.active {
  background-color: #234280;
}
.comment {
  color: #626262;
}
</style>
