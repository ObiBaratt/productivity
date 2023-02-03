import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../components/Global/Layout";
import { TaskProvider } from "../context/taskContext";
import { PomodoroProvider } from "../context/pomodoroContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TaskProvider>
        <PomodoroProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PomodoroProvider>
      </TaskProvider>
      <Analytics />
    </>
  );
}
