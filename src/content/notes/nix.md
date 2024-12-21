---
title: Nix
tags:
  - nix
  - nixos
  - flakes
  - configuration
  - devops
---

# Installation

[link to shell script](https://nixos.org/download.html#nix-install-macos)

https://nixos.wiki/wiki/Bcachefs
https://github.com/nix-community/disko

## Default Nix Config

```nix
{
	description = "Your discription would go here";
	inputs = {
		nixpkgs.url = "hithub:nixos/nixpkgs/nixpkgs-unstable";
	};
	outputs = {
	}
}
```

- [Rust](https://github.com/oxalica/rust-overlay)

[personal flake](https://github.com/gavdaly/nix-config)

- [DevBox](https://www.jetify.com/devbox/) -Simple setup for others, can you make a flake and then just host it?

- [Nix for startups](https://www.youtube.com/watch?v=WJZgzwB3ziE)

# Examples

https://www.youtube.com/watch?v=YHm7e3f87iY&list=PLAWyx2BxU4OyERRTbzNAaRHK08DQ0DD_l
https://github.com/EmergentMind/nix-config
https://github.com/erictossell/nixflakes
https://github.com/Misterio77/nix-config
https://github.com/Misterio77/nix-starter-configs
https://github.com/Icy-Thought/snowflake
https://github.com/ryan4yin/nix-config
https://github.com/ryan4yin/nixos-and-flakes-book/tree/main
https://github.com/cpu/rust-flake/blob/main/flake.nix

https://log.woodweb.ca/articles/rust-flake/

- [Anatomy of a NixOS Config](https://unmovedcentre.com/technology/2024/02/24/anatomy-of-a-nixos-config.html)
- [Writing your own NixOS modules for fun and (hopefully) profit](https://www.youtube.com/watch?v=SzyuLVzS5Fg_)

- [NixOS 63: Install NixOS 23.11 and Use Flakes Out Of the Box](https://www.youtube.com/watch?v=hoB0pHZ0fpI)
- https://www.youtube.com/watch?v=u-XDOnSSUzI
- https://www.youtube.com/playlist?app=desktop&list=PLyzwHTVJlRc8yjlx4VR4LU5A5O44og9in
- https://www.youtube.com/watch?v=9DJtHIpdp0Y
- https://nixos.asia/en/dev
- https://nixos.asia/en/nix-first
- https://nixos.wiki/wiki/NixOS_modules
- https://nix.dev/tutorials/nix-language
- https://zero-to-nix.com
- https://nixos.org/guides/nix-pills/03-enter-environment
- https://www.reddit.com/r/NixOS/
- https://www.youtube.com/watch?v=nLwbNhSxLd4

cachix

- https://github.com/cachix/install-nix-action

github runner

- https://nix-community.github.io/srvos/github_actions_runner/#authentication
- https://discourse.nixos.org/t/using-cloudflared-with-zero-trust-dashboard-on-nixos/19069

# To Add

## stalwart-mail

```nixos
services.stalwart-mail
```

## cal

https://github.com/calcom/cal.com
