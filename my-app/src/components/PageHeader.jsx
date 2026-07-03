export default function PageHeader({ eyebrow, title, lead, children, compact = false }) {
  return (
    <section className={`page-header ${compact ? "is-compact" : ""}`}>
      <div className="page-header-grid" />
      <div className="page-header-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
        {children && <div className="header-actions">{children}</div>}
      </div>
    </section>
  );
}
