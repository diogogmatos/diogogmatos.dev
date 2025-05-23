"use client";

import BackButton from "@/components/back-button";
import AppLink from "@/components/app-link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  return (
    <nav className="flex gap-4 items-center pb-2">
      {path !== "/" && path !== "/blog" && <BackButton />}
      <AppLink href="/" active={path === "/"}>
        Home
      </AppLink>
      <AppLink href="/blog" active={path.startsWith("/blog")}>
        Blog
      </AppLink>
    </nav>
  );
}
