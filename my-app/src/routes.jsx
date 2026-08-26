import Layout from "./Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DivisionDetail from "./pages/DivisionDetail";
import Divisions from "./pages/Divisions";
import Events from "./pages/Events";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Tutoring from "./pages/Tutoring";
import DeliveryTimeline from "./pages/legal/DeliveryTimeline";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import RefundPolicy from "./pages/legal/RefundPolicy";
import TermsOfService from "./pages/legal/TermsOfService";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "divisions", element: <Divisions /> },
      { path: "divisions/:slug", element: <DivisionDetail /> },
      { path: "tutoring", element: <Tutoring /> },
      { path: "events", element: <Events /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "refund-policy", element: <RefundPolicy /> },
      { path: "delivery-timeline", element: <DeliveryTimeline /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
