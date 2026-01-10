import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/app/components/AuthProvider'


const montserrat = Space_Grotesk({
  variable: "--font-space_grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "EasyApply",
  description: "Your One-Stop Job Application Solution",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={montserrat.className}
      >
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
