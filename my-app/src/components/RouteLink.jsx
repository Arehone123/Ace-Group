const externalPrefixes = ["http://", "https://", "mailto:", "tel:"];

function isExternal(to) {
  return externalPrefixes.some((prefix) => to.startsWith(prefix));
}

function isModifiedClick(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0;
}

export default function RouteLink({ to, children, onClick, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);

    if (event.defaultPrevented || isModifiedClick(event) || isExternal(to) || props.target) {
      return;
    }

    event.preventDefault();
    const nextUrl = new URL(to, window.location.origin);
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    const next = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;

    if (next !== current) {
      window.history.pushState({}, "", next);
    }

    window.dispatchEvent(new Event("app:navigate"));
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
