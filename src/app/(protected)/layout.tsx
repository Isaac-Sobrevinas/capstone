'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/employees", label: "Employees" },
  ];
  return (
    <nav className="w-full bg-black text-white h-12 flex flex-row justify-between">
      <div className="flex px-2 gap-4">
        <div className="font-bold text-lg flex justify-center items-center px-2">LogiSync</div>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className={`px-2 flex justify-center items-center text-sm ${pathname === link.href ? "font-bold underline" : ""}`}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex p-4">
        <button className="pl-4 flex justify-center items-center">Logout</button>
      </div>
    </nav>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
