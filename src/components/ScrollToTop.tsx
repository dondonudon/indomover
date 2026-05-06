import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-full bg-ink-900 text-white shadow-lg ring-1 ring-white/10 transition-opacity hover:bg-ink-800 sm:bottom-28 sm:right-6"
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
