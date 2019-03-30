<template>
  <div>
    <group-search :search="search" class="search"></group-search>
    <group-row-item :row-item="rowItem">
      <template #img></template>
      <template #content="{ row }">
        <h1 class="title">{{ row.title }}</h1>
        <p class="description">{{ row.description }}</p>
        <p class="price">{{ "$ " + row.price }}</p>
      </template>
      <template #controls="{ row }">
        <el-button type="warning" @click="buyClick(row.productId)">購買</el-button>
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

interface Search {
  data: {
    title: string,
    price: number | undefined
  };
  colWidth: string[];
  events: {
    searchClick: () => void,
    clearClick: () => void
  };
  configs: Array<Array<{
    type?: string,
    prop: string,
    title: string,
    attrs: {
      [propName: string]: any
    }
  }>>;
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
  public search: Search = {
    data: {
      title: '',
      price: undefined
    },
    colWidth: ['10%', '30%', '10%', '20%'],
    events: {
      searchClick: this.searchClick,
      clearClick: this.clearClick
    },
    configs: [
      [
        {
          prop: 'title',
          title: '商品名稱',
          attrs: {
            class: 'title',
            placeholder: '請選擇商品名稱'
          }
        },
        {
          type: 'select',
          prop: 'price',
          title: '商品價格',
          attrs: {
            class: 'price',
            placeholder: '請選擇價格排序',
            options: [
              { value: 1, label: '價格: 低到高' },
              { value: -1, label: '價格: 高到低' }
            ]
          }
        }
      ]
    ]
  };

  public rowItem: RowItem = {
    data: [],
    attrs: {
      loading: false
    }
  };

  public mounted() {
    window.product = this;
    this.getProducts();
  }

  public async getProducts(title: string = '', price?: PriceOrder) {
    try {
      const response = await this.$apollo.mutate({
        mutation: gql`mutation ($title: String, $price: Int, $description: String, $imageUrl: String,) {
            getProducts(productInput: {title: $title, price: $price, description: $description, imageUrl: $imageUrl}) {
              productId
              title
              price
              description
              imageUrl
            }
          }`,
        variables: {
          title,
          price,
          description: '',
          imageUrl: ''
        }
      });
      console.log(response.data.getProducts);

      this.rowItem.data = response.data.getProducts;

    } catch (err) {
      this.$message.error(err.message);
    }
  }

  public async buyClick(productId: string) {
    try {
      const userId = this.$store.getters.userId;
      console.log(userId, productId);

      const response = await this.$apollo.mutate({
        mutation: gql`mutation ($userId: ID!, $productId: ID) {
            addToCart(userId: $userId, productId: $productId) {
              userId
            }
          }`,
        variables: {
          userId,
          productId
        }
      });
      console.log(response.data);

      // this.rowItem.data = response.data.getProducts;

    } catch (err) {
      this.$message.error(err.message);
    }
  }

  public searchClick(): void {
    const { title, price } = this.search.data;
    this.getProducts(title, price);
  }

  public clearClick(): void {
    this.search.data = {
      title: '',
      price: undefined
    };
    this.getProducts();
  }
}
</script>

<style lang="scss" scoped>
.search {
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;

  /deep/ .price {
    ::placeholder {
      color: black;
    }
  }
}
</style>
