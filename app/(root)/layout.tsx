import { Toolbar } from "@/components/toolbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="fixed inset-0 h-full flex flex-col justify-center p-10">
        <Toolbar />
      </div>

      <main className="h-full">{children}</main>
    </div>
  );
}
