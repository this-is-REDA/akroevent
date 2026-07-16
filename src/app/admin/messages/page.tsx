import { AdminPage } from "@/lib/admin-page";
import MessagesAdmin from "@/components/admin/MessagesAdmin";
import { createClient } from "@/lib/supabase/server";
import type { ContactMessage } from "@/types/content";

export default async function AdminMessagesPage() {
  let messages: ContactMessage[] = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    messages = (data as ContactMessage[]) ?? [];
  } catch {
    messages = [];
  }

  return (
    <AdminPage
      title="Messages"
      description="Boîte de réception des messages du formulaire de contact."
    >
      <MessagesAdmin initialMessages={messages} />
    </AdminPage>
  );
}
