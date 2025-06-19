import { AUTHOR, INIT_YEAR } from "./data.js";

export function setInterface() {

	document.title = AUTHOR;
	//document.getElementById("author").textContent = AUTHOR;

	const footer_p = document.createElement('p');
	footer_p.textContent = (function () {
		const actualYear = new Date().getFullYear();

		const years = actualYear > INIT_YEAR ? `${INIT_YEAR} - ${actualYear}` : INIT_YEAR;
		return `©${years} ${AUTHOR}`;
	})();
	document.querySelector('footer').appendChild(footer_p);
}
