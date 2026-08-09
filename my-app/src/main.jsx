import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

// ViteReactSSG wires up React Router, prerenders each route to static HTML
// at build time, and hydrates on the client.
export const createRoot = ViteReactSSG({ routes });
