import AdminShell from "@/components/admin/AdminShell";

export function AdminPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <AdminShell>
      <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-2xl uppercase tracking-wide text-white sm:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-luxury-muted">{description}</p>
        </div>
        {children}
      </main>
    </AdminShell>
  );
}
