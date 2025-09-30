import { useQueryStates, parseAsString } from "nuqs";

const useProductFilters = () => {
  return useQueryStates({
    minPrice: parseAsString.withOptions({ clearOnDefault: true }),
    maxPrice: parseAsString.withOptions({ clearOnDefault: true }),
  });
};

export default useProductFilters;
