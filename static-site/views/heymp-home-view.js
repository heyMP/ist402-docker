import { LitElement, html, css } from "https://unpkg.com/lit-element?module";
import "https://unpkg.com/@lrnwebcomponents/hax-logo/hax-logo.js?module"
import "https://unpkg.com/hax-form/hax-form.js?module"

class HeympHomeView extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        text-align: center;
        padding-top: 10em;
      }

      [part="row"] {
        padding: 1em;
      }
    `
  }
  render() {
    return html`
      <hax-logo></hax-logo>
      <h1>Sign up for HAX-CAMP</h1>
      <hax-form endpoint="http://localhost:8081">
        <form id="hax-registration">
          <div part="row">
            <label for="firstname">First Name</label>
            <input type="text" name="firstname">
          </div>

          <div part="row">
            <label for="lastname">Lastname</label>
            <input type="text" name="lastname">
          </div>

          <div part="row">
            <label for="username">Username</label>
            <input type="text" name="username">
          </div>

          <input type="submit" value="Register">
        </form>
      </hax-form>
    `
  }
}

customElements.define('heymp-home-view', HeympHomeView)