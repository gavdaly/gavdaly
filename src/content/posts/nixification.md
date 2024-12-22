---
title: "The Nixification of My Home Lab"
publishedAt: 2024-09-19
description: "I have started to use `nixos` to manage all of my computers. This is what I have learned so far."
postState: "draft"
---

## Nixification

I have almost fully moved over to `nixos` for all of my [linux boxes](/projects/home-lab). I still have a few things to do but I am slowly getting there.

### easily add another computer

This is probably one of my favourite things where I can tweak config on one computer and then I'll have it on all my other computers and it just works. I'm currently using a few low powered computers that run a few services. I'm not worried about high availability or any complicated set up. I want them to run with the least overhead possible and the least effort which makes `nixos` perfect solution for this.

### no conflicts

I have conflicts all the time with packages or with versions of node or per Python and have to use virtualized environments and crazy stuff. I have use next to solve this solution. I have multiple packages and they don't conflict with each other in our essential store which is just perfect.

### Store public ssh keys so I can easily ssh into any machine I want

Having public keys stored and then distributed to everywhere is such a nice feature. It is so nice just to set up a box sensation to it and it's all ready to go and just working flawlessly.

### Getting the same version on my mac

I still have yet to get `nix-darwin` to work on my Mac, but it is definitely something. I'm looking forward to do in the future to have it all work seamlessly together.

### Todo still

I still have to move one more box over that is running the services that I use most often. But that box has been up for a year and hasn't crashed or went off-line yet so I'm not too worried about it. I'm just waiting to redo part of the work and then move it.

I also want to create a little cluster of raspberry pies and get them running `nixOS` and see how it goes working with a cluster of computers.

And last one is the `nix-darwin` on my Mac it just might be a Christmas project for myself.
