import { Catalog } from "@/features/catalogo/components/Catalog";

export default function PeinetasPage() {
  return (
    <Catalog
      productType="Hairstick"
      showSeasons={false}
      showGripFilter={false}
      showPriceFilter={false}
    />
  );
}
