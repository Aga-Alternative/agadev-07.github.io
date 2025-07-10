import { loadSVG } from '../utils/svg_loader.js';

class AgaProject extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const attrTypeImage = this.getAttribute('data-image-type');
    const attrName = this.getAttribute('data-name');
    const attrLangs = this.getAttribute('data-langs');
    const tagType = attrTypeImage == 'svg' ? 'svg' : 'img';

    // Si tiene elementos ya fue inicializado
    if (this.childElementCount) return;

    const $imageWrapper = document.createElement('div');
    $imageWrapper.className = 'image-wrapper';
    const imageSrc = `${tagType}/${attrName}.${attrTypeImage}`;
    if (tagType === 'svg') {
      const $image = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      $image.setAttribute('src', imageSrc);
      loadSVG($image);
      $imageWrapper.appendChild($image);
    } else {
      const $image = document.createElement(tagType);
      $image.setAttribute('src', imageSrc);
      $image.setAttribute('data-lang-key', `${attrName}_image`);
      $image.setAttribute('data-lang-type', 'alt');
      $image.setAttribute('draggable', 'false');
      $imageWrapper.appendChild($image);
    }
    this.appendChild($imageWrapper);

    const $h3 = document.createElement('h3');
    $h3.setAttribute('data-lang-key', `${attrName}_title`);
    this.appendChild($h3);

    const $p_developedIn = document.createElement('p');
    $p_developedIn.classList.add('developed-in');
    if (attrLangs.includes(',')) $p_developedIn.setAttribute('data-lang-args-and-list', attrLangs);
    else $p_developedIn.setAttribute('data-lang-args', attrLangs);
    $p_developedIn.setAttribute('data-lang-key', 'developed_in');
    this.appendChild($p_developedIn);

    const $description = document.createElement('p');
    $description.setAttribute('data-lang-key', `${attrName}_description`);
    this.appendChild($description);
  }
}
customElements.define('aga-project', AgaProject);
