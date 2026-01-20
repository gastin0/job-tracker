export default function ApplicationsFilters({
    statusFilter,
    arrangementFilter,
    onStatusChange,
    onArrangementChange,
}) {
    function resetFilters() {
        onStatusChange("all");
        onArrangementChange("all");
    }
    return (
        <div className="mb-2 flex items-center gap-4">
            <div className="flex items-center gap-2">
                <label
                    htmlFor="arrangementFilter"
                    className="text-sm font-medium text-gray-700"
                >
                    Arrangement:
                </label>
                <select
                    id="arrangementFilter"
                    value={arrangementFilter}
                    onChange={(e) => onArrangementChange(e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
                >
                    <option value="all">All</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="on-site">On-site</option>
                </select>
            </div>
            <div className="flex items-center gap-2">
                <label
                    htmlFor="statusFilter"
                    className="text-sm font-medium text-gray-700"
                >
                    Status:
                </label>

                <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
                >
                    <option value="all">All</option>
                    <option value="applied">Applied</option>
                    <option value="in_progress">In progress</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <div>
                <button
                    onClick={resetFilters}
                    className="rounded-md text-sm font-medium bg-blue-800 text-white px-4 py-1"
                >
                    Clear filters
                </button>
            </div>
        </div>
    );
}