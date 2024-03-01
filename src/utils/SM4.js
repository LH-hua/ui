// 引用sm4包进行加密
const SM4 = require('gm-crypt').sm4
// 秘钥需要和后端约定
const SECRET_KEY = 'GJwsXX_BzW=gJWJW'
const sm4Config = {
  // 配置sm4参数
  key: SECRET_KEY, // 这里这个key值要与后端的一致，后端解密是根据这个key
  mode: 'cbc', // 加密的方式有两种，ecb和cbc两种，这里使用的是cbc，cbc模式还要加一个iv的参数，ecb不用
  iv: SECRET_KEY, // iv是cbc模式的第二个参数，也需要跟后端配置的一致
  cipherType: 'base64'
}
// new一个sm4函数，将上面的sm4Config作为参数传递进去。
const sm4 = new SM4(sm4Config)

/**
 * SM4加密
 * @param message 需要加密的字符串
 * @returns {*|string}
 */
const encryptSM4 = (data) => {
  return sm4.encrypt(data)
}

/**
 * SM4解密
 * @param message 需要解密的字符串
 * @returns {*|string}
 */
export const decryptSM4 = (data) => {
  return sm4.decrypt(data)
}

export {
  encryptSM4
}
