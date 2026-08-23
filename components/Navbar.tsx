"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  Building2,
  CalendarClock,
  CalendarDays,
  ChevronDown,
  Flag,
  History,
  Info,
  LayoutGrid,
  List,
  ListChecks,
  Menu,
  Newspaper,
  PlayCircle,
  Radio,
  Star,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { F1Logo } from "@/components/f1kit";
import F1Button from "@/components/ui/F1Button";
import SubscribeDialog from "@/components/SubscribeDialog";
import ThemeToggle from "@/components/ThemeToggle";

type NavChild = { label: string; href: string; desc?: string; icon?: ReactNode };
type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
  icon?: ReactNode;
};

const NAV: NavItem[] = [
  { label: "Blog", href: "/stories", icon: <Newspaper size={16} /> },
  { label: "Video", href: "/video", icon: <PlayCircle size={16} /> },
  {
    label: "Racing",
    icon: <Flag size={16} />,
    children: [
      { label: "Schedule", href: "/calendar", desc: "Every Grand Prix of 2026", icon: <CalendarDays size={16} /> },
      { label: "Results", href: "/standings", desc: "Latest race results", icon: <ListChecks size={16} /> },
      { label: "Standings", href: "/standings", desc: "Drivers & constructors", icon: <Trophy size={16} /> },
      { label: "Drivers", href: "/drivers", desc: "The grid, ranked", icon: <User size={16} /> },
      { label: "Teams", href: "/constructors", desc: "Constructors battle", icon: <Building2 size={16} /> },
      { label: "Seasons", href: "/seasons", desc: "Archive by year", icon: <History size={16} /> },
    ],
  },
  { label: "Live Timing", href: "/dashboard", icon: <Radio size={16} /> },
  { label: "About", href: "/about", icon: <Info size={16} /> },
  {
    label: "Community",
    icon: <Users size={16} />,
    children: [
      { label: "Paddock Stories", href: "/stories", desc: "", icon: <BookOpen size={16} /> },
      { label: "Race Spotlight", href: "/reviews", desc: "", icon: <Star size={16} /> },
      { label: "Showcases", href: "/showcase", desc: "", icon: <LayoutGrid size={16} /> },
    ],
  },
  {
    label: "More",
    icon: <LayoutGrid size={16} />,
    children: [
      { label: "Team", href: "/team", desc: "Who runs the site", icon: <Users size={16} /> },
      { label: "Release Schedule", href: "/schedule", desc: "", icon: <CalendarClock size={16} /> },
      { label: "My Lists", href: "/lists", desc: "", icon: <List size={16} /> },
    ],
  },
];

const triggerClass =
  "inline-flex items-center gap-1 px-3 py-2 font-display text-[13px] font-semibold tracking-[0.04em] text-pebble transition-colors hover:text-f1red data-[popup-open]:text-f1red";

const contentTransition =
  "transition-[opacity,transform,translate] duration-[var(--duration)] ease-[var(--easing)] data-starting-style:opacity-0 data-ending-style:opacity-0 data-starting-style:data-[activation-direction=left]:translate-x-[-50%] data-starting-style:data-[activation-direction=right]:translate-x-[50%] data-ending-style:data-[activation-direction=left]:translate-x-[50%] data-ending-style:data-[activation-direction=right]:translate-x-[-50%]";

