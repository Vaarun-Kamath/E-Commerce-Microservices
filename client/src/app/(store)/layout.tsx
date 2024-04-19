import Sidebar from '@/components/Sidebar';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
