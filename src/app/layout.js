import "./globals.css";

export const metadata = {
  title: "Student Management System",
  description: "SCSJ4383 Assignment 2 — Next.js framework + RESTful web services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
