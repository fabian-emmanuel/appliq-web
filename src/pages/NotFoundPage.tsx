import { ProdErrorPage } from "../internal-components/ProdErrorPage.tsx";

export default function NotFoundPage() {
  return <ProdErrorPage text="Page not found." canRefresh={false} />;
}
