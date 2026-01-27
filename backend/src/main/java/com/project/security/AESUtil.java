package com.project.security;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

public class AESUtil {

    private static final String ALGO = "AES/CBC/PKCS5Padding";

    private static final String SECRET_KEY =
            "A9fK3Qx7mR2D8pLZsWcT4H6N5BvJYEUg"; // move to env later

    public static String encrypt(String plainText) {
        try {
            byte[] iv = new byte[16];
            new SecureRandom().nextBytes(iv);

            Cipher cipher = Cipher.getInstance(ALGO);
            cipher.init(
                    Cipher.ENCRYPT_MODE,
                    new SecretKeySpec(SECRET_KEY.getBytes(), "AES"),
                    new IvParameterSpec(iv)
            );

            byte[] encrypted = cipher.doFinal(
                    plainText.getBytes(StandardCharsets.UTF_8));

            byte[] combined = new byte[iv.length + encrypted.length];
            System.arraycopy(iv, 0, combined, 0, iv.length);
            System.arraycopy(encrypted, 0, combined, iv.length, encrypted.length);

            return Base64.getEncoder().encodeToString(combined);
        } catch (Exception e) {
            throw new RuntimeException("Encryption failed");
        }
    }

    public static String decrypt(String encryptedText) {
        try {
            byte[] decoded = Base64.getDecoder().decode(encryptedText);

            byte[] iv = new byte[16];
            byte[] cipherText = new byte[decoded.length - 16];

            System.arraycopy(decoded, 0, iv, 0, 16);
            System.arraycopy(decoded, 16, cipherText, 0, cipherText.length);

            Cipher cipher = Cipher.getInstance(ALGO);
            cipher.init(
                    Cipher.DECRYPT_MODE,
                    new SecretKeySpec(SECRET_KEY.getBytes(), "AES"),
                    new IvParameterSpec(iv)
            );

            return new String(cipher.doFinal(cipherText),
                    StandardCharsets.UTF_8);

        } catch (Exception e) {
            throw new RuntimeException("Decryption failed");
        }
    }
}
