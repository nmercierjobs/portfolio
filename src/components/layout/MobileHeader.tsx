import { useEffect, useRef, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Linkedin, Menu, X } from "lucide-react";
import { toast } from "sonner";

const ARTIST_EMAIL = "nmercierjobs@gmail.com";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const topGroupRef = useRef<HTMLDivElement>(null);

  // Where the last nav pill ends, measured from the top of the overlay. The
  // Email / LinkedIn group is centered in the space below this line so it sits
  // halfway between "Resume" and the bottom of the page.
  const [belowMenuTop, setBelowMenuTop] = useState(0);

  useEffect(() => {
    const update = () => {
      const overlay = overlayRef.current;
      const group = topGroupRef.current;
      if (!overlay || !group) return;
      const overlayTop = overlay.getBoundingClientRect().top;
      const groupBottom = group.getBoundingClientRect().bottom;
      setBelowMenuTop(Math.max(0, groupBottom - overlayTop));
    };

    update();
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (overlayRef.current) observer.observe(overlayRef.current);
    return () => {
      window.removeEventListener("resize", update);
      observer.disconnect();
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(ARTIST_EMAIL);
    toast.success("Email copied to clipboard!", {
      description: ARTIST_EMAIL,
    });
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background px-6 py-5 lg:hidden">
        <NavLink to="/" className="block">
          <h1 className="font-display text-3xl font-medium tracking-tight text-foreground">
            Noah Mercier
          </h1>
          <p className="text-xs text-muted-foreground">
            Jack of All Trades Engineer
          </p>
        </NavLink>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-110"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <nav
          className="relative flex h-full flex-col items-center justify-center gap-6"
          style={{ "--below-menu-top": `${belowMenuTop}px` } as React.CSSProperties}
        >
          <div ref={topGroupRef} className="flex flex-col items-center gap-6">
            <NavLink
              to="/"
              end
              onClick={() => setIsOpen(false)}
              className={`btn-pill-outline text-lg transition-all duration-500 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              activeClassName="!bg-secondary !text-foreground"
              style={{ 
                transitionDelay: isOpen ? "100ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              Projects
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`btn-pill-outline text-lg transition-all duration-500 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              activeClassName="!bg-secondary !text-foreground"
              style={{ 
                transitionDelay: isOpen ? "150ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              About
            </NavLink>
            <NavLink
              to="/resume"
              onClick={() => setIsOpen(false)}
              className={`btn-pill-outline text-lg transition-all duration-500 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              activeClassName="!bg-secondary !text-foreground"
              style={{ 
                transitionDelay: isOpen ? "175ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              Resume
            </NavLink>
          </div>

          {/* Centered between the last pill and the bottom edge on tablet+ */}
          <div
            className={`flex flex-col items-center gap-6 md:absolute md:inset-x-0 md:bottom-0 md:top-[var(--below-menu-top)] md:justify-center`}
          >
            <button
              onClick={() => {
                copyEmail();
                setIsOpen(false);
              }}
              className={`btn-pill bg-secondary text-foreground transition-all duration-500 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionDelay: isOpen ? "200ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              Email
            </button>

            <div
              className={`flex items-center gap-4 transition-all duration-500 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                transitionDelay: isOpen ? "250ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
              }}
            >
              <a
                href="https://www.linkedin.com/in/noah-mercier-453940421/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/60 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-foreground hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

        </nav>
      </div>
    </>
  );
};

export default MobileHeader;
