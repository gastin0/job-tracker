"use client";

import { useEffect, useRef, useState } from "react";

export default function ConfirmDeleteModal({
    open,
    title,
    description,
    confirmLabel = "Delete",
    cancelLabel = "Cancel",
    isLoading = false,
    onConfirm,
    onCancel,
}) {
    const [hasMounted, setHasMounted] = useState(false);
    const modalRef = useRef(null);
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (!open || !hasMounted) return;
        cancelButtonRef.current?.focus();
    }, [open, hasMounted])

    useEffect(() => {
        if (!open || !hasMounted) return;

        const focusableSelectors = [
            'button',
            '[href]',
            'input',
            'select',
            'textarea',
            '[tabindex]:not([tabindex="-1"])',
        ];

        const focusableElements = modalRef.current?.querySelectorAll(
            focusableSelectors.join(',')
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleKeyDown = (event) => {
            if (event.key !== 'Tab') return;

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, hasMounted]);

    if (!open || !hasMounted) return null;

    return (
        <div className="fixed inset-0 z-50">

            <div className="relative flex h-full w-full items-start justify-center">
                <div
                    className="absolute inset-0 bg-block/40 z-0"
                    onClick={isLoading ? undefined : onCancel}
                />
                <div
                    ref={modalRef}
                    role="dialog"
                    aria-modal="true"
                    className="relative z-10 mt-50 w-full max-w-md rounded-xl bg-white p-6 shadow-lg"
                >
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {description}
                    </p>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            ref={cancelButtonRef}
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="rounded-md border px-4 py-2 text-sm text-gray-100 bg-gray-700 hover:bg-gray-500 disabled:opacity-50"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="rounded-md border px-4 py-2 text-sm font-medium text-white bg-red-800 hover:bg-red-700 disabled:opacity-50"
                        >
                            {isLoading ? "Deleting..." : confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}