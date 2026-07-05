import { serviceIcons, type ServiceSlug } from "@/lib/services";

export default function ServiceIcon({
  slug,
  className = "h-6 w-6",
}: {
  slug: ServiceSlug;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={serviceIcons[slug]} />
    </svg>
  );
}
