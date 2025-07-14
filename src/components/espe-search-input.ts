import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class EspeSearchInput extends LitElement {
static styles = css`
  :host {
    display: block;
    font-family: 'Arial', 'Roboto', sans-serif;

    --color-bg: #ffffff;
    --color-text: #000000;
    --color-border: var(--input-border, #1D1D1B);
    --color-placeholder: #8C8C8C;
    --color-suggestion-bg: white;
    --color-suggestion-hover: #f0f0f0;
  }

  :host([tema="oscuro"]) {
    --color-bg: #1e1e1e;
    --color-text: #f0f0f0;
    --color-border: #f0f0f0;
    --color-placeholder: #aaa;
    --color-suggestion-bg: #2a2a2a;
    --color-suggestion-hover: #333333;
  }

  @media (prefers-color-scheme: dark) {
    :host(:not([tema])) {
      --color-bg: #1e1e1e;
      --color-text: #f0f0f0;
      --color-border: #f0f0f0;
      --color-placeholder: #aaa;
      --color-suggestion-bg: #2a2a2a;
      --color-suggestion-hover: #333333;
    }
  }

  .container {
    position: relative;
    width: 100%;
  }

  input {
    width: 100%;
    padding: 10px 40px;
    border: 2px solid var(--color-border);
    border-radius: 10px;
    font-size: 1rem;
    outline: none;
    background-color: var(--color-bg);
    color: var(--color-text);
    caret-color: var(--color-border);
    box-sizing: border-box;
  }

  input::placeholder {
    color: var(--color-placeholder);
  }

  .icon {
    position: absolute;
    left: 10px;
    top: 55%;
    transform: translateY(-50%);
    color: var(--color-border);
  }

  ul.suggestions {
    list-style: none;
    margin: 4px 0 0;
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    max-height: 160px;
    overflow-y: auto;
    background: var(--color-suggestion-bg);
    z-index: 10;
    position: absolute;
    width: 100%;
  }

  li {
    padding: 8px 12px;
    cursor: pointer;
    color: var(--color-text);
  }

  li:hover {
    background-color: var(--color-suggestion-hover);
  }

  .loading {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    animation: spin 1s linear infinite;
    color: var(--color-border);
  }

  @keyframes spin {
    from {
      transform: translateY(-50%) rotate(0deg);
    }
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }
`;


  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) theme = '#003C71';
  @property({ type: String }) placeholder = 'Buscar...';
  @property({ type: Array }) suggestions: string[] = [];
  @property({ type: String, reflect: true }) tema?: 'claro' | 'oscuro';


  @state() private inputValue = '';
  @state() private filtered: string[] = [];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._handleOutsideClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('theme')) {
      this.style.setProperty('--input-border', this.theme);
    }
  }

  private onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    this.inputValue = value;
    this.filtered = this.suggestions.filter(item =>
      item.toLowerCase().includes(value.toLowerCase())
    );
  }

  private selectSuggestion(suggestion: string) {
    this.inputValue = suggestion;
    this.filtered = [];
    this.dispatchEvent(
      new CustomEvent('sugerencia-seleccionada', {
        detail: { value: suggestion },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.dispatchEvent(
        new CustomEvent('buscar-enter', {
          detail: { value: this.inputValue },
          bubbles: true,
          composed: true,
        })
      );
      this.filtered = [];
    }
  }

  private _handleOutsideClick = (e: MouseEvent) => {
    if (!this.shadowRoot) return;
    const path = e.composedPath();
    const clickedInside = path.includes(this.shadowRoot.querySelector('input')!) || path.includes(this);
    if (!clickedInside) {
      this.filtered = [];
      this.requestUpdate();
    }
  };

  render() {
    return html`
      <div class="container" role="search">
        <input
          aria-label="Campo de búsqueda"
          placeholder=${this.placeholder}
          .value=${this.inputValue}
          @input=${this.onInput}
          @keydown=${this._onKeyDown}
          ?disabled=${this.disabled}
        />
        ${this.loading
          ? html`<span class="loading">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/></svg>
          </span>`
          : html`<span class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
          </span>`}
        ${this.filtered.length > 0
          ? html`
              <ul class="suggestions">
                ${this.filtered.map(
                  (item) =>
                    html`<li @click=${() => this.selectSuggestion(item)} tabindex="0">${item}</li>`
                )}
              </ul>
            `
          : null}
      </div>
    `;
  }
}

customElements.define('espe-search-input', EspeSearchInput);
