/**
 * Copyright 2025 Tushar
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `rpg-character`
 * 
 * @demo index.html
 * @element rpg-character
 */
export class RpgCharacter extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "rpg-character";
  }

  static properties=
  {
  organization: {type: String},
  repo: {type: String},
  limit: {type: Number},
  contributors: {type: Array},
  }

  constructor() {
    super();
    this.organization = "haxtheweb";
    this.repo = "webcomponents";
    this.limit = 10;
    this.contributors = [];
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-character.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

async getData() {
  const url = `https://api.github.com/repos/${this.organization}/${this.repo}/contributors`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--rpg-character-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div>
  <a class="repo-link" href="https://github.com/${this.organization}/${this.repo}" target="_blank">
    </a>
    <div class="new-container">
      ${this.contributors.map(
        (contributor) => html`
        <div class="container">
          <rpg-character name="${contributor.login}"></rpg-character>
          <br>
          <a herf="${contributor.html_url}" target="_blank"></a>
          <br>
            Contributor: ${contributor.contributions}
      </div>
        
        `
      )}
      </div>
</div>
<github-rpg-contributors organization="haxtheweb" repo="webcomponents" limit="10"></github-rpg-contributors>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgCharacter.tag, RpgCharacter);