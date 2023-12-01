import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <Link
      href="/"
      className="btn btn-ghost text-xl normal-case font-normal flex gap-2 items-center h-full py-2 px-3 md-ripples ripples-dark"
    >
      <Image
        src="/logo-dark.png"
        width={24}
        height={24}
        alt="logo.png"
        className="!w-6 !h-6 ratio-1/1 rounded"
      />
      <span className="hidden md:block">ThumbBass</span>
    </Link>
  );
}
