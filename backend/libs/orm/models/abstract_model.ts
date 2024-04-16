import { AbstractDto } from "../dtos/abstract_dto";
import query from "../queries/abstract_query";
import create from "../queries/create_query";
import select from "../queries/select_query";
import { Filters } from "../types/filter_type";
import { getParsedValue } from "../utils/get_parsed_value";

export abstract class AbstractModel<T extends AbstractDto> {
    /**
     * The table name
     * @type {string}
     * @public
     */
    public tableName: string;

    /**
     * The data transfer object
     * @type {T}
     * @public
     */
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

    public create() {
        return create(this.tableName, this.dto);
    }

    public async delete() {
        return await query(`DELETE FROM ${this.tableName} WHERE id = ${this.dto.id}`);
    }

    public async update() {
        const keys = Object.keys(this.dto).join(", ");
        const values = Object.values(this.dto).map(value => {
            return getParsedValue(value);
        }).join(', ');
        return await query(`UPDATE ${this.tableName} SET (${keys}) = (${values}) WHERE id = ${this.dto.id}`);
    }
}