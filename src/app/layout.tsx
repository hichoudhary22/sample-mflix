import NavBar from "@/ui/app/navBar";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className=" m-auto w-11/12">
        <NavBar />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