const linkCardClass =
  "relative flex flex-col gap-0.5 rounded-[2px] p-3 transition-colors hover:bg-f1red-15";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Main nav */}
      <div
        className="bg-carbon-deep/95 backdrop-blur-md transition-[border-color,box-shadow] duration-200"
        style={{
          borderBottom: scrolled
            ? "2px solid var(--color-f1red)"
            : "1px solid var(--color-pebble-15)",
          boxShadow: scrolled ? "0 6px 24px rgb(0 0 0/0.35)" : "none",
        }}
      >
        <div className="mx-auto flex h-[64px] max-w-[1640px] items-center justify-between gap-4 px-4 md:px-6">
          <Link href="/" aria-label="Go to homepage" className="shrink-0">
            <F1Logo className="text-[1.5rem]" />
          </Link>

          <NavigationMenu.Root className="hidden text-pebble lg:block">
            <NavigationMenu.List className="relative flex items-center gap-0.5">
              {NAV.map((item) => (
                <NavigationMenu.Item key={item.label} value={item.label}>
                  {item.href ? (
                    <NavigationMenu.Link
                      className={triggerClass}
                      render={<Link href={item.href} />}
                    >
                      {item.icon}
                      {item.label}
                    </NavigationMenu.Link>
                  ) : (
                    <>
                      <NavigationMenu.Trigger className={triggerClass}>
                        {item.icon}
                        {item.label}
                        <NavigationMenu.Icon className="transition-transform duration-200 ease-[ease] data-[popup-open]:rotate-180">
                          <ChevronDown size={14} />
                        </NavigationMenu.Icon>
                      </NavigationMenu.Trigger>

                      <NavigationMenu.Content
                        className={`h-full w-max min-w-[420px] p-2 ${contentTransition}`}
                      >
                        <ul className="m-0 grid list-none grid-cols-2 gap-1 p-0">
                          {item.children!.map((c) => (
                            <li key={c.label}>
                              <NavigationMenu.Link
                                className={linkCardClass}
                                render={<Link href={c.href} />}
                              >
                                <span className="flex items-center gap-2 font-display text-sm font-semibold tracking-[0.02em] text-pebble">
                                  {c.icon}
                                  {c.label}
                                </span>
                                {c.desc && (
                                  <span className="pl-7 text-[11px] leading-tight text-pebble-80">
                                    {c.desc}
                                  </span>
                                )}
                              </NavigationMenu.Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenu.Content>
                    </>
                  )}
                </NavigationMenu.Item>
              ))}
            </NavigationMenu.List>

            <NavigationMenu.Portal>
              <NavigationMenu.Positioner
                sideOffset={2}
                className="h-[var(--positioner-height)] w-[var(--positioner-width)] max-w-[var(--available-width)] transition-[top,left,right,bottom] duration-[var(--duration)] ease-[var(--easing)] before:absolute before:content-[''] data-[side=bottom]:before:top-[-10px] data-[side=bottom]:before:right-0 data-[side=bottom]:before:left-0 data-[side=bottom]:before:h-2.5"
                style={
                  {
                    "--duration": "0.25s",
                    "--easing": "cubic-bezier(0.22,1,0.36,1)",
                  } as React.CSSProperties
                }
              >
                <NavigationMenu.Popup className="relative h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] rounded-b-[2px] border-t-[3px] border-t-f1red bg-carbon-deep shadow-[0_24px_50px_rgb(0_0_0/0.5)] outline-none transition-[opacity,transform,width,height,scale] duration-[var(--duration)] ease-[var(--easing)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
                  <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
                </NavigationMenu.Popup>
              </NavigationMenu.Positioner>
            </NavigationMenu.Portal>
          </NavigationMenu.Root>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <F1Button
              variant="primary"
              className="hidden md:inline-flex"
              onClick={() => setSubscribeOpen(true)}
            >
              Sign In
            </F1Button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] bg-pebble-5 text-pebble lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-y-auto border-b border-pebble-20 border-t-[3px] border-t-f1red bg-carbon-deep lg:hidden"
          >
            <div className="mx-auto flex max-w-[1640px] flex-col gap-1 px-4 py-4">
              {NAV.map((item) => (
                <div key={item.label} className="flex flex-col">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 rounded-[2px] px-3 py-2.5 font-display text-sm font-semibold tracking-[0.04em] text-pebble"
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 px-3 py-2 font-display text-[11px] font-semibold tracking-[0.12em] text-f1red">
                        {item.icon}
                        {item.label}
                      </div>
                      {item.children?.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-[2px] px-6 py-2 text-sm text-pebble-80"
                        >
                          {c.icon}
                          {c.label}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              ))}
              <F1Button
                variant="primary"
                className="mt-2 w-full"
                onClick={() => {
                  setMobileOpen(false);
                  setSubscribeOpen(true);
                }}
              >
                Subscribe
              </F1Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
    </header>
  );
}
