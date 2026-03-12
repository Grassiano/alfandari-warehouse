"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Search, TableProperties } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src="https://alfandari.biz/wp-content/uploads/2026/01/idsite_w.png"
            alt="אלפנדרי"
            width={40}
            height={40}
            className="rounded-md dark:invert"
          />
          <div className="leading-tight">
            <h1 className="text-sm font-bold text-foreground">אלפנדרי</h1>
            <p className="text-[11px] text-muted-foreground">
              מחסן פורמייקות · מחלקת הדבקות
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/"
            aria-label="חיפוש"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
          >
            <Search
              className={`h-4 w-4 ${pathname === "/" ? "text-primary" : ""}`}
            />
          </Link>
          <Link
            href="/edit"
            aria-label="עריכה"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
          >
            <TableProperties
              className={`h-4 w-4 ${pathname === "/edit" ? "text-primary" : ""}`}
            />
          </Link>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="מעבר בין מצב כהה לבהיר"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "relative cursor-pointer"
            )}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </div>
      </div>
    </header>
  );
}
