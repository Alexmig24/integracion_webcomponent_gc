import { css, html, LitElement } from 'lit';
import '../components/espe-header.ts';
import '../components/espe-search-input.ts'
import '../components/espe-product-card.ts'

export class EspeLayout extends LitElement {
  static properties = {
    isLoggedIn: { type: Boolean }
  };

  constructor() {
    super();
    this.isLoggedIn = false;
  }

  connectedCallback() {
    super.connectedCallback();

    requestAnimationFrame(() => {
      const search = this.renderRoot.querySelector("espe-search-input");
      const cards = this.renderRoot.querySelectorAll("espe-course-card");
      const headerBar = this.renderRoot.querySelector("#headerBar");

      if (headerBar) {
        headerBar.categories = [
          { label: 'Home', link: '/' },
          { label: 'Categorías', link: '/categorias' },
          { label: 'Materias', link: '/materias' },
          { label: 'Secciones', link: '/secciones' }
        ];
      }

      if (search) {
        search.addEventListener("sugerencia-seleccionada", (e) => {
          this.filtrar(e.detail.value);
        });

        search.addEventListener("input", (e) => {
          this.filtrar(e.target.value);
        });

        search.addEventListener("buscar-enter", (e) => {
          search.loading = true;
          this.filtrar(e.detail.value);
          setTimeout(() => {
            search.loading = false;
          }, 1000);
        });
      }
    });
  }

  filtrar(valor) {
    
  }

  static styles = css`
    .container {
      font-family: 'Arial', sans-serif;
      display: flex;
      flex-direction: column;
      height: 100vh;
      gap: 10px;
    }

    .content {
      flex: 1;
      padding: 20px 40px;
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      align-items: center;
      justify-items: center;
    }
  `;

  render() {
    return html`
      <div class="container">
        <espe-header
          id="headerBar"
          logoSrc="https://srvcas.espe.edu.ec/authenticationendpoint/images/Logo-MiESPE.png"
          loginUrl="/login"
          signupUrl="/register"
        >
          <espe-search-input slot="search" tema="claro"></espe-search-input>
        </espe-header>
        <div class="content">
          <slot></slot>
        </div>
        <footer-carousel id="footer-products"></footer-carousel>
      </div>
    `;
  };

}

customElements.define('espe-layout', EspeLayout);