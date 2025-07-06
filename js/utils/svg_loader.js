// Se utiliza para cargar svg externos, se integran directamente en el dom para poder usar css propio
export async function loadSVG(element) {
  const src = element.getAttribute('src');
  const domParser = new DOMParser();
  const data = await fetch(src);
  const rawSVG = await data.text();
  const SVG = domParser.parseFromString(rawSVG, 'image/svg+xml').querySelector('svg');
  for (const attribute of SVG.attributes) SVG.setAttribute(attribute.name, attribute.value);
  element.replaceWith(SVG);
}
