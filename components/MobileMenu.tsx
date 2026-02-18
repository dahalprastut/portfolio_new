"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { socialLinks, personalInfo } from "@/lib/data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-40 flex flex-col justify-center items-center bg-[var(--glass-bg-prominent)] backdrop-blur-[40px]"
        >
          <nav className="flex flex-col items-center gap-6">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-[var(--font-display)] text-5xl text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
          >
            <div className="flex gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[var(--font-body)] text-sm text-[var(--color-ink-secondary)] hover:text-[var(--color-ink)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <span className="font-[var(--font-mono)] text-xs text-[var(--color-ink-tertiary)]">
              {personalInfo.email}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
