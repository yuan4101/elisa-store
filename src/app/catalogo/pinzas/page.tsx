import { Catalog } from "@/features/catalogo/components/Catalog";

export default function PeinetasPage() {
  return (
    <Catalog
      productType="Pinza"
      showSeasons={false}
      showGripFilter={false}
      showPriceFilter={false}
    />
  );
}
