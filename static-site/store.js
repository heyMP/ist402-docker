import {
  observable,
  decorate
} from "https://unpkg.com/mobx.js?module";

class Store {
  constructor() {
    this.name = null;
    this.access_token = null;
  }
}

decorate(Store, {
  name: observable,
  access_token: observable
});


export const store = new Store();
