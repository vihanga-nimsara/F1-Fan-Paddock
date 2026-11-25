"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Link from "next/link";

import React, { useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    active?: boolean;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("sticky inset-x-0 top-20 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 0 1px rgba(34, 42, 53, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05), 0 12px 40px rgba(47, 48, 55, 0.08)"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 34,
        mass: 0.9,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-[5px] border border-transparent bg-transparent px-4 py-2 lg:flex dark:bg-transparent lg:mt-3",
        visible && "border border-border bg-card/85 dark:bg-neutral-950/85",
        className,
      )}
      data-slot="resizable-navbar-body"
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium transition duration-200 hover:text-foreground lg:flex lg:space-x-1",
        className,
      )}
      data-slot="resizable-navbar-items"
    >
      {items.map((item, idx) => (
        <Link
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className={cn(
            "relative rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
            item.active && "text-foreground",
          )}
          key={`link-${idx}`}
          href={item.link}
        >
          {item.active && (
            <motion.div
              layoutId="nav-active"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="absolute inset-0 h-full w-full rounded-full bg-muted"
            />
          )}
          {hovered === idx && !item.active && (
            <motion.div
              layoutId="nav-hover"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              className="absolute inset-0 h-full w-full rounded-full bg-muted/70"
            />
          )}
          <span className={cn("relative z-20", item.active && "font-semibold")}>
            {item.name}
          </span>
        </Link>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 0 1px rgba(34, 42, 53, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05), 0 12px 40px rgba(47, 48, 55, 0.08)"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 34,
        mass: 0.9,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible && "bg-card/85 dark:bg-neutral-950/85",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "top center" }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg border border-border bg-card px-4 py-8 shadow-lg dark:bg-card",
            className,
          )}
          data-slot="resizable-navbar-menu"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="size-6 text-foreground" onClick={onClick} data-slot="resizable-navbar-toggle" />
  ) : (
    <IconMenu2 className="size-6 text-foreground" onClick={onClick} data-slot="resizable-navbar-toggle" />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <img
        src="https://assets.aceternity.com/logo-dark.png"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">Startup</span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-[5px] bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_0_1px_rgba(34,_42,_53,_0.04),_0_1px_2px_rgba(0,_0,_0,_0.05),_0_12px_40px_rgba(47,_48,_55,_0.08)]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_0_1px_rgba(34,_42,_53,_0.04),_0_1px_2px_rgba(0,_0,_0,_0.05),_0_12px_40px_rgba(47,_48,_55,_0.08)]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0_1px_2px_rgba(0,_0,_0,_0.2)]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
