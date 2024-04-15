import { AbstractDto } from "../dtos/abstract_dto";
import query from "../queries/abstract_query";
import select from "../queries/select_query";
import { Filters } from "../types/filter_type";

export abstract class AbstractModel<T extends AbstractDto> {
    /**
     * The table name
     * @type {string}
     * @static
     * @public
     */
    public tableName: string;

    public dto: T;

    /**
     * @constructor
     * @param {T} dto The data transfer object
     * @param {string} tableName The table name
     * @public
     */
    constructor(dto: T, tableName: string) {
        this.dto = dto;
        this.tableName = tableName;
    }

    public async delete() {
        return await query(`DELETE FROM ${this.tableName} WHERE id = ${this.dto.id}`);
    }
}