import type { Metadata } from "next";
import { Montserrat, Baloo_2 } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const baloo2 = Baloo_2({
  variable: "--font-baloo2",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nhóm 7 - Lịch sử Đảng Cộng sản Việt Nam",
  description: "Trang web cung cấp câu hỏi trắc nghiệm về đại tướng Võ Nguyên Giáp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${baloo2.variable} antialiased`} style={{ fontFamily: 'var(--font-baloo2), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
