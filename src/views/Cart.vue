<template>
  <div>
    <group-row-item :row-item="rowItem">
      <template #img></template>
      <template #content="{ row }">
        <h1 class="title">{{ row.title }}</h1>
        <p class="description">{{ row.description }}</p>
        <p class="price">{{ "$ " + row.price }}</p>
      </template>
      <template #controls="{ row }">
        <span class="quantity">數量: {{ row.quantity }}</span>
        <el-button type="danger" @click="deleteClick(row.productId)">刪除</el-button>
      </template>
    </group-row-item>
  </div>
</template>

<script lang="ts">
enum PriceOrder {
  'Ascending' = 1,
  'Descending' = -1,
  undefined
}

interface RowItem {
  data: object[];
  attrs: {
    [propName: string]: any
  };
}

import { Component, Vue } from 'vue-property-decorator';
import GroupSearch from '@/components/GroupSearch/GroupSearch.vue';
import GroupRowItem from '@/components/GroupRowItem/Index.vue';

@Component({
  components: {
    GroupSearch,
    GroupRowItem
  }
})
export default class Product extends Vue {
  public rowItem: RowItem = {
    data: [],
    attrs: {
      loading: false
    }
  };

  public mounted() {
    window.product = this;
    this.getCart();
  }

  public async getCart() {
    try {
      const userId = this.$store.getters.userId;
      const response = await this.$apollo.mutate({
        mutation: gql`mutation ($userId: ID!) {
            getCart(userId: $userId) {
              product {
                productId
                title
                price
                description
                imageUrl
              }
              quantity
            }
          }`,
        variables: {
          userId
        }
      });
      const result = response.data.getCart.map((item: { [propName: string]: any }) => {
        return {
          ...item.product,
          quantity: item.quantity
        }
      })
      console.log(result);

      this.rowItem.data = result;

    } catch (err) {
      this.$message.error(err.message);
    }
  }

  /**
   * deleteClick
   */
  public async deleteClick(productId: string) {
    try {
      const userId = this.$store.getters.userId;
      console.log(userId, productId);

      const response = await this.$apollo.mutate({
        mutation: gql`mutation ($userId: ID!, $productId: ID!) {
            deleteCart(userId: $userId, productId: $productId) {
              userId
            }
          }`,
        variables: {
          userId,
          productId
        }
      });
      console.log(response.data);
      this.$message.success('刪除成功!')
      this.getCart()
      // this.rowItem.data = response.data.getProducts;

    } catch (err) {
      this.$message.error(err.message);
    }

  }
}
</script>

<style lang="scss" scoped>
.quantity {
  margin-right: 20px;
}
</style>
