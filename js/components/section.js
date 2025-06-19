export default class AgaSection extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const attrId = this.getAttribute("data-id");
    const attrName = this.getAttribute("data-name") || attrId;
    const $title = document.createElement("h2");
    $title.setAttribute("data-lang-key", attrName);
    const $description = document.createElement("h3");
    $description.setAttribute("data-lang-key", `${attrName}_description`);
    const $container = document.createElement("div");
    $container.classList.add('container');
    [...this.children].forEach($child=>$container.appendChild($child));
    this.append($title);
    this.appendChild($description);
    this.appendChild($container);
  }
}
customElements.define("aga-section", AgaSection)