'use client';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import router from "next/router";
import { useEffect } from "react";

export default function DashboardPage() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (!session) {
        return null;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Usuario: {session.user?.name}</p>
            <button
                onClick={() => signOut({
                    callbackUrl: "/login"
                })}
            >Cerrar sesión</button>
        </div>
    );
}
