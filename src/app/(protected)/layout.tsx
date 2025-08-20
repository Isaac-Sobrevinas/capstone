import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-black text-white h-16 p-4 flex flex-row justify-between">
        <div>LogiSync</div>
        <div>
            <Button>Logout</Button>
        </div>
    </nav>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
