import { useSelectedLayoutSegment } from 'next/navigation';

export default function DashboardLayout({
  children, // will be a page or nested layout
  auth,
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  // const loginSegments = useSelectedLayoutSegment('auth');
  return (
    <>
      {children}
      <div>{auth}</div>
    </>
  );
}
