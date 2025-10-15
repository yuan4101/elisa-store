import { Product, SeasonType } from "../../producto/types/product";
import { sortByStock } from "@/features/producto/utils/productSort";

export function useProductsByCategory(products: Product[]) {
  const categorizeAndSort = (season: SeasonType) => {
    const filtered = products.filter((product) => product.season === season);
    return sortByStock(filtered);
  };

  return {
    regular: categorizeAndSort(SeasonType.NoEspecificado),
    love: categorizeAndSort(SeasonType.AmorAmistad),
    halloween: categorizeAndSort(SeasonType.Halloween),
    christmas: categorizeAndSort(SeasonType.Navidad),
  };
}
