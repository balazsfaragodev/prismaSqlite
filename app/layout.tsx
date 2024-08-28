import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contact Management System",
  description: "Simple Contact CRUD App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-lexend text-body-md font-semibold">{children}</body>
    </html>
  );
}
