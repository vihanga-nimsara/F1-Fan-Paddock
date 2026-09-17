"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Newspaper, PlayCircle, Home, CalendarDays, Trophy, Users, Radio, Star, Layers, Info, HelpCircle, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { F1Logo } from "@/components/f1kit";
import ThemeToggle from "@/components/ThemeToggle";
import SubscribeDialog from "@/components/SubscribeDialog";
import { cn } from "@/lib/utils";

type Entry = { label: string; href: string; icon: ReactNode };

const PRIMARY_NAV: Entry[] = [
  { label: "Home", href: "/", icon: <Home /> },
  { label: "Blog", href: "/stories", icon: <Newspaper /> },
  { label: "News", href: "/news", icon: <Newspaper /> },
  { label: "Videos", href: "/video", icon: <PlayCircle /> },
  { label: "Standings", href: "/standings", icon: <Trophy /> },
  { label: "Schedule", href: "/calendar", icon: <CalendarDays /> },
];

const MORE_NAV: { label: string; items: Entry[] }[] = [
  {
    label: "Racing",
    items: [
      { label: "Live Timing", href: "/dashboard", icon: <Radio /> },
      { label: "Drivers", href: "/drivers", icon: <Users /> },
      { label: "Constructors", href: "/constructors", icon: <Users /> },
      { label: "Seasons", href: "/seasons", icon: <Layers /> },
      { label: "Race Reviews", href: "/reviews", icon: <Star /> },
    ],
  },
  {
    label: "Paddock",
    items: [
      { label: "Team", href: "/team", icon: <UserRound /> },
      { label: "About", href: "/about", icon: <Info /> },
      { label: "FAQ", href: "/faq", icon: <HelpCircle /> },
    ],
  },
];

const MOBILE_NAV: { label: string; items: Entry[] }[] = [
  { label: "Browse", items: PRIMARY_NAV },
  ...MORE_NAV,
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background text-foreground pt-14",
        pathname === "/" ? "lg:pt-0" : "lg:pt-20",
      )}
    >
      <header className="fixed top-0 z-50 w-full lg:h-0">
        {/* Desktop floating nav */}
        <div className="hidden lg:absolute lg:inset-x-0 lg:top-0 lg:block">
          <div className={`mx-auto mt-3 w-full px-6 transition-[max-width] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled ? "max-w-[1100px]" : "max-w-[1400px]"}`}>
            <div className="flex h-14 items-center gap-6 overflow-hidden rounded-[3px] border border-border bg-card/85 px-5 shadow-lg shadow-foreground/5 backdrop-blur-md transition-[background-color] duration-300">
              <Link href="/" className="flex shrink-0 items-center gap-2">
                <F1Logo className="h-6 w-auto" />
                <span className={cn("font-heading text-base font-bold tracking-tight transition-opacity duration-500", scrolled && "hidden")}>
                  F1 Paddock SL
                </span>
              </Link>

              <nav className="flex flex-1 items-center justify-center gap-1" aria-label="Main navigation">
                {PRIMARY_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                      isActive(item.href)
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-f1red" />
                    )}
                  </Link>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 text-muted-foreground hover:text-foreground"
                    >
                      More
                      <ChevronDown className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {MORE_NAV.map((group, i) => (
                      <div key={group.label}>
                        {i > 0 && <DropdownMenuSeparator />}
                        <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                        <DropdownMenuGroup>
                          {group.items.map((item) => (
                            <DropdownMenuItem key={item.href} asChild>
                              <Link
                                href={item.href}
                                className={cn(
                                  isActive(item.href) && "bg-muted font-medium",
                                )}
                              >
                                <span className="[&_svg]:size-4">{item.icon}</span>
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>

              <div className="flex shrink-0 items-center gap-2">
                <ThemeToggle />
                <Separator orientation="vertical" className={cn("h-6 transition-opacity duration-300", scrolled && "hidden")} />
                <Button
                  size="sm"
                  onClick={() => setSubscribeOpen(true)}
                  className="bg-f1red px-4 text-white hover:bg-f1red-dark"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet nav */}
        <div className="border-b border-border bg-card/85 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center gap-2 px-4 md:px-6">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[290px]">
                <SheetHeader className="border-b">
                  <Link href="/" className="flex items-center gap-2">
                    <F1Logo className="h-6 w-auto" />
                    <SheetTitle className="font-heading text-lg font-bold tracking-tight">
                      F1 Paddock SL
                    </SheetTitle>
                  </Link>
                  <SheetDescription>
                    F1 fan blogs, news and live data.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-2 py-2">
                  {MOBILE_NAV.map((section) => (
                    <div key={section.label} className="flex flex-col">
                      <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {section.label}
                      </span>
                      {section.items.map((item) => (
                        <SheetClose key={item.href} asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                              isActive(item.href)
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            <span className="[&_svg]:size-4">{item.icon}</span>
                            {item.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            {/* Brand */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <F1Logo className="h-6 w-auto" />
              <span className="hidden font-heading text-base font-bold tracking-tight sm:inline">
                F1 Paddock SL
              </span>
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <ThemeToggle />
              <Separator orientation="vertical" className="hidden h-6 sm:block" />
              <Button
                size="sm"
                onClick={() => setSubscribeOpen(true)}
                className="hidden bg-f1red text-white hover:bg-f1red-dark sm:inline-flex"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
    </div>
  );
}