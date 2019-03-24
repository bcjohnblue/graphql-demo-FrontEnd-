import { Component, Mixins, Vue } from 'vue-property-decorator';

@Component
export class AxiosMixin extends Vue {
  public apiUrl = 'http://localhost:4000/graphql';
}
