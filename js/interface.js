import { useTheme } from "./utils.js";

const INIT_YEAR = 2023;
const AUTHOR = 'AdrianCraft';

const lang = {
  es: {
    home: 'Inicio',
    about: 'Acerca de',
    contact: 'Contacto',
    proyects: 'Proyectos',
    error: {
      404: 'Página no encontrada',
    }
  },
  en: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    proyects: 'Proyects',
    error: {
      404: 'Page not found',
    }
  },
}

export function setInterface(language='es'){
  useTheme();

  const Interface = {
    nav: [
      ['/', lang[language].home],
      ['/about', lang[language].about],
      ['/contact', lang[language].contact],
      ['/proyects', lang[language].proyects],
    ]
  }

  const ul = document.querySelector('header nav ul');
  Interface.nav.forEach(([link, translate]) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const h3 = document.createElement('h3');

    li.appendChild(a);
    a.appendChild(h3);
    a.href = link;
    h3.textContent = translate;

    ul.appendChild(li);
  })
  
  const footer_p = document.createElement('p')
  footer_p.textContent = (function(){
    const actualYear = new Date().getFullYear();

    if (actualYear > INIT_YEAR) return `© ${INIT_YEAR} - ${actualYear} - ${AUTHOR}`;
    else return `© ${INIT_YEAR} - ${AUTHOR}`;
  })()
  document.querySelector('footer').appendChild(footer_p);

  const error = document.querySelector('#message-error');
  const code = document.querySelector('#error-code').textContent;
  if (error) error.textContent = lang[language].error[code];
}