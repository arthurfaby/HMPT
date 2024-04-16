import { UserDto } from "../../../dtos/user_dto";
import query from "./abstract_query";

const create = async <T extends UserDto>(tableName: string, dto: T) => {
    const keys = Object.keys(dto);
    console.log(dto);
    const values = Object.values(dto);
    // Remove id field
    keys.splice(0, 1);
    values.splice(0, 1);
    const parsedKeys = keys.join(', ');
    const parsedValues = values.map(parsedValue => {
        if (typeof parsedValue === "string") {
            return `'${parsedValue}'`;
        }
        if (typeof parsedValue === 'object') {
            const objectKeys = Object.keys(parsedValue);
            const objectValues = Object.values(parsedValue);
            let objectAsString = "'{";
            objectKeys.forEach((objectKey, index) => {
                objectAsString += `"${objectKey}": "${objectValues[index]}"`
                if (index !== objectKeys.length - 1) {
                    objectAsString += ", ";
                }
            });
            objectAsString += "}'";
            return objectAsString;
        }
        return parsedValue;
    }).join(', ');
    // return `INSERT INTO ${tableName} (${parsedKeys}) VALUES (${parsedValues});`;
    return await query(`INSERT INTO ${tableName} (${parsedKeys}) VALUES (${parsedValues});`);
}

export default create;