interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  iconBg,
  iconColor,
}: FeatureCardProps) {
  return (
    <div 
        className="group rounded-2xl border border-gray-100 p-6 w-70"
    >
      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl 
        ${iconBg} ${iconColor} transition-transform duration-300 group-hover:scale-110`}
      >
        {icon}
      </div>


      <h3 className="mb-2 text-lg font-bold text-slate-900">
        {title}
      </h3>

      <p className="text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}
