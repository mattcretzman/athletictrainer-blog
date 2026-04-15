import Link from "next/link";

interface LocationCardProps {
  name: string;
  state: string;
  program: string;
  image?: string;
  description?: string;
}

export default function LocationCard({
  name,
  state,
  program,
  image,
  description,
}: LocationCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border-gray overflow-hidden hover:shadow-xl transition-all my-6">
      {image && (
        <div className="aspect-video bg-primary relative">
          <img
            src={image}
            alt={`${name}, ${state}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-1">{name}</h3>
            <p className="text-gray-text text-sm">{state}</p>
          </div>
          <span className="category-pill">{program}</span>
        </div>
        {description && (
          <p className="text-gray-text text-sm mb-4">{description}</p>
        )}
        <Link
          href="/job-description"
          className="text-primary hover:text-accent font-medium text-sm inline-flex items-center gap-1 transition-colors"
        >
          View Opportunities
          <span>➜</span>
        </Link>
      </div>
    </div>
  );
}
