import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          defer
          data-domain="mnral.com"
          src="https://plausible.io/js/plausible.js"
        ></script>
      </Head>
      <body>
        <Main />
        <div id="modal-root" />
        <NextScript />
      </body>
    </Html>
  );
}
