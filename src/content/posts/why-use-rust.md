---
title: "Why Use Rust"
publishedAt: 2024-09-22
description: "Journey Working in Public"
postState: "draft"
---

### Choosing rust for a few reasons.

### Type System

My favourite thing with Rust by far is the type system. It's easy to grok and really easy to comprehend once you get used to it. With the matching and the algebraic data types is really easy to understand. What data is being manipulated and how it's being manipulated.

```rust
fn is_palindrome(name: &str>) -> bool {
    match name {
        [first, ..@ next, last] => {
            if first == last {
                is_palindrome(next)
            } else {
                false
            }
        }
        [_] | [] => true,
    }
}
```

##### New Type Pattern

```rust
struct Kilometers(u32);
struct Miles(u32);

impl Into<Miles> for Kilometers {
    fn into(self) -> Miles {
        Miles((self.0 as f32 * 0.621371) as u32)
    }
}

let distance = Kilometers(100);
let miles = distance.into::<Miles>();
```

#### Compile time checks

I often don't have to run the code to see if it's going to work. I can see it in the editor.

##### Compile times?

They have had a huge improvement, I don't really notice them anymore.

#### Enums with Data

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

#### WASM

It can be used on the web. Do I really need to say more?

#### Computer Architectures

Runs on most architectures.

#### Microcontrollers

Runs on the most common microcontrollers.

### Welcoming Community

People are really nice and helpful. They are always willing to help you out.

### Newer resources

There are a lot of new resources coming out for Rust. It's a really exciting time to be learning Rust.

### Old code still compiles!

Having backwards compatibility is a huge plus. You don't have to worry about the compiler or language changing and breaking your code.

### The industry is using it

It's being used in a lot of places. It's not just a toy language.

### It maintained by a foundation and community

It's not just one person or company that's maintaining it. It's a community effort. I think this is a huge plus, it make the language take more time to make decisions, but it makes the language well thought out. I was just writing som ECMAScript and missed my postfixed `await`.
