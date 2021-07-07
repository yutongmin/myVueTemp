import CryptoJS from "crypto-js"; // 引用AES源码js

const key1 = 'M6InjuryByJY2018'
const iv1 = 'M6InjuryByJY2018'
/**
 * 加密
 */
export const defaultEncrypt = (word: any) => {
  const key = CryptoJS.enc.Utf8.parse(key1);
  const iv = CryptoJS.enc.Latin1.parse(iv1);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * 解密
 */
export const defaultDecrypt = (word: any) => {
  const key = CryptoJS.enc.Utf8.parse(key1);
  const iv = CryptoJS.enc.Latin1.parse(iv1);
  const decrypted = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted).toString();
};

/**
 * 加密
 */
export const encrypt = (word: any, key1: string, iv1: string) => {
  const key = CryptoJS.enc.Utf8.parse(key1 || "46cc793c53dc451b");
  const iv = CryptoJS.enc.Latin1.parse(iv1);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * 解密
 */
export const decrypt = (word: any) => {
  const key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
  const decrypted = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypted).toString();
};
