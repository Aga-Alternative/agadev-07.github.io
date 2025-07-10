const AGA_PROJECT_TAG = 'aga-project';
class AgaSection extends HTMLElement {
	constructor() {
		super();

		let self = this;
		this.observer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				if (mutation.type === 'childList') {
					mutation.addedNodes.forEach(node => {
						if (
							node instanceof Text &&
							!node.textContent.replaceAll('\r', '').replaceAll('\n', '').replaceAll('s', '').replaceAll('\t', '')
						)
							return;
						self.onAppendChild(node);
					});
				}
			}
		});
		this.observer.observe(this, { childList: true });
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
		this.prepend($title, $description, $container);
		[...this.children].forEach($child => this.onAppendChild($child));
	}

	disconnectedCallback() {
		this.observer.disconnect();
	}
	/**@param {Element} $child*/
	onAppendChild($child) {
		const TagChildren = $child.tagName.toLowerCase();
		if (TagChildren === 'a' || TagChildren === AGA_PROJECT_TAG) {
			this.querySelector('.container').appendChild($child);
		}
	}
}
customElements.define('aga-section', AgaSection);
