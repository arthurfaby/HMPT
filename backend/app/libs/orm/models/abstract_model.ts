import { AbstractDto } from "../dtos/abstract_dto";
import query from "../queries/abstract_query";
import create from "../queries/create_query";
import { APIResponse } from "../types/response_type";
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
  protected _dto: T;

  /**
   * The data transfer object
   */
  public get dto(): T {
    return this._dto;
  }

  public get id(): number | undefined {
    return this._dto.id;
  }

  /**
   * @constructor
   * @param {T} dto The data transfer object
   * @param {string} tableName The table name
   * @public
   */
  constructor(dto: T, tableName: string) {
    this._dto = dto;
    this.tableName = tableName;
  }

  public create(): Promise<APIResponse<typeof this._dto>> {
    return create<typeof this._dto>(this.tableName, this._dto);
  }

  public async delete() {
    return await query("DELETE FROM $1 WHERE id = $2", [
      this.tableName,
      this._dto.id,
    ]);
  }

  public async update() {
    const keys = Object.keys(this._dto).join(", ");
    const values = Object.values(this._dto);
    const valuesString = values.map((_, i) => `$${i + 1}`).join(", ");
    const idString = `$${values.length + 1}`;
    return await query(
      `UPDATE ${this.tableName} SET (${keys}) = (${valuesString}) WHERE id = ${idString}`,
      [...values, this._dto.id]
    );
  }
}
