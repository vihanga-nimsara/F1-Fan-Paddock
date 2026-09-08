"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  InputBase,
  Divider,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  PersonOutlined as PersonIcon,
  Home,
  Whatshot,
  Newspaper,
  PlayCircle,
  CalendarMonth,
  EmojiEvents,
  SportsMotorsports,
  Groups,
  Radio,
  Info,
  HelpOutlineOutlined,
  BookmarkBorder,
  History,
  Star,
  GridView,
  Group,
  Today,
  PlaylistPlay,
} from "@mui/icons-material";
import { F1Logo } from "@/components/f1kit";
import SubscribeDialog from "@/components/SubscribeDialog";

const SIDEBAR_WIDTH = 240;
const MINI_WIDTH = 72;

type Entry = { label: string; href: string; icon: ReactNode };

const SECTIONS: { label: string; items: Entry[] }[] = [
  {
    label: "",
    items: [
      { label: "Home", href: "/", icon: <Home /> },
      { label: "Trending", href: "/reviews", icon: <Whatshot /> },
      { label: "News", href: "/news", icon: <Newspaper /> },
      { label: "Videos", href: "/video", icon: <PlayCircle /> },
      { label: "Live Timing", href: "/dashboard", icon: <Radio /> },
    ],
  },
  {
    label: "Racing",
    items: [
      { label: "Schedule", href: "/calendar", icon: <CalendarMonth /> },
      { label: "Standings", href: "/standings", icon: <EmojiEvents /> },
      { label: "Drivers", href: "/drivers", icon: <SportsMotorsports /> },
      { label: "Teams", href: "/constructors", icon: <Groups /> },
      { label: "Seasons", href: "/seasons", icon: <History /> },
      { label: "Spotlight", href: "/reviews", icon: <Star /> },
    ],
  },
  {
    label: "Community",
    items: [
      { label: "Paddock Stories", href: "/stories", icon: <Group /> },
      { label: "Showcases", href: "/showcase", icon: <GridView /> },
      { label: "My Lists", href: "/lists", icon: <PlaylistPlay /> },
      { label: "Team Paddock", href: "/team", icon: <Groups /> },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "About", href: "/about", icon: <Info /> },
      { label: "FAQ", href: "/faq", icon: <HelpOutlineOutlined /> },
      { label: "Release Schedule", href: "/schedule", icon: <Today /> },
      { label: "Saved", href: "/lists", icon: <BookmarkBorder /> },
    ],
  },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [miniOpen, setMiniOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* Top bar */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar sx={{ gap: { xs: 1, md: 1.5 }, px: { xs: 1, md: 1.5 } }}>
          <IconButton
            edge="start"
            size="medium"
            aria-label="Menu"
            onClick={() => setDrawerOpen(true)}
            sx={{
              ml: { xs: 0.5, md: 0 },
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: { xs: "inline-flex", md: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            edge="start"
            size="medium"
            aria-label="Collapse sidebar"
            onClick={() => setMiniOpen((v) => !v)}
            sx={{
              ml: { xs: 0, md: 0.5 },
              width: 40,
              height: 40,
              borderRadius: "50%",
              display: { xs: "none", md: "inline-flex" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Link
            href="/"
            aria-label="Go to homepage"
            style={{ display: "flex", alignItems: "center" }}
          >
            <F1Logo className="text-[1.35rem]" />
            <Typography
              component="span"
              sx={{
                ml: 1,
                fontWeight: 800,
                fontSize: "1.1rem",
                color: "text.primary",
                display: { xs: "none", sm: "inline" },
                letterSpacing: "-0.02em",
              }}
            >
              The Paddock
            </Typography>
          </Link>

          <Box sx={{ flex: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
            <IconButton
              onClick={() => setSubscribeOpen(true)}
              aria-label="Sign in"
              size="medium"
              sx={{ width: 40, height: 40, borderRadius: "50%" }}
            >
              <Avatar sx={{ width: 30, height: 30, fontSize: 14 }}>
                <PersonIcon sx={{ fontSize: 18 }} />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Desktop sidebar */}
      <Box
        component="nav"
        aria-label="Main navigation"
        sx={{
          position: "fixed",
          top: 64,
          bottom: 0,
          left: 0,
          width: miniOpen ? MINI_WIDTH : SIDEBAR_WIDTH,
          bgcolor: "background.default",
          borderRight: "1px solid #303030",
          overflowY: "auto",
          overflowX: "hidden",
          transition: "width 0.2s ease",
          display: { xs: "none", md: "block" },
          "::-webkit-scrollbar": { width: 8 },
          "::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.15)", borderRadius: 4 },
          "::-webkit-scrollbar-track": { backgroundColor: "transparent" },
        }}
      >
        {SECTIONS.map((section) => (
          <Box key={section.label} sx={{ py: 1 }}>
            {section.label && !miniOpen && (
              <Typography
                sx={{
                  px: 3,
                  pt: 2,
                  pb: 1,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "text.secondary",
                  letterSpacing: "0.06em",
                }}
              >
                {section.label}
              </Typography>
            )}
            {section.items.map((item) =>
              miniOpen ? (
                <ListItemButton
                  key={item.label}
                  component={Link as any}
                  href={item.href}
                  aria-label={item.label}
                  sx={{
                    width: 40,
                    height: 40,
                    minHeight: 40,
                    mx: "16px",
                    my: 0.5,
                    justifyContent: "center",
                    px: 0,
                    borderRadius: "10px",
                    color: isActive(item.href) ? "text.primary" : "text.secondary",
                    bgcolor: isActive(item.href) ? "rgba(255,255,255,0.12)" : "transparent",
                    "&:hover": { bgcolor: "#272727", color: "text.primary" },
                  }}
                >
                  {item.icon}
                </ListItemButton>
              ) : (
                <ListItemButton
                  key={item.label}
                  component={Link as any}
                  href={item.href}
                  sx={{
                    mx: 1,
                    mb: 0.25,
                    minHeight: 40,
                    px: 2,
                    color: isActive(item.href) ? "text.primary" : "text.secondary",
                    bgcolor: isActive(item.href) ? "rgba(255,255,255,0.12)" : "transparent",
                    "&:hover": { bgcolor: "#272727", color: "text.primary" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "inherit",
                      minWidth: 36,
                      "& .MuiSvgIcon-root": { fontSize: 22 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiTypography-root": { fontSize: 14 },
                    }}
                  />
                </ListItemButton>
              ),
            )}
          </Box>
        ))}
        {!miniOpen && (
          <Box sx={{ p: 3, color: "text.secondary" }}>
            <Divider sx={{ mb: 2, borderColor: "#303030" }} />
            <Typography sx={{ fontSize: 12, lineHeight: 1.6 }}>
              © {new Date().getFullYear()} F1 Fan Paddock — an independent fan project.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Mobile drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{
            width: SIDEBAR_WIDTH,
            height: "100%",
            bgcolor: "background.default",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Toolbar>
            <Link href="/" aria-label="Go to homepage" style={{ display: "flex", alignItems: "center" }}>
              <F1Logo className="text-[1.35rem]" />
              <Typography component="span" sx={{ ml: 1, fontWeight: 800, fontSize: "1.1rem" }}>
                The Paddock
              </Typography>
            </Link>
          </Toolbar>
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {SECTIONS.map((section) => (
              <Box key={section.label}>
                {section.label && (
                  <Typography
                    sx={{
                      px: 3,
                      pt: 2,
                      pb: 1,
                      fontSize: 12,
                      fontWeight: 700,
                      color: "text.secondary",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {section.label}
                  </Typography>
                )}
                {section.items.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton
                      component={Link as any}
                      href={item.href}
                      onClick={() => setDrawerOpen(false)}
                      sx={{
                        mx: 1,
                        minHeight: 44,
                        color: isActive(item.href) ? "text.primary" : "text.secondary",
                        bgcolor: isActive(item.href) ? "rgba(255,255,255,0.12)" : "transparent",
                        "&:hover": { bgcolor: "#272727", color: "text.primary" },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: "inherit",
                          minWidth: 36,
                          "& .MuiSvgIcon-root": { fontSize: 22 },
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} sx={{ "& .MuiTypography-root": { fontSize: 14 } }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>

      {/* Content */}
      <Box
        component="main"
        sx={{
          pt: 9,
          pl: { xs: 0, md: miniOpen ? `${MINI_WIDTH}px` : `${SIDEBAR_WIDTH}px` },
          transition: "padding-left 0.2s ease",
        }}
      >
        {children}
      </Box>

      <SubscribeDialog open={subscribeOpen} onOpenChange={setSubscribeOpen} />
    </Box>
  );
}