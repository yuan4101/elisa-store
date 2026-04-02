import { Catalog } from "@/features/catalogo/components/Catalog";

export default function HairclipsPage() {
  return (
    <Catalog
      productType="Hairclip"
      showSeasons={true}
      showGripFilter={true}
      showPriceFilter={true}
    />
  );
}
