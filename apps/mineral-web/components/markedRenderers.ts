import { marked } from 'marked';
import type { Tokens } from 'marked';

// TO-DO: Reinstate a rendered that handles opening links in new tabs
// const renderer = {
//   link(token: Token.Link) {
//     const localLink = href.startsWith(
//       `${location.protocol}//${location.hostname}`,
//     );
//     const html = marked.Renderer.prototype.link.call(
//       renderer,
//       href,
//       title,
//       text,
//     );
//     const modifiedLink = localLink
//       ? html
//       : html.replace(
//           /^<a /,
//           `<a target="_blank" rel="noreferrer noopener nofollow" `,
//         );
//     return modifiedLink;
//   },
// };
//
// export const viewerRenderer = renderer;

const createNewLink = (tocToken: Tokens.Heading): string => {
   
  const { raw, depth } = tocToken;

  const anchor2 = raw
    .trim()
    .toLowerCase()
    .replace(/[^\w]+/g, '-');

  // TO-DO: Re-enable anchor levels
  const anchor = `<h${depth}><a href="#${anchor2}">${raw}</a></h${depth}>`;
  return anchor;
};

export const tocRenderer = (text: string): string => {
  const tokens = marked.lexer(text, {});
  const headingTokens = tokens.filter((t) => t.type === 'heading');
  if (!headingTokens.length) {
    return ``;
  }

  const tocLines = headingTokens.map(createNewLink).join('\n');
  return tocLines;
};
