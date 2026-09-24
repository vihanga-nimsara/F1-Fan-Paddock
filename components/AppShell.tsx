"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Newspaper,
  PlayCircle,
  Home,
  CalendarDays,
  Trophy,
  Users,
  Radio,
  Star,
  Layers,
  Info,
  HelpCircle,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background text-foreground pt-14",
        pathname === "/" ? "lg:pt-0" : "lg:pt-20",
      )}
    >
      <header className="fixed inset-x-0 top-0 z-50 w-full">
        <Navbar className="fixed inset-x-0 top-0 z-50">
          {/* Desktop / tablet nav */}
          <NavBody className="justify-center">
            <div className="relative z-20 flex items-center gap-4">
              <Link
                href="/"
                className="flex shrink-0 items-center gap-2 rounded-[10px] px-2 py-1.5"
              >
                <F1Logo className="h-6 w-auto" />
                <span className="font-heading text-base font-bold tracking-tight">
                  F1 Paddock SL
                </span>
              </Link>

              <NavItems
                className="relative flex-none"
                items={PRIMARY_NAV.map(({ label, href }) => ({
                  name: label,
                  link: href,
                  active: isActive(href),
                }))}
              />

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
                <DropdownMenuContent
                  align="end"
                  sideOffset={18}
                  className="w-56"
                >
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
                              <span className="[&_svg]:size-4">
                                {item.icon}
                              </span>
                              {item.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </NavBody>

          {/* Mobile nav */}
          <MobileNav>
            <MobileNavHeader className="px-2">
              <Link href="/" className="flex items-center gap-2">
                <F1Logo className="h-6 w-auto" />
                <span className="font-heading text-base font-bold tracking-tight">
                  F1 Paddock SL
                </span>
              </Link>
              <div className="flex items-center gap-1">
                <MobileNavToggle
                  isOpen={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen((v) => !v)}
                />
              </div>
            </MobileNavHeader>
            <MobileNavMenu
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            >
              {MOBILE_NAV.map((section) => (
                <div key={section.label} className="flex w-full flex-col">
                  <span className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.label}
                  </span>
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                        isActive(item.href)
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      <span className="[&_svg]:size-4">{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
              <Button
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSubscribeOpen(true);
                }}
                className="mt-2 w-full bg-f1red text-white hover:bg-f1red-dark"
              >
                Subscribe
              </Button>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </header>

      <main className="flex-1">{children}</main>

      <ThemeToggle className="fixed bottom-6 left-6 z-40" />
      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
    </div>
  );
}