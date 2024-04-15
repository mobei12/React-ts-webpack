/**
 * 根据提供的解析数据生成环境对象。
 *
 * @param {Object} parsed - 解析数据对象。
 * @return {Object} 生成的环境对象。
 */
function generateEnv(parsed) {
    const env = {};
    Object.keys(parsed).forEach(key => {
        const value = parsed[key];
        if (value) {
            env[`process.env.${key}`] = JSON.stringify(value);
        }
    });
    return env;
}
module.exports = { generateEnv }
