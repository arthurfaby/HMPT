import select from "../queries/select_query";
import { Filters } from "../types/filter_type";

export abstract class AbstractModel<T> {
    /**
     * The table name
     * @type {string}
     * @static
     * @public
     */
    public static tableName: string;
}