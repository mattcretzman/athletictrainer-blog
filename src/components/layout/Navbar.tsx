"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-navy transition-shadow ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="text-white font-bold text-xl">AthleticTrainerJob.com</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="https://www.athletictrainerjob.com"
              className="text-white/80 hover:text-white font-medium transition-colors"
            >
              Main Site
            </Link>
            <Link
              href="/"
              className="text-white/80 hover:text-white font-medium transition-colors"
            >
              Blog
            </Link>
            <Link
              href="https://www.athletictrainerjob.com/job-description"
              className="text-white/80 hover:text-white font-medium transition-colors"
            >
              Job Description
            </Link>
            <Link
              href="https://www.athletictrainerjob.com/job-description#apply-main"
              className="btn-accent inline-flex items-center gap-2"
            >
              Apply Now
              <span className="text-lg">➜</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            aria-label="Open menu"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu?.classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden pb-4 bg-navy">
          <div className="flex flex-col space-y-4">
            <Link
              href="https://www.athletictrainerjob.com"
              className="text-white/80 hover:text-white font-medium"
            >
              Main Site
            </Link>
            <Link
              href="/"
              className="text-white/80 hover:text-white font-medium"
            >
              Blog
            </Link>
            <Link
              href="https://www.athletictrainerjob.com/job-description"
              className="text-white/80 hover:text-white font-medium"
            >
              Job Description
            </Link>
            <Link
              href="https://www.athletictrainerjob.com/job-description#apply-main"
              className="btn-accent inline-flex items-center justify-center gap-2"
            >
              Apply Now
              <span className="text-lg">➜</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
