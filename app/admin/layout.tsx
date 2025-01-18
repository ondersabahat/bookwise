import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import "@/styles/admin.css";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { db } from "@/databases/drizzle";
import { users } from "@/databases/schema";
import { eq } from "drizzle-orm";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session?.user?.id) redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)
    .then((res) => res[0].isAdmin === "ADMIN");

  if (!isAdmin) redirect("/");

  return (
    <main className="flex min-h-screen w-full flex-row ">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
