type Social = {
  image?: string;
  label: string;
  link: string;
};

type Presentation = {
  mail: string;
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
};

export const presentation: Presentation = {
  mail: "gavin@gavdaly.com",
  title: "Hi, I’m Gavin 👋",
  profile: "/profile.jpg",
  description: "Developer from Canada 🇨🇦. I like to build things with code.",
  socials: [
    {
      label: "Github",
      link: "https://github.com/gavdaly",
      image: "/svgs/github.svg",
    },
    {
      label: "Nostr",
      link: "https://snort.social/p/npub1f78kggwlt3pfjtwaxgqw80xlp5vqnux6zjmr0hrg2fzwksjr0sts8shlsu",
      image: "/nostr.png",
    },
    {
      label: "Telegram",
      link: "https://t.me/gavdaly",
    },
  ],
};
