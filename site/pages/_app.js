import "../styles/globals.css";
import { useState } from "react";

import Header from "../components/header";
import Footer from "../components/footer";

export default function App({ Component, pageProps }) {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Header search={search} setSearch={setSearch} />
      <div className="flex-1">
        <Component {...pageProps} search={search} />
      </div>
      <Footer />
    </div>
  );
}
