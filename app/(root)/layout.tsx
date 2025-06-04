import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { headers } from "next/headers";

export default async function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = await auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId 
        }
    });

    if (!store) {
        redirect(`/setup`)
    }

    return (
        <>
        {children}
        </>
    );
}
