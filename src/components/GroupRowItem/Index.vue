<!-- 列表 (有圖片) -->

<!-- props -->
<!-- 
rowItem
  data 列表資料
  attrs 屬性
page
  now, 現在頁數
  total, 總資料數
  size 每頁顯示資料數
-->

<!-- slot -->
<!-- 
  img: 圖片
  content: 內容 (資料由父組件寫入)
  controls: 編輯、刪除按鈕
-->

<!-- reference -->
<!--
  https://juejin.im/post/5c64e11151882562e4726d98
  https://vuejs.org/v2/guide/components-slots.html
-->
<template>
  <div id="group_row_item" v-loading="loading">
    <div v-if="rowItem.data.length">
      <div v-for="(row, index) in rowItem.data" :key="index" class="item">
        <slot name="img" :row="row">
          <div
            class="img"
            :style="`background-image: url('${row.imageUrl}')`"
            v-if="hasSlot('img')"
          ></div>
        </slot>
        <div class="content" v-if="hasSlot('content')">
          <slot name="content" :row="row"></slot>
        </div>
        <span class="controls" v-if="hasSlot('controls')">
          <slot name="controls" :row="row"></slot>
        </span>
      </div>
    </div>
    <div v-else-if="!loading" class="item" style="cursor: initial">無</div>
  </div>
</template>

<script>
export default {
  props: {
    rowItem: {
      data: {
        type: Array
      },
      attrs: {
        type: Object
      },
      img: {
        type: Object
      },
    }
  },
  mounted() {
  },
  computed: {
    loading() {
      return this.rowItem.attrs && this.rowItem.attrs.loading;
    },
  },
  methods: {
    hasSlot(name = 'default') {
      return !!this.$slots[name] || !!this.$scopedSlots[name];
    }
  }
};
</script>

<style lang="scss" scoped>
#group_row_item {
  .item {
    $imgSize: 100px;
    display: flex;
    align-items: top;
    padding: 5px;
    margin: 10px 0px;
    position: relative;
    border: 1px solid rgba(52, 183, 155, 0.3);
    background-color: rgba(205, 237, 232, 0.3);

    .img {
      flex: none;
      height: $imgSize;
      width: $imgSize;
      margin-right: 10px;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      border-radius: 5px;
      border: 2px dotted #cdede8;
      margin-bottom: auto;
      margin-top: auto;
    }
    > .content {
      flex: 1;
      p {
        text-align: left;
        line-height: 1.3;
        white-space: normal;
      }
    }
    /deep/ .controls {
      margin-right: 20px;
      .custom-btn {
        margin-right: 20px;
      }
    }
  }
}
</style>
