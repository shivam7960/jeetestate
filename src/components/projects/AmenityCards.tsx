import {
  ArrowUpDown,
  Baby,
  Car,
  Cctv,
  CircleCheck,
  Coffee,
  Droplets,
  Dumbbell,
  Flame,
  Footprints,
  House,
  ShieldCheck,
  Trees,
  Trophy,
  Users,
  Waves,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Amenity name -> icon. Add a line here to give a new amenity its own icon. */
const ICONS: Record<string, LucideIcon> = {
  "24x7 Security": ShieldCheck,
  "CCTV Surveillance": Cctv,
  "Car Parking": Car,
  Lifts: ArrowUpDown,
  "Power Backup": Zap,
  "Club House": House,
  "Landscaped Gardens": Trees,
  "Fire Safety": Flame,
  Gymnasium: Dumbbell,
  "Swimming Pool": Waves,
  "Children's Play Area": Baby,
  Cafeteria: Coffee,
  "Jogging Track": Footprints,
  "Sports Facilities": Trophy,
  "Community Hall": Users,
  "Rainwater Harvesting": Droplets,
  "High-Speed Internet": Wifi,
};

export default function AmenityCards({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((name) => {
        const Icon = ICONS[name] ?? CircleCheck;
        return (
          <li
            key={name}
            className="flex flex-col items-center gap-3 border border-mist bg-white px-3 py-7 text-center transition-colors hover:border-gold"
          >
            <Icon size={30} strokeWidth={1.5} className="text-gold-deep" aria-hidden="true" />
            <span className="text-sm text-charcoal">{name}</span>
          </li>
        );
      })}
    </ul>
  );
}