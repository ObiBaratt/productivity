import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { Analytics } from "@vercel/analytics/react";
import Layout from "../apps/Global/Layout";
import { TaskProvider } from "../context/taskContext";
import { PomodoroProvider } from "../context/pomodoroContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider>
        <TaskProvider>
          <PomodoroProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PomodoroProvider>
        </TaskProvider>
      </MantineProvider>
      <Analytics />
    </>
  );
}
