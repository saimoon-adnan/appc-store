import { Marketplace } from "@/components/Marketplace";
import { getAllApps } from "@/lib/apps";

export default function HomePage() {
  return <Marketplace apps={getAllApps()} />;
}
