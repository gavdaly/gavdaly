---
title: Encryption
tags:
  - encryption
  - security
---

## SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

## Algorithms

| Algorithm Name     | Type       | Security Level           | Use Cases                    |
| ------------------ | ---------- | ------------------------ | ---------------------------- |
| **AES**            | Symmetric  | Highly Secure            | TLS, File Encryption, VPNs   |
| **ChaCha20**       | Symmetric  | Highly Secure            | TLS, Mobile Encryption       |
| DES                | Symmetric  | Weak (Deprecated)        | Legacy Systems               |
| 3DES               | Symmetric  | Moderate                 | Legacy Banking Systems       |
| Blowfish           | Symmetric  | Moderate                 | File Encryption, VPNs        |
| RSA                | Asymmetric | Secure (With Large Keys) | Digital Signatures, TLS, SSH |
| **Curve25519**     | Asymmetric | Highly Secure            | TLS, Cryptographic Wallets   |
| **NIST**           | Asymmetric | Highly Secure            | TLS, Cryptographic Wallets   |
| **Diffie-Hellman** | Asymmetric | Secure                   | Key Exchange, VPNs           |
| **DSA**            | Asymmetric | Secure                   | Digital Signatures           |
| **Kyber**          | Asymmetric | Post-Quantum Secure      | Key Exchange, TLS            |
| **Dilithium**      | Asymmetric | Post-Quantum Secure      | Digital Signatures           |
| **Falcon**         | Asymmetric | Post-Quantum Secure      | Digital Signatures           |
| **BIKE**           | Asymmetric | Post-Quantum Secure      | Key Exchange                 |
| **NTRU**           | Asymmetric | Post-Quantum Secure      | Public Key Encryption        |
| **SPHINCS+**       | Asymmetric | Post-Quantum Secure      | Digital Signatures           |

### Curve25519

Crate: [ring](https://docs.rs/ring/latest/ring/)
Type: Asymmetric
Security: Highly Secure
Use Cases: TLS, Cryptographic Wallets
Key Exchange Method: Public/Private Key
Computational Complexity: High

Curve25519 is a high-speed elliptic curve designed for use in asymmetric cryptography and key agreement.

Key features:

- 32-byte public keys
- 32-byte private keys
- Provides ~128 bits of security
- Fast and constant-time operations
- Built into many protocols like TLS 1.3

### NIST

Crate: [ring](https://docs.rs/ring/latest/ring/)
Type: Asymmetric
Security: Highly Secure
Use Cases: TLS, Cryptographic Wallets
Key Exchange Method: Public/Private Key
Computational Complexity: High

NIST elliptic curves are standardized curves commonly used in cryptographic protocols. In Rust, you can use them via the `ring` crate:

Key features:

- P-256: 256-bit keys (~128-bit security)
- P-384: 384-bit keys (~192-bit security)
- P-521: 521-bit keys (~256-bit security)
- Widely used in PKI and TLS
- FIPS 140-2 validated implementations available

### NTRU

Crate: [pgcrypto-ntru](https://docs.rs/pqcrypto-ntru/latest/pqcrypto_ntru/)

NTRU (N-th degree TRUncated polynomial ring) is a lattice-based cryptosystem.

Key features:

- Post-quantum secure
- Fast encryption/decryption operations
- Compact keys and ciphertexts
- Believed resistant to quantum computer attacks
- Active area of research and standardization

### AES - Advanced Encryption Standard (Symmetric)

AES is a widely-used symmetric block cipher providing fast, secure encryption. In Rust, you can use it via the `aes-gcm` crate for authenticated encryption:

Key features:

- Supports 128-bit, 192-bit, and 256-bit key sizes
- GCM mode provides authenticated encryption
- CBC mode available for legacy compatibility
- Fast hardware acceleration on modern CPUs
- FIPS certified implementations available

### ChaCha20 (Symmetric)

ChaCha20 is a high-performance stream cipher that's often paired with Poly1305 for authenticated encryption. It's designed to be faster than AES on platforms without dedicated hardware acceleration. In Rust, you can use it via the `chacha20poly1305` crate:

Key features:

- 256-bit key size
- 96-bit nonce
- High performance in software
- No padding required
- Authenticated encryption with Poly1305
- Widely used in TLS 1.3 and WireGuard

## Terminology

### Asymmetric

Asymmetric algorithms use a public key and a private key. They are used when you want to publicly share an encryption key and keep the decryption key private.

### Symmetric

Symmetric algorithms have one key that encrypts and decrypts the data.
