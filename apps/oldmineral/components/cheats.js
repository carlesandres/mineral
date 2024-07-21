const SEPARATOR = '|';

// TODO: Research alternatives to this method
const escapeHTML = (str) => {
  // Use the browser's built-in functionality to quickly and safely escape the
  // string
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Builds the HTML for one line
const getLineHtml = (line) => {
  // TODO: Remove trailing and leading '|'
  const cleanLine = line.trim();
  const lineBits = cleanLine.split(SEPARATOR);
  const reducer = (acc, currentBit, index) => {
    const escapedCurrentBit = escapeHTML(currentBit.trim());
    const className = escapedCurrentBit ? 'bit' : 'bit empty';
    const bitHtml = `<div class="${className}">${escapedCurrentBit}</div>\n`;
    return `${acc}${bitHtml}`;
  };
  let lineHtml = lineBits.reduce(reducer, '');
  lineHtml = `<div class="line">${lineHtml}</div>\n`;
  return lineHtml;
};

// Reduces all linesHtml to a cheatSheet
// TODO: Check how to make this work with String.prototype.concat
const getSheetHtml = (acc, currentLine) => `${acc}${currentLine}`;

// TODO: Capture exceptions
export default (text) => {
  const lines = text.split('\n');
  const linesHtml = lines.map(getLineHtml);
  let html = linesHtml.reduce(getSheetHtml, '');

  html = `<div class="cheatsheet">${html}</div>`;

  return html;
};
