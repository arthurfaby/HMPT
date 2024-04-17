import { Filters } from "../types/filter_type";
import { getParsedValue } from "./get_parsed_value";

export const getStringFilters = (filters: Filters): string => {
  const keys = Object.keys(filters);
  const stringFilters = keys
    .map((key, index) => {
      const filterValues = Object.values(filters[key]);
      return Object.keys(filters[key])
        .map((filterKey, filterIndex) => {
          const filterValue = filterValues[filterIndex];
          if (filterKey === "equal") {
            return `${key} = ${getParsedValue(filterValue)}`;
          } else if (filterKey === "notEqual") {
            return `${key} != ${getParsedValue(filterValue)}`;
          } else if (filterKey === "greaterThan") {
            return `${key} > ${getParsedValue(filterValue)}`;
          } else if (filterKey === "lessThan") {
            return `${key} < ${getParsedValue(filterValue)}`;
          } else if (filterKey === "greaterThanEqual") {
            return `${key} >= ${getParsedValue(filterValue)}`;
          } else if (filterKey === "lessThanEqual") {
            return `${key} <= ${getParsedValue(filterValue)}`;
          } else if (filterKey === "isNull") {
            return `${key} IS NULL`;
          } else if (filterKey === "isNotNull") {
            return `${key} IS NOT NULL`;
          }
          throw new Error("Invalid filter");
        })
        .join(" AND ");
    })
    .join(" AND ");
  return stringFilters;
};
