---
title: "Why Use Rust"
publishedAt: 2024-09-22
description: "Journey Working in Public"
postState: "draft"
---

### Choosing rust for a few reasons

### Type System

My favourite thing with Rust by far is the type system. It's easy to grok and really powerful and convenient to use.

#### Compile time checks

I often don't have to run the code to see if it's going to work. I can see it in the editor.

##### Compile times?

They have had a huge improvement, I don't really notice them anymore.

#### Enums with Data

This is one of my favourite parts of rust, having a definitive data structure that has exclusive types.

```rust
enum Location {
    LatLong{lat: f64, lng: f64},
    Address(String),
    WhatThreeWords(String, String, String),
    Plus4(u16),
    Unknown,
}
```

### Multiple Architectures Including

It can be used everywhere, from the web to servers to microcontrollers. That's natively!

### Old code still compiles

Your old projects will still compile with newer versions of the compiler. No worrying about environment management; just use what is up to date.

### Single Binary

No environment variables to deal with; just copy one file and it'll just work.

No dependency issues to worry about, no version conflicts, or worry about missing something.

You can just drop it in any directory and run it. No installing or configuration needed.

You can just download it from the internet and run it. No need to worry about installing dependencies.

Very nice to deploy or share with others, just send them the binary.

### The Industry is Using it

It's being used in a lot of places. It's not just a toy language.

### It maintained by a foundation and community

It's not just one person or company that's maintaining it. It's a community effort. I think this is a huge plus; it makes the language take more time to make decisions, but it makes the language well thought out.

One of things that was debated a lot was how to implement the async/await syntax. In the end the postfix syntax was chosen. I was just writing some ECMAScript and missed my postfixed `await`. It makes chaining functions together so much easier.

Another benefit of having a community is they choose their favourite parts of other languages and bring them to Rust.
