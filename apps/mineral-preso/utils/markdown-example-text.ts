export type MdExample = {
  text: string;
  description?: string;
  collapsed?: boolean;
};

export type MdSection = {
  sectionTitle: string;
  examples: MdExample[];
};

const mdExamples: MdSection[] = [
  {
    sectionTitle: 'Bold and italic',
    examples: [
      { text: 'You can set **bold text** in your paragraphs.' },
      { text: 'You can also set *italic text* in your paragraphs.' },
      {
        text: 'A different way of setting __text bold__ or _italic_.',
        collapsed: true,
      },
    ],
  },
  {
    sectionTitle: 'Headers',
    examples: [
      {
        text: '# This is a H1',
      },
      {
        text: '## This is a H2',
      },
      {
        text: '###### This is a H6',
      },
      {
        text: 'Another H1\n===',
        description: 'You can also make H1 and H2s with underlines.',
        collapsed: false,
      },
      {
        text: 'Another H2\n----',
      },
    ],
  },
  {
    sectionTitle: 'Lists',
    examples: [
      {
        text: `* List element 1
* List element two
* Another one
  * Nested element
  * Another nested el
* Back to not nested`,
        description: 'You can nest lists using indentation',
      },
    ],
  },
  {
    sectionTitle: 'Blockquote',
    examples: [
      { text: '> This is blockquote' },
      {
        text: '> This is a multi-line blockquote\n>In which this is the second line',
      },
    ],
  },
  {
    sectionTitle: 'Links',
    examples: [{ text: '[An external link](https://www.wikipedia.org)' }],
  },
  {
    sectionTitle: 'Tables',
    examples: [
      {
        text: '| Column header 1 | Column header 2 |\n|--|--|\n|Cell1|Cell2|\n|Cell3|Cell4|',
      },
    ],
  },
];

export default mdExamples;
