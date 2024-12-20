---
title: "People Don't Understand Encryption"
publishedAt: 2024-12-22
description: "I find many people get confused between encrypted transport and encrypted data. The biggest gap is with email. Most people’s emails aren’t encrypted. The communication between the server"
postState: "idea"
---

I find many people get confused between encrypted transport and encrypted data.

The biggest gap is with email. Most people’s emails aren’t encrypted. The communication between the server

The way to think is if your data isn’t encrypted on the internet then it’s public.

I find this has the biggest problem where people think that encrypted transmission is encrypted data. People also think that end to end encryption is completely safe.

There’s a big difference between Encrypted on disk and encrypted transmission. If it is encrypted on the desk or in the database, that means that even the users of the company can’t access, the information is raw data encrypted transmission is just where you are sending the data over the Internet and it’s Less likely to be intercepted by a third-party.

The other one that confuses people is email. This is slightly different because send it to the server is encrypted, but once it’s on your server, it is not encrypted and when goes to the other person server, it’s not encrypted as well. The Way to do this now is to set up SMI encryption. TODO! Show how to set it up.

### Encrypting Your Personal Data

#### Apple

As of The end of 2024 Apple is the only one that allows you to fully enter to end encrypt your day that that is only visible by you.

TODO! Show the instructions on how to encrypt data for iCloud so it’s end to end so that no one not even Apple can see it.

#### Microsoft

Microsoft is the second best they will enter and encrypt the data, but they have the description key stored on their servers so that they can decrypt the data and do whatever they want with it. This is the third best option.

TODO! Show instructions on how to enable Microsoft encryption for their

#### Google

well, this one simple they don’t allow it at all.

#### Linux

this one is all up to you. There are many ways to do it. You can make your own cloud many different ways, but that’s the whole thing with Lennox. There’s multiple ways to do things and it’s all up to you to make sure you follow best practises if I were to set up a personal cloud in Lennox what I would.

1. have full disk encryption for every computer
2. On every computer set up, `Tailscale`
3. I will create `Tailscale` shares as well, so that’s easier to share just through the network
4. On a server of your choosing, I would then install `next cloud`
