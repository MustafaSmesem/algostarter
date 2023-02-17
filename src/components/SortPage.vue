<template>
  <div class="sort-page">
    <SortArea></SortArea>
    <ToolBar></ToolBar>
    <CodeArea>
      <InsertionSort></InsertionSort>
    </CodeArea>
  </div>
</template>

<script>
import SortArea from "@/components/SortArea";
import CodeArea from "@/components/CodeArea";
import InsertionSort from "@/components/InsertionSort";
import ToolBar from "@/components/ToolBar";
export default {
  name: "SortPage",
  components: {ToolBar, InsertionSort, CodeArea, SortArea}
}
</script>

<style scoped>
.sort-page {
  width: 70%;
  margin: auto;
}
</style>
