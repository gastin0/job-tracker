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

    if (!applications || applications.length === 0) {
        return (
            <div className="mt-12 text-center text-gray-500">
                <h2 className="text-lg font-semibold text-gray-700">No Applications yet</h2>
                <p className="mt-2">Job application you add will appear here</p>

                {isAdmin && (
                    <a 
                        href="/applications/new"
                        className="inline-block mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Add your first applications
                    </a>
                )}
            </div>
        );
    }

    return (

        <ApplicationsTable
            applications={applications}
            isAdmin={isAdmin}
            onDelete={handleDelete}
        />
    )
}