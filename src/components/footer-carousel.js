import { LitElement, html, css } from 'lit';

class FooterCarousel extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* Contenedor del carrusel */
    .carousel-container {
      position: relative;
      overflow: hidden;
      padding: 16px 0;
      background: #fff;
    }

    .carousel {
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    .carousel::-webkit-scrollbar {
      display: none;
    }
    ::slotted(*) {
      flex: 0 0 auto;
      scroll-snap-align: start;
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
      background: #f0f0f0;
    }

    /* Flechas de navegación */
    button.nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0,0,0,0.5);
      border: none;
      color: white;
      font-size: 1.5rem;
      width: 32px;
      height: 48px;
      cursor: pointer;
      z-index: 1;
    }
    button.prev { left: 8px; }
    button.next { right: 8px; }

    /* Pie de página estilo ESPE Shop */
    .footer-links {
      background: #006935BF;
      color: #ddd;
      padding: 32px 20px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 24px;
      font-size: 0.85rem;
    }
    .footer-links h4 {
      margin-bottom: 8px;
      color: white;
      font-size: 1rem;
    }
    .footer-links ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .footer-links li {
      margin-bottom: 6px;
    }
    .footer-links a {
      color: #ddd;
      text-decoration: none;
    }
    .footer-links a:hover {
      text-decoration: underline;
    }
  `;

  firstUpdated() {
    this._carousel = this.shadowRoot.querySelector('.carousel');
  }

  _prev() {
    this._carousel.scrollBy({ left: -this._carousel.clientWidth, behavior: 'smooth' });
  }

  _next() {
    this._carousel.scrollBy({ left: this._carousel.clientWidth, behavior: 'smooth' });
  }

  render() {
    return html`
      <!-- Carrusel -->
      <div class="carousel-container">
        <button class="nav prev" @click=${this._prev}>‹</button>
        <div class="carousel">
          <slot></slot>
        </div>
        <button class="nav next" @click=${this._next}>›</button>
      </div>

      <!-- Pie de página -->
      <div class="footer-links">
        <div class="footer-column">
          <h4>Conócenos</h4>
          <ul>
            <li><a href="#">Trabaja en ESPE Shop</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Relaciones con Inversionistas</a></li>
            <li><a href="#">Dispositivos ESPE Shop</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Gana Dinero con Nosotros</h4>
          <ul>
            <li><a href="#">Vender en ESPE Shop</a></li>
            <li><a href="#">Programa de Afiliados</a></li>
            <li><a href="#">Publica tu Libro en Kindle</a></li>
            <li><a href="#">Ver más</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Productos de Pago de ESPE Shop</h4>
          <ul>
            <li><a href="#">Compra con Puntos</a></li>
            <li><a href="#">Recarga tu Saldo</a></li>
            <li><a href="#">Conversor de Divisas</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h4>Podemos Ayudarte</h4>
          <ul>
            <li><a href="#">Tu Cuenta</a></li>
            <li><a href="#">Tus Pedidos</a></li>
            <li><a href="#">Tarifas de Envío y Políticas</a></li>
            <li><a href="#">Ayuda</a></li>
          </ul>
        </div>
      </div>
    `;
  }
}

customElements.define('footer-carousel', FooterCarousel);
