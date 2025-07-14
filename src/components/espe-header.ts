import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('espe-header')
export class EspeHeaderBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Arial', 'Roboto', sans-serif;
      background-color: var(--header-bg, #ffffff);
      color: var(--header-text, #000000);
      padding: 20px 60px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      --color-primary: #006935;
      --color-accent: #FFE700;
      --color-link: #000000;
      --color-divider: #000000;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .logo-nav {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      flex-wrap: wrap;
      min-width: 250px;
    }

    .logo {
      height: 50px;
    }

    nav {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    nav a {
      text-decoration: none;
      color: var(--color-link);
      font-weight: 500;
      padding: 0 20px;
      border-right: 1px solid var(--color-divider);
    }

    nav a:last-child {
      border-right: none;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .search {
      max-width: 350px;
      width: 100%;
    }

    .buttons {
      display: flex;
      gap: 1rem;
    }

    .buttons a {
      padding: 6px 16px;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      border: 2px solid;
      transition: all 0.3s ease;
    }

    .buttons a.login {
      color: var(--color-primary);
      border-color: var(--color-primary);
    }

    .buttons a.signup {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }

    @media (max-width: 768px) {
      header {
        flex-direction: column;
        align-items: flex-start;
      }

      .logo-nav {
        flex-direction: column;
        align-items: flex-start;
      }

      .actions {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
      }

      .search {
        max-width: 100%;
      }
    }
  `;

  @property({ type: String }) logoSrc = '';
  @property({ type: Array }) categories: { label: string; link: string }[] = [];
  @property({ type: String }) loginUrl = '#';
  @property({ type: String }) signupUrl = '#';

  render() {
    return html`
      <header>
        <div class="logo-nav">
          <img class="logo" src="${this.logoSrc}" alt="Logo ESPE" />
        </div>

        <nav>
          ${this.categories.map(
            (cat) => html`<a href="${cat.link}" aria-label="${cat.label}">${cat.label}</a>`
          )}
        </nav>

        <div class="search">
          <slot name="search"></slot>
        </div>

        <div class="actions">
          <div class="buttons">
            <a class="login" href="${this.loginUrl}">Login</a>
            <a class="signup" href="${this.signupUrl}">Sign up</a>
          </div>
        </div>
      </header>
    `;
  }
}
