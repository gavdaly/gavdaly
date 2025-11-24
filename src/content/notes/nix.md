---
title: Nix
tags:
  - nix
  - nixos
  - flakes
  - configuration
  - devops
---

I've just started to use nix and nixos, my [personal config](https://github.com/gavdaly/nix-config) is just getting started.

## Installation

[link to shell script](https://nixos.org/download.html#nix-install-macos)

[bcachefs](https://nixos.wiki/wiki/Bcachefs)
[disko](https://github.com/nix-community/disko)

### Default Nix Config

```nix
{
  description = "Your description would go here";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
  };
  outputs = {
  };
}
```

- [Rust](https://github.com/oxalica/rust-overlay)

- [DevBox](https://www.jetify.com/devbox/) -Simple setup for others, can you make a flake and then just host it?

- [Nix for startups](https://www.youtube.com/watch?v=WJZgzwB3ziE)

## Examples

- [Anatomy of a NixOS Config](https://www.youtube.com/watch?v=YHm7e3f87iY&list=PLAWyx2BxU4OyERRTbzNAaRHK08DQ0DD_l)
- [EmergentMind example](https://github.com/EmergentMind/nix-config)
- [erictossell example](https://github.com/erictossell/nixflakes)
- [Misterio77 example](https://github.com/Misterio77/nix-config)
- [Misterio77 starter](https://github.com/Misterio77/nix-starter-configs)
- [Icy-Thought example](https://github.com/Icy-Thought/snowflake)
- [ryan4yn example](https://github.com/ryan4yin/nix-config)
- [ryan4yn book](https://github.com/ryan4yin/nixos-and-flakes-book)
- [rust flake](https://github.com/cpu/rust-flake/)

## Links

- [A Beyond-the-basics Rust Flake](https://log.woodweb.ca/articles/rust-flake/)

- [NixOS Resources](https://unmovedcentre.com)
- [Writing your own NixOS modules for fun and (hopefully) profit](https://www.youtube.com/watch?v=SzyuLVzS5Fg_)

- [NixOS 63: Install NixOS 23.11 and Use Flakes Out Of the Box](https://www.youtube.com/watch?v=hoB0pHZ0fpI)
- [The Nix Hour](https://www.youtube.com/playlist?app=desktop&list=PLyzwHTVJlRc8yjlx4VR4LU5A5O44og9in)
- [Informal intro to the Nix language, derivations and nixpkgs](https://www.youtube.com/watch?v=9DJtHIpdp0Y)
- [Wiki](https://nixos.wiki/)
- [nix.dev](https://nix.dev/)
- [zero to nix](https://zero-to-nix.com)
- [reddit](https://www.reddit.com/r/NixOS/)
- [Full NixOS Guide: Everything You Need to Know in One Place!](https://www.youtube.com/watch?v=nLwbNhSxLd4)

- [cachix](https://github.com/cachix/install-nix-action)

github runner

- [github actions runner](https://nix-community.github.io/srvos/github_actions_runner/)
- [Using cloudflared with Zero Trust Dashboard on NixOS](https://discourse.nixos.org/t/using-cloudflared-with-zero-trust-dashboard-on-nixos/19069)

## To Add

## stalwart-mail

```nix
services.stalwart-mail
```

## cal

<https://github.com/calcom/cal.com>
