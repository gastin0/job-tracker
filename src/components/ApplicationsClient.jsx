"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ApplicationsTable from "./ApplicationsTable";
import { ADMIN_HEADER_KEY, ADMIN_STORAGE_KEY } from "@/lib/authConstants";

export default function ApplicationsClient({ applications }){
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const adminSecret = localStorage.getItem(ADMIN_STORAGE_KEY);
        setIsAdmin(Boolean(adminSecret));
    }, []);

    async function handleDelete(applicationId) {
        if(!confirm("Are you sure you want to delete this data?")) return;

        await fetch(`/api/applications/${applicationId}`, {
            method: "DELETE",
            headers: {
                [ADMIN_HEADER_KEY]: localStorage.getItem(ADMIN_STORAGE_KEY),
            },
        });

        router.refresh();
    }

    return (
        <ApplicationsTable
            applications={applications}
            isAdmin={isAdmin}
            onDelete={handleDelete}
        />
    )
}