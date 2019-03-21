import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js/crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CyptoService {
  CONFIG_DESKey = '8008208820';
  constructor() { }
  encryptedDES(data: string) {
    const keyHex = CryptoJS.enc.Utf8.parse(this.CONFIG_DESKey);
    // 模式为ECB padding为Pkcs7
    const encrypted = CryptoJS.DES.encrypt(data, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    // 加密出来是一个16进制的字符串
    return encrypted.ciphertext.toString();
  }
  decryptedDES(data) {
    const keyHex = CryptoJS.enc.Utf8.parse(this.CONFIG_DESKey);
    const decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(data)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    // 以utf-8的形式输出解密过后内容
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
