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
      if (!trimmed.startsWith('@import')) { newLines.push(trimmed); continue }
      const import_url_path = /([\'](.+?)[\'])/g.exec(trimmed)?.[2].split(/[\\\/]/).filter(s => s != '.');
      const path = file.split(/[\\\/]/).filter(Boolean);
      path.pop();
      if (!import_url_path) { newLines.push(trimmed); continue }
      for (const ppath of import_url_path) {
        if (ppath == '..') path.pop();
        else path.push(ppath);
      }
      this.read(path.join('/'));
    }
    this.#files[file] = newLines.join('');
    return this;
  }
  /** @param {string} path */
  write(path) {
    const file = Object.values(this.#files).join('');
    fs.writeFileSync(path, file);
  }
}
class JSAnalyzer {
  /**@type {Record<string, string>} */
  #files = {};
  /** @param {string} file */
  read(file) {
    const lines = fs.readFileSync(file, 'utf-8')
      .replaceAll('\r', '')
      .replaceAll('\t', '')
      .replaceAll(';', ';\n')
      .split('\n')
      .filter(l => Boolean(l.split('//')[0].trim()));
    const newLines = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('export')) { newLines.push(trimmed.replace('export', '').trim()); continue };
      if (!trimmed.startsWith('import')) { newLines.push(trimmed); continue };
      const json_import = /import (.+?) from '(.+?)' with {type: 'json'}/.exec(line);
      const name = json_import?.[1];
      const import_url_path = (json_import ? json_import[2] : /('(.+?)')/g.exec(trimmed)?.[2])?.split(/[\\\/]/).filter(s => s != '.');
      const path = file.split(/[\\\/]/).filter(Boolean);
      path.pop();
      if (!import_url_path) { newLines.push(trimmed); continue }
      for (const ppath of import_url_path) {
        if (ppath == '..') path.pop();
        else path.push(ppath);
      }
      const file_name = path.join('/');
      const data = this.read(file_name);
      const data_line = name ? `const ${name} = ${data};` : data;
      if(file_name in this.#files) continue;
      this.#files[file_name] = data_line;
      newLines.push(data_line);
    }
    return newLines.join('\n');
  }
  /** @param {string} path */
  write(path) {
    const file = Object.values(this.#files).join('');
    fs.writeFileSync(path, file);
  }
}

new CSSAnalyzer().read('./css/index.css').write('./css/index.min.css');
fs.writeFileSync('./js/index.min.js',new JSAnalyzer().read('./js/index.js'))