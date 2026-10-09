import Image from "next/image";

export function AppIcon({ src, name, size = 64 }: { src: string; name: string; size?: number }) {
  return (
    <Image
      src={src}
      alt={`${name} icon`}
      width={size}
      height={size}
      className="shrink-0 rounded-[22%] bg-brand-700 object-cover shadow-lg"
      style={{ width: size, height: size }}
    />
  );
}
