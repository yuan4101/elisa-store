import { Catalog } from "@/features/catalogo/components/Catalog";

export default function PeinetasPage() {
  return (
    <Catalog
      productType="Peineta"
      showSeasons={false}
      showGripFilter={false}
      showPriceFilter={false}
    />
  );
}
