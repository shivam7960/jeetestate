import { FileText, Handshake, KeyRound, Scale, Search, TrendingUp } from "lucide-react";
import type { Service } from "@/types";

const ICONS = { search: Search, scale: Scale, key: KeyRound, trending: TrendingUp, file: FileText, handshake: Handshake };

export default function ServiceIcon({ name }: { name: Service["icon"] }) {
  const Icon = ICONS[name];
  return <Icon size={26} className="text-gold-deep" aria-hidden="true" />;
}
