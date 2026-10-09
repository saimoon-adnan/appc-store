import Image from "next/image";
import Link from "next/link";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Appc Store home">
      <Image src="/brand/appc-logo.png" alt="" width={size} height={size} priority />
      <span className="text-xl font-extrabold tracking-tight">Appc<span className="ml-1 font-semibold text-ink-300">Store</span></span>
    </Link>
  );
}
