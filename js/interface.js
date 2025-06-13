import { translations } from "./utils/translate.js"
const INIT_YEAR = 2023;
const AUTHOR = 'AgaDev';

export function setInterface() {
	const Interface = {
		nav: [
			['/', 'home'],
			//	['/about', 'about'],
			//	['/contact', 'contact'],
			['/projects', 'projects'],
		],
	};
	document.title = AUTHOR;
	document.getElementById("author").textContent = AUTHOR;
	const ul = document.querySelector('header nav ul');
	Interface.nav.forEach(([link, translate]) => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		const h3 = document.createElement('h2');

		li.appendChild(a);
		a.appendChild(h3);
		a.href = link;
		h3.setAttribute("data-lang-key", translate)

		ul.appendChild(li);
	});

	const footer_p = document.createElement('p');
	footer_p.textContent = (function () {
		const actualYear = new Date().getFullYear();

		const years = actualYear > INIT_YEAR ? `${INIT_YEAR} - ${actualYear}` : INIT_YEAR;
		return `©${years} ${AUTHOR}`;
	})();
	document.querySelector('footer').appendChild(footer_p);
	const languageSelector = document.querySelector('#language-select');

	for (const lang of Object.keys(translations)) {
		const option = document.createElement('option');
		option.setAttribute("value", lang);
		option.setAttribute("data-lang", lang);
		option.setAttribute("data-lang-key", "__name__");
		languageSelector.appendChild(option)
	}
}
