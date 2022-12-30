import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AsyncComponents } from "@nextjs-extra/async-component";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/*  add AsyncComponents to your _app wherever you want your async components to be mounted*/}
      <AsyncComponents />

      <Component {...pageProps} />

      {/*  if you have different areas where you want to mount different kind of components, you can add more AsyncComponents with a different area property*/}
      <footer>
        <AsyncComponents area="footer" />
      </footer>
    </>
  );
}
