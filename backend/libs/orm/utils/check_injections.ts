/**
 * Validate input to prevent SQL injection
 */
const validateInput = (input: string): string => {
    if (typeof input !== 'string') {
        return input;
    }
    if (input.match(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi)) {
        throw new Error('SQL injection detected: ' + input);
    }

    return input;
}

export default validateInput;