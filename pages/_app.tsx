import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../apps/Global/Layout";
import { TaskProvider } from "../context/taskContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TaskProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TaskProvider>
      <Analytics />
    </>
  );
}
