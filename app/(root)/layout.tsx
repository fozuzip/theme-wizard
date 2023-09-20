import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <div className=" relative -mt-[5.75rem] overflow-hidden pb-16 pt-[5.75rem]">
        <div className="relative mx-auto mt-16 w-full max-w-[85rem] px-4 sm:mt-20 sm:px-6 lg:px-8 xl:mt-32">
          {children}
        </div>
      </div>
    </>
  );
}
