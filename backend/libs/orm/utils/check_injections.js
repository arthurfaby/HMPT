/**
 * Validate input to prevent SQL injection
 * @param {string} input 
 * @returns {string}
 */
const validateInput = (input) => {
    console.log(typeof input);
    if (typeof input !== 'string') {
        return input;
    }
    if (input.match(/[\t\r\n]|(--[^\r\n]*)|(\/\*[\w\W]*?(?=\*)\*\/)/gi)) {
        throw new Error('SQL injection detected: ' + input);
    }

    return input;
}

module.exports = { validateInput };