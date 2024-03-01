import CryptoJS from 'crypto-js'
// import { JSEncrypt } from 'encryptlong'

// aes对称加密
export const aesEncode = (content, aesKey, aesIv) => {
  try {
    const jsonContent = JSON.stringify(content)
    const result = CryptoJS.AES.encrypt(jsonContent, aesKey, { iv: aesIv }).toString()
    return result
  } catch (error) {
    console.error('aes加密错误', error)
  }
}

// aes对称解密
export const aesDecode = (content, aesKey, aesIv) => {
  try {
    const decryptedContent = CryptoJS.AES.decrypt(content, aesKey, { iv: aesIv })
    const result = JSON.parse(decryptedContent.toString(CryptoJS.enc.Utf8))
    return result
  } catch (error) {
    console.error('aes解密错误', error)
  }
}

// // rsa非对称加密
// export const rsaEncode = (content, publicKey, privateKey) => {
//   try {
//     const encryptor = new JSEncrypt();
//     encryptor.setPublicKey(publicKey);
//     encryptor.setPrivateKey(privateKey);
//     let jsonContent = JSON.stringify(content)
//     return encryptor.encryptLong(jsonContent)
//   } catch (error) {
//     console.error('rsa加密错误', error)
//   }
// }
// // rsa非对称解密
// export const rsaDecode = (content, publicKey, privateKey) => {
//   try {
//     const encryptor = new JSEncrypt();
//     encryptor.setPublicKey(publicKey);
//     encryptor.setPrivateKey(privateKey);
//     let decodeContent = encryptor.decryptLong(content)
//     console.log('decodeContent', decodeContent)
//     return JSON.parse(decodeContent)
//   } catch (error) {
//     console.error('rsa解密错误', error)
//   }
// }

// MD5加密不可逆
export const md5Encode = (content) => {
  const jsonForm = JSON.stringify(content)
  return CryptoJS.MD5(jsonForm)
}