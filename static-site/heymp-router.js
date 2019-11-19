import { Router } from "https://unpkg.com/@vaadin/router?module";
import "./views/heymp-home-view.js"

class HeympRouter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    const router = new Router(this.shadowRoot);
    router.setRoutes([
      { path: "/", component: "heymp-home-view" },
    ]);
  }
}

window.customElements.define("heymp-router", HeympRouter);