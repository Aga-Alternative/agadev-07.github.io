const AGA_PROJECT_TAG = 'aga-project';

export default class AgaSection extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const attrType = this.getAttribute('data-type');
    const attrName = this.getAttribute('data-name') || attrType;
    const $title = document.createElement('h2');
    $title.setAttribute('data-lang-key', attrName);
    const $description = document.createElement('h3');
    $description.setAttribute('data-lang-key', `${attrName}_description`);
    const $container = document.createElement('div');
    $container.classList.add('container');
    [...this.children].forEach(($child, i, list) =>{
      // Obtener el aga-project para poder aplicar la clase last 
      const $agaProject = $child.tagName.toLowerCase() == AGA_PROJECT_TAG ? $child : $child.querySelector(AGA_PROJECT_TAG);
      const isLast = (list.length - i) == 1;
      const isOdd = i % 2 == 0;
      if ($agaProject && isLast && isOdd) $agaProject.className = "last-odd";
      $container.appendChild($child)
    })
    this.appendChild($title);
    this.appendChild($description);
    this.appendChild($container);
  }
}
customElements.define('aga-section', AgaSection)