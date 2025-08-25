import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <img
        alt="logo"
        className=" h-11 lg:h-[3.69rem]"
        src={"/images/logo.png"}
      />
    </Link>
  );
}
