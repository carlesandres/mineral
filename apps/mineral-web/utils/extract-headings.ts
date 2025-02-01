import { Plugin } from 'unified';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

export interface Heading {
  depth: number;
  text: string;
  id: string;
}

export const extractHeadings: Plugin = function () {
  return function (tree: Node, file: any) {
    const headings: Heading[] = [];

    visit(tree, 'heading', (node: any) => {
      const text = node.children
        .filter((child: any) => child.type === 'text')
        .map((child: any) => child.value)
        .join('');

      if (text) {
        headings.push({
          depth: node.depth,
          text: text,
          id: text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, ''),
        });
      }
    });

    file.data.headings = headings;
  };
};
