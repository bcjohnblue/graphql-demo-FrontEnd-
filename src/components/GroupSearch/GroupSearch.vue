<template>
  <table>
    <colgroup>
      <col
        v-for="(width, index) in search.colWidth"
        :key="index"
        :style="{ width: width }"
      />
    </colgroup>
    <tr class="header">
      <td :colspan="totalColLength">查詢商品</td>
    </tr>

    <tr v-for="(row, rowIndex) in searchConfigs" :key="rowIndex">
      <template v-for="(cell, cellIndex) in row">
        <th :key="'th' + cellIndex">{{ cell.title }}</th>
        <td :key="'td' + cellIndex" :colspan="cell.colspan">
          <slot v-if="cell.slot" :name="cell.slot" />
          <component
            :is="cell.component"
            v-else-if="cell.component && cell.ifRender"
            v-model="model[cell.prop]"
            v-bind="cell.attrs || {}"
          />
        </td>
      </template>
    </tr>
    <tr>
      <td :colspan="totalColLength">
        <div style="float: right">
          <el-button type="primary" @click="search.events.searchClick"
            >查詢</el-button
          >
          <el-button @click="search.events.clearClick">清除條件</el-button>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import elementMapping from './elementMapping';

/* Cells */
import CellSelect from './Cells/CellSelect';

export default {
  props: {
    search: {
      data: Object,
      colWidth: Array,
      events: Object,
      configs: Object
    }
  },
  components: {
    CellSelect
  },
  computed: {
    searchConfigs() {
      return this.search.configs.map(rowConfigs =>
        rowConfigs.map(config => this.computeConfigs(config))
      );
    },
    totalColLength() {
      return this.search.colWidth.length;
    },
    model() {
      return this.search.data;
      // get() {
      //   return this.search.data;
      // },
      // set(val) {
      //   console.log(val);
      //   this.$emit('input', )
      // }
    }
  },
  mounted() {
    window.search = this;
  },
  methods: {
    computeConfigs(config) {
      // 返回結構體
      const input = { ...config };
      // 欄位的類型
      const type = input.type;
      // 對應組件映射表
      const component = type ? elementMapping[type].component : 'el-input';

      input.type = type;
      input.component = component;
      // console.log(input);
      input.ifRender =
        typeof input.ifRender === 'function' ? !!input.ifRender() : true;
      // input.attrs = Object.assign({}, def.attrs, input.attrs);
      // console.log(input);
      return input;
    }
  }
};
</script>

<style lang="scss" scoped>
$border-color: #ccc;
$header-background-color: rgb(249, 249, 249);

table {
  border-collapse: collapse;

  tr {
    td {
      padding: 10px 15px;
      border: 1px solid $border-color;
    }

    &.header {
      td {
        background-color: $header-background-color;
        text-align: center;
      }
    }
    th {
      border: 1px solid $border-color;
    }
  }
}
</style>
