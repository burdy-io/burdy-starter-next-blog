import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import { createGenerateId, JssProvider, SheetsRegistry } from 'react-jss';

const isProduction = process.env.NODE_ENV === 'production';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new SheetsRegistry();
    const generateId = createGenerateId();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => (
        <JssProvider registry={sheets} generateId={generateId}>
          <App {...props} />
        </JssProvider>
      )
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="server-side-styles">{sheets.toString()}</style>
        </>
      )
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Lora&family=Playfair+Display:wght@700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
