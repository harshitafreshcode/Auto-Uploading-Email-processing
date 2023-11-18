const bcrypt = require('bcrypt');

export const hashPassword = async (password: string) => {
    if (password) {
        password = await bcrypt.hash(password, 10);
        return password
    }
    return false
}