<!-- Select -->

<!-- 
value select選取的值
disabled 是否禁用

options 下拉資料
  label 標籤
  value 值
-->

<template>
  <el-select v-model="model" v-bind="$attrs" :disabled="!!disabled()">
    <el-option
      v-for="(item, index) in options_computed"
      :key="item.value + '_' + index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      required: true
    },
    disabled: {
      type: Function,
      default() { }
    },
    options: {
      type: [Array, Function],
      required: true
    }
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(typeof(this.value));
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    options_computed() {
      let type;
      if (Array.isArray(this.options)) type = 'array';

      // console.log(type);
      switch (type) {
        case 'array':
          return this.options;
        default:
          return this.options();
      }
    }
  },
  watch: {
    // model(val) {
    //   this.$emit("input", val);
    // }
  }
};
</script>
