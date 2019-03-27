declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    apiUrl: string;
    $axios: { post(url: string, data: any): Promise<any> };
  }

  interface Vue {
    $apollo: { mutate: any };
  }
}

declare global {
  interface Window {
    gql: any;
  }
}
