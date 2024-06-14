import { AbstractDto } from "../dtos/abstract_dto";
import query from "../queries/abstract_query";
import create from "../queries/create_query";
import validateInput from "../utils/check_injections";
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

  public create() {
    return create(this.tableName, this._dto);
  }

  public async delete() {
    return await query(
      `DELETE FROM ${this.tableName} WHERE id = ${this._dto.id}`
    );
  }

  public async update() {
    const keys = Object.keys(this._dto)
      .map((key) => validateInput(key))
      .join(", ");
    const values = Object.values(this._dto)
      .map((value) => {
        if (value == null) {
          return "NULL"
        }
        const validatedValue = validateInput(value);
        return getParsedValue(validatedValue);
      })
      .join(", ");
    return await query(
      `UPDATE ${this.tableName} SET (${keys}) = (${values}) WHERE id = ${this._dto.id}`
    );
  }
}
