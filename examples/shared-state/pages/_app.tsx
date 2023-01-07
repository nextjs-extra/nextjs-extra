import type { AppProps } from "next/app";
import { SharedStateProvider } from "@nextjs-extra/shared-state";

export default function App({ Component, pageProps }: AppProps) {
  console.log({ pageProps });
  return (
    <SharedStateProvider initialState={pageProps.initialState}>
      <Component {...pageProps} />
    </SharedStateProvider>
  );
}
