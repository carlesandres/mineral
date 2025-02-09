import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeReact from 'rehype-react';

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype, { allowDangerousHtml: true }) // Convert remark AST to rehype AST
  .use(rehypeSlug) // Add id attributes to headings
  .use(rehypeReact, { createElement: React.createElement });

export default function MarkdownRenderer({ markdown }) {
  const content = processor.processSync(markdown).result;
  return <div>{content}</div>;
}
