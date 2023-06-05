import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
import ToDo from "@/components/ToDo";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["500", "700"],

  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={roboto.className}>
      <ToDo />
    </div>
  );
}
