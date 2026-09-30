import { avatarTone, cn, initials } from "@/lib/format";

export function AccountAvatar({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-medium tracking-tight",
        avatarTone(name),
        size === "sm" ? "size-7 text-[11px]" : "size-11 text-[15px]",
      )}
    >
      {initials(name)}
    </span>
  );
}
