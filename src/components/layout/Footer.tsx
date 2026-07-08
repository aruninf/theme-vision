"use client";

import Link from "next/link";
import { Palette, Globe, Hash, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--theme-primary)] to-[var(--theme-accent)] flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">
                Theme<span className="text-[var(--theme-primary)]">Vision</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Discover beautiful color themes for your next project. Preview every color in real UI before you commit.
            </p>
            <div className="flex gap-3">
              {[Globe, Hash, ExternalLink].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-accent/50 hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {[
            { title: "Product", links: ["Themes", "Gradients", "Builder", "Pricing"] },
            { title: "Resources", links: ["Documentation", "API", "Blog", "Community"] },
            { title: "Company", links: ["About", "Careers", "Contact", "Privacy"] },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-medium text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Theme Vision. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
