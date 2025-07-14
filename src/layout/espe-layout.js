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
      position: relative;
      flex: 1;
      padding: 20px 40px;
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
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
        <footer-carousel>
          <img src="../img/img1.jpg"  alt="Producto 1">
          <img src="../img/img2.jpg"  alt="Producto 2">
          <img src="../img/img3.jpg"  alt="Producto 3">
          <img src="../img/img4.jpg"  alt="Producto 4">
          <img src="../img/img5.jpg"  alt="Producto 5">
          <img src="../img/img6.jpg"  alt="Producto 6">
          <img src="../img/img7.jpg"  alt="Producto 7">
          <img src="../img/img8.jpg"  alt="Producto 8">
          <img src="../img/img9.jpg"  alt="Producto 9">
          <img src="../img/img10.jpg" alt="Producto 10">
          <img src="../img/img11.jpg" alt="Producto 11">
          <img src="../img/img12.jpg" alt="Producto 12">
          <img src="../img/img13.jpg" alt="Producto 13">
          <img src="../img/img14.jpg" alt="Producto 14">
          <img src="../img/img15.jpg" alt="Producto 15">
          <img src="../img/img16.jpg" alt="Producto 16">
          <img src="../img/img17.jpg" alt="Producto 17">
          <img src="../img/img18.jpg" alt="Producto 18">
        </footer-carousel>
      </div>
    `;
  };

}

customElements.define('espe-layout', EspeLayout);