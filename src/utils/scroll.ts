export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  // Clean up URL hash without triggering scroll or page reload
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
