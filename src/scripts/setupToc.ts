const SCROLL_OPTIONS: ScrollIntoViewOptions = { behavior: "auto", block: "start" };

const getElements = () => {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-toc-id]")
  );
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>(".article-content h2[id], .article-content h3[id]")
  );
  return { links, headings };
};

const setActive = (links: HTMLAnchorElement[], id: string) => {
  links.forEach((link) => {
    const active = link.dataset.tocId === id;
    link.classList.toggle("toc-active", active);
    link.toggleAttribute("aria-current", active);
  });
};

const handleClick = (
  event: MouseEvent,
  links: HTMLAnchorElement[],
  setActiveFn: (links: HTMLAnchorElement[], id: string) => void
) => {
  event.preventDefault();
  const targetId = (event.currentTarget as HTMLAnchorElement | null)?.dataset?.tocId;
  const target = targetId ? document.getElementById(targetId) : null;

  if (target && targetId) {
    target.scrollIntoView(SCROLL_OPTIONS);
    setActiveFn(links, targetId);
    history.replaceState(null, "", `#${targetId}`);
  }
};

export function setupToc() {
  if (typeof document === "undefined") return;

  const { links, headings } = getElements();
  if (!links.length || !headings.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting && entry.target.id)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible[0]?.target.id) {
        setActive(links, visible[0].target.id);
      }
    },
    {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.1,
    }
  );

  headings.forEach((heading) => observer.observe(heading));

  const initialId = location.hash ? location.hash.slice(1) : headings[0].id;
  setActive(links, initialId);

  links.forEach((link) =>
    link.addEventListener("click", (event) => handleClick(event, links, setActive))
  );
}
