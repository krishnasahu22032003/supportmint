import { redirect } from "next/navigation";
import DashboardHeader from "@/components/ui/DashboardHeader";
import { getSession } from "@/lib/getSession";
import DashboardClient from "@/components/ui/DashboardClient";

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
      <DashboardClient ownerId={user.id} />
    </>
  );
}