import { NextPage } from "next";
import Head from "next/head";

const Countdown: NextPage = () => {
  const dummyJSON = {
    input: "01/01/2025",
    seconds: 28,
    minutes: 33,
    hours: 1,
    days: 357,
    years: 1,
  };

  const stringified = JSON.stringify(dummyJSON);

  return (
    <>
      <Head>
        <title>Next UP: Countdown</title>
        <meta
          name="description"
          content="Countdown Page and API documentation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>API Documentation</h1>
      <div>
        Send a GET request to the API with the format: /api/countdown/MM/DD/YYYY
      </div>
      <div>
        Example: /api/countdown/01/01/2025 will return the time until New Years
        Day 2025.
      </div>
      <div>The resulting JSON will look like: {stringified}</div>
    </>
  );
};

export default Countdown;
