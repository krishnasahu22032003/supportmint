// app/dashboard/page.tsx

import { redirect } from "next/navigation";
import DashboardHeader from "@/components/ui/DashboardHeader";
import { getSession } from "@/lib/getSession";

export default async function DashboardPage() {
    
  const user = await getSession();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <DashboardHeader
        userName={user.name}
        userEmail={user.email}
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        Dashboard
      </main>
    </>
  );
}