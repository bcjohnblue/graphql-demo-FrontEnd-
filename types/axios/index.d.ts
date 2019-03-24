// import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: { post(url: string, data: any): Promise<any> };
  }
}
