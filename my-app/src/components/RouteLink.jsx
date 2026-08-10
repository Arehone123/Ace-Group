import { Link } from "react-router-dom";

const externalPrefixes = ["http://", "https://", "mailto:", "tel:"];

function isExternal(to) {
  return typeof to === "string" && externalPrefixes.some((prefix) => to.startsWith(prefix));
}

/**
 * Thin wrapper over React Router's <Link>. Internal paths use client-side
 * routing; external URLs (and anything with target=) fall back to a plain
 * anchor. Keeps the existing <RouteLink to="..."> call sites unchanged.
 */
export default function RouteLink({ to, children, ...props }) {
  if (isExternal(to) || props.target) {
    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} {...props}>
      {children}
    </Link>
  );
}
