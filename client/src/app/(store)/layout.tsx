import Sidebar from "@/components/Sidebar";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-w-screen max-h-screen">
      <Sidebar />
      <div className="overflow-y-auto overflow-x-none w-full mt-16 px-3 py-4">
        {children}
      </div>
    </div>
  );
}