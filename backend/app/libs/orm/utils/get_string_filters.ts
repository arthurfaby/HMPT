import { Filters } from "../types/filter_type";

export const getStringFilters = (filters: Filters): [string, unknown[]] => {
  const keys = Object.keys(filters);
  const values: unknown[] = [];
  const stringFilters = keys
    .map((key, index) => {
      const filterValues = Object.values(filters[key]);
      return Object.keys(filters[key])
        .map((filterKey, filterIndex) => {
          const filterValue = filterValues[filterIndex];
          values.push(filterValue);
          const valueString = `$${index + 1}`;
          if (filterKey === "equal") {
            return `${key} = ${valueString}`;
          } else if (filterKey === "notEqual") {
            return `${key} != ${valueString}`;
          } else if (filterKey === "greaterThan") {
            return `${key} > ${valueString}`;
          } else if (filterKey === "lessThan") {
            return `${key} < ${valueString}`;
          } else if (filterKey === "greaterThanEqual") {
            return `${key} >= ${valueString}`;
          } else if (filterKey === "lessThanEqual") {
            return `${key} <= ${valueString}`;
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
  return [stringFilters, values];
};
