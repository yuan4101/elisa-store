import { Product } from "@/features/producto/types/product";
import { Season, SeasonEnum } from "@/types/season"
import { sortByStock } from "@/features/producto/utils/productSort";

export function useProductsByCategory(products: Product[]) {
  const categorizeAndSort = (season: Season) => {
    const filtered = products.filter((product) => product.season === season);
    return sortByStock(filtered);
  };

  return {
    regular: categorizeAndSort(SeasonEnum.SIN_DEFINIR),
    love: categorizeAndSort(SeasonEnum.AMOR_AMISTAD),
    halloween: categorizeAndSort(SeasonEnum.HALLOWEEN),
    christmas: categorizeAndSort(SeasonEnum.NAVIDAD),
  };
}
