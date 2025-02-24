---
title: "Understanding Encryption"
publishedAt: 2024-12-22
description: "A dive into the crucial difference between encrypted transport and encrypted data, and why this distinction matters for your privacy and security."
postState: "idea"
tags:
  - encryption
  - privacy
  - security
---

## The Encryption Misconception

When you hear "your data is encrypted," most people imagine their information being completely unreadable to anyone except themselves. The much more nuanced and depends entirely on **where** and **when** the data is decrypted. Understanding this difference is crucial for making informed decisions about your privacy and security.

Data can also be encrypted many times and still be decrypted. The data can be encrypted many times and still be able to reverse the process.

## Where Encryption Happens

1. **Transport Encryption** (like HTTPS):

   - Protects data while it's moving between points
   - This is the green padlock in your browser
   - Like an armored car moving valuable cargo
   - Once delivered, the data is "unboxed" and readable
   - Examples: Website connections, basic email transmission

2. **End-to-End Encryption**:

   - Protects the actual content regardless of where it's stored
   - Like a locked safe that moves with your valuables
   - Stays encrypted until you specifically decrypt it
   - Examples: Signal messages, properly configured email encryption

> for end-to-end video calls, the video is encrypted on your device and decrypted on the recipient's device. The service provider cannot see the video.

## Following Your Data's Journey

Let's trace what happens to your data in two common scenarios:

### What Most Services Use

1. You fillout a form on your device
2. The _data_ is sent through an encrypted connection (HTTPS)
3. It arrives at the service's servers and the _data_ is decrypted
4. The service processes and stores your _data_
5. When requested, the service retrieves and reads your _data_
6. The _data_ is sent back through an encrypted connection
7. You see the decrypted _data_ on your screen

The critical point here is that the service provider can read your data at steps 3-5.

### True End-to-End Encryption

1. You fillout a from on your device
2. The _data_ is encrypted on your device
3. The encrypted _data_ travels through encrypted connections
4. The service stores the _data_, but cannot read it
5. The recipient's device downloads the encrypted _data_
6. The _data_ is decrypted on your device
7. You see the decrypted _data_ on your screen

## Common Misconceptions

### Email: Not as Private as You Think

Most email services encrypt the connection between you and their servers (transport encryption). However, once your email arrives at the server:

- The service can read your emails
- Emails can travel unencrypted between different email providers
- Your emails are typically stored unencrypted on servers

To achieve [email privacy](/posts/encryption-email), you need to use additional encryption like PGP or S/MIME.

### The Password Reset Understanding

If a service can reset your password and you don't lose access to your encrypted data, it means they can access your data. True end-to-end encryption means:

- Only you have the decryption keys
- If you lose your password/keys, your data is permanently inaccessible
- The service provider cannot help you recover your data

* A review of how popular services handle your data: [Apple, Microsoft, Google, and Self-hosted](/posts/encrypted-personal-data)

## Best Practices for Personal Security

To maximize your data security:

1. Use end-to-end encrypted messaging apps for sensitive communications
2. Enable full-disk encryption on all your devices
3. Use a password manager with local encryption
4. Be skeptical of services that claim "encryption" without specifying details
5. Remember: If a service can read your data, so can anyone who compromises that service

## The Bottom Line

When evaluating a service's security, always ask: "Who can decrypt my data, and when?" If the answer includes anyone besides you and your intended recipients, your data isn't truly private. Transport encryption is important but insufficient for sensitive information.

> Remember: The internet is like a public space. If your data isn't encrypted end-to-end, assume it is public.
