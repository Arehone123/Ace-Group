import RouteLink from "../components/RouteLink";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | Ace Group"
        description="This page is not part of the Ace Group site. Return home or explore our divisions."
      />
      <section className="not-found">
        <p className="eyebrow">Page not found</p>
        <h1>This page is not part of the Ace Group site yet.</h1>
        <p>Return home or explore the divisions to keep moving.</p>
        <div className="center-actions">
          <RouteLink to="/" className="btn btn-primary">Go Home</RouteLink>
          <RouteLink to="/divisions" className="btn btn-secondary">View Divisions</RouteLink>
        </div>
      </section>
    </>
  );
}
