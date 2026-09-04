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
  HelpCircle,
  History,
  Home,
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
import { Button, Menu as MuiMenu, MenuItem } from "@mui/material";
import { F1Logo } from "@/components/f1kit";
import F1Button from "@/components/ui/F1Button";
import { RippleButton } from "@/components/ui/ripple-button";
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
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Blog", href: "/stories", icon: <BookOpen size={16} /> },
  { label: "News", href: "/news", icon: <Newspaper size={16} /> },
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
  { label: "FAQ", href: "/faq", icon: <HelpCircle size={16} /> },
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

function DesktopNavItem({ item }: { item: NavItem }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const btnSx = {
    fontFamily: "var(--font-inter)",
    fontSize: "14px",
    fontWeight: 600,
    letterSpacing: "0.03em",
    textTransform: "uppercase" as const,
    color: "var(--color-pebble)",
    borderRadius: "4px",
    px: 1.5,
    py: 1,
    transition: "all 150ms ease",
    "&:hover": {
      bgcolor: "rgba(20,20,28,0.06)",
      color: "#e10600",
    },
  };

  if (item.href) {
    return (
      <Button component={Link} href={item.href} color="inherit" sx={btnSx}>
        {item.label}
      </Button>
    );
  }

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
        aria-haspopup="true"
        aria-expanded={open}
        endIcon={
          <ChevronDown
            size={14}
            className={
              open ? "rotate-180 transition-transform" : "transition-transform"
            }
          />
        }
        sx={btnSx}
      >
        {item.label}
      </Button>
      <MuiMenu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        transitionDuration={120}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              p: 1,
              borderRadius: "4px",
              borderTop: "3px solid #e10600",
              bgcolor: "var(--color-carbon-deep)",
              boxShadow: "0 24px 50px rgba(0,0,0,0.5)",
              minWidth: 420,
              transition: "all 120ms ease",
            },
          },
        }}
      >
        <div className="grid grid-cols-2 gap-1">
          {item.children?.map((c) => (
            <MenuItem
              key={c.label}
              component={Link}
              href={c.href}
              onClick={() => setAnchorEl(null)}
              sx={{
                borderRadius: "4px",
                py: 1,
                px: 1.5,
                color: "var(--color-pebble)",
                transition: "all 120ms ease",
                "&:hover": { bgcolor: "rgba(20,20,28,0.06)" },
              }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="flex items-center gap-2 font-display text-[14px] font-semibold tracking-[0.02em] text-pebble">
                  {c.icon}
                  {c.label}
                </span>
                {c.desc && (
                  <span className="pl-7 text-[11px] leading-tight text-pebble-80">
                    {c.desc}
                  </span>
                )}
              </div>
            </MenuItem>
          ))}
        </div>
      </MuiMenu>
    </>
  );
}

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
        className="bg-carbon-deep/95 backdrop-blur-md transition-[border-color,box-shadow] duration-150"
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

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <RippleButton
              onClick={() => setSubscribeOpen(true)}
              rippleColor="#ffffff"
              className="hidden !bg-f1red !text-white !border-f1red font-display text-[12px] font-semibold uppercase tracking-[0.06em] md:inline-flex"
            >
              Sign In
            </RippleButton>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-pebble-5 text-pebble lg:hidden"
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
            transition={{ duration: 0.15 }}
            className="overflow-y-auto border-b border-pebble-20 border-t-[3px] border-t-f1red bg-carbon-deep lg:hidden"
          >
            <div className="mx-auto flex max-w-[1640px] flex-col gap-1 px-4 py-4">
              {NAV.map((item) => (
                <div key={item.label} className="flex flex-col">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{ fontFamily: "var(--font-inter)" }}
                      className="flex items-center rounded-sm px-3 py-2.5 text-[15px] font-semibold uppercase tracking-[0.04em] text-pebble"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <>
                      <div
                        style={{ fontFamily: "var(--font-inter)" }}
                        className="flex items-center px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-f1red"
                      >
                        {item.label}
                      </div>
                      {item.children?.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-xl px-6 py-2 text-sm text-pebble-80"
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
