// @ts-check
const fs = require('fs');
class CSSAnalyzer {
  /**@type {Record<string, string>} */
  #files = {};
  /** @param {string} file */
  read(file) {
    const lines = fs.readFileSync(file, 'utf-8').replaceAll('\r', '').replaceAll(';', ';\n').split('\n').filter(Boolean);
    const newLines = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('@import')) {
        newLines.push(trimmed);
        continue;
      }
      const import_url_path = /([\'](.+?)[\'])/g
        .exec(trimmed)?.[2]
        .split(/[\\\/]/)
        .filter(s => s != '.');
      const path = file.split(/[\\\/]/).filter(Boolean);
      path.pop();
      if (!import_url_path) {
        newLines.push(trimmed);
        continue;
      }
      for (const ppath of import_url_path) {
        if (ppath == '..') path.pop();
        else path.push(ppath);
      }
      this.read(path.join('/'));
    }
    this.#files[file] = newLines
      .join('\n')
      .replace(/\/\*[\s\S]*?\*\//g, '') // Quita comentarios
      .replace(/\s{2,}/g, ' ') // Espacios múltiples -> uno
      .replace(/\s*([{}:;,])\s*/g, '$1') // Quita espacios alrededor de tokens comunes
      .trim();
    return this;
  }
  /** @param {string} path */
  write(path) {
    const file = Object.values(this.#files).join('\n');
    fs.writeFileSync(path, file);
  }
}
function clearComments(line) {
  let inString = false;
  let stringChar = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];

    // Detectar inicio o fin de cadena
    if ((c === "'" || c === "'") && (i === 0 || line[i - 1] !== '\\')) {
      if (inString && c === stringChar) {
        inString = false;
        stringChar = null;
      } else if (!inString) {
        inString = true;
        stringChar = c;
      }
    }

    // Si encontramos // fuera de una cadena, cortamos la línea
    if (!inString && c === '/' && line[i + 1] === '/') {
      return line.slice(0, i).trim();
    }
  }

  return line.trim();
}
class JSAnalyzer {
  /**@type {Record<string, boolean>} */
  #files = {};
  /**@type {string} */
  #content = '';

  /** @param {string} file */
  read(file) {
    const lines = fs
      .readFileSync(file, 'utf-8')
      .replaceAll('\r', '')
      .replaceAll('\t', '')
      .replaceAll(';', ';\n')
      .split('\n')
      .map(clearComments)
      .filter(l => Boolean(l.split('//')[0].trim()));
    const newLines = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('export')) {
        newLines.push(trimmed.replace('export', '').trim());
        continue;
      }
      if (!trimmed.startsWith('import')) {
        newLines.push(trimmed);
        continue;
      }
      const json_import = /import (.+?) from '(.+?)' with {type: 'json'}/.exec(line);
      const name = json_import?.[1];
      const import_url_path = (json_import ? json_import[2] : /('(.+?)')/g.exec(trimmed)?.[2])?.split(/[\\\/]/).filter(s => s != '.');
      const path = file.split(/[\\\/]/).filter(Boolean);
      path.pop();
      if (!import_url_path) {
        newLines.push(trimmed);
        continue;
      }
      for (const pathPart of import_url_path) {
        if (pathPart == '..') path.pop();
        else path.push(pathPart);
      }
      const file_name = path.join('/');
      // Recorsividad magica
      this.read(file_name);
      if (file_name in this.#files) {
        continue;
      }
      this.#files[file_name] = true;
      newLines.push(name ? `const ${name} = ${this.#content};` : this.#content);
    }
    this.#content = newLines
      .join('')
      .replace(/\s{2,}/g, ' ') // Reemplaza múltiples espacios
      .replace(/\s*([=:,\-+*/<>])\s*/g, '$1') // Quita espacios alrededor de operadores comunes
      .trim();
    return this;
  }
  /** @param {string} path */
  write(path) {
    fs.writeFileSync(path, this.#content);
  }
}

new CSSAnalyzer().read('./css/index.css').write('./css/index.bundle.css');
new JSAnalyzer().read('./js/index.js').write('./js/index.min.js');
