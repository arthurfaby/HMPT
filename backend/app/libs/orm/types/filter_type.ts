export type Filters = {
  [key: string]:
    | {
        equal: string | number | boolean;
      }
    | {
        notEqual: string | number | boolean;
      }
    | {
        greaterThan: number;
      }
    | {
        greaterThanEqual: number;
      }
    | {
        lessThan: number;
      }
    | {
        lessThanEqual: number;
      }
    | {
        isNull: boolean;
      }
    | {
        isNotNull: boolean;
      };
};
