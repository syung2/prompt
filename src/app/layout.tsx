import Nav from "@/components/Nav";
import "../styles/globals.css";
import Provider from "@/components/Provider";
export const metadata = {
  title: "Prompt",
  description: "Discover & Share AI Prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient">{children}</div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
