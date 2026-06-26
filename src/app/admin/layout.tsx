import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Akro Event",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0A0A0A] text-white [&_*]:cursor-auto">
      {children}
    </div>
  );
}
