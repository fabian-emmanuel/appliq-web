import { ProdErrorPage } from "../internal-components/ProdErrorPage.tsx";

export default function SomethingWentWrongPage() {
  return <ProdErrorPage text="Something went wrong." canRefresh={true} />;
}
