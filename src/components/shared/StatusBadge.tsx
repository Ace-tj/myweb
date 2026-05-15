interface StatusBadgeProps {
  status: string;
  label?: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending:        "bg-yellow-100 text-yellow-800 border-yellow-200",
  pending_short:  "bg-yellow-100 text-yellow-800 border-yellow-200",
  quote_received: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress:    "bg-indigo-100 text-indigo-800 border-indigo-200",
  completed:      "bg-green-100 text-green-800 border-green-200",
  cancelled:      "bg-red-100 text-red-800 border-red-200",
  active:         "bg-emerald-100 text-emerald-800 border-emerald-200",
  approved:       "bg-green-100 text-green-800 border-green-200",
  banned:         "bg-red-100 text-red-800 border-red-200",
  available:      "bg-green-100 text-green-800 border-green-200",
  occupied:       "bg-red-100 text-red-800 border-red-200",
  reserved:       "bg-yellow-100 text-yellow-800 border-yellow-200",
  delivered:      "bg-green-100 text-green-800 border-green-200",
  delayed:        "bg-red-100 text-red-800 border-red-200",
  in_transit:     "bg-blue-100 text-blue-800 border-blue-200",
  new:            "bg-purple-100 text-purple-800 border-purple-200",
  done:           "bg-green-100 text-green-800 border-green-200",
  "in-kitchen":   "bg-orange-100 text-orange-800 border-orange-200",
  ready:          "bg-teal-100 text-teal-800 border-teal-200",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const styles =
    STATUS_STYLES[status.toLowerCase().replace(/\s+/g, "_")] ??
    "bg-neutral-100 text-neutral-700 border-neutral-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}
    >
      {label ?? status.replace(/_/g, " ")}
    </span>
  );
}
