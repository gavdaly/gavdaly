interface Social {
  image?: string;
  label: string;
  link: string;
}

interface Presentation {
  title: string;
  description: string;
  socials: Social[];
  profile?: string;
}

export const presentation: Presentation = {
  title: "Hi, I’m Gavin",
  profile: "/profile.jpg",
  description: "Developer from Canada 🇨🇦. I like to build things with code.",
  socials: [
    {
      label: "GitHub",
      link: "https://github.com/gavdaly",
      image: "github",
    },
    // {
    //   label: "Nostr",
    //   link: "https://snort.social/p/npub1f78kggwlt3pfjtwaxgqw80xlp5vqnux6zjmr0hrg2fzwksjr0sts8shlsu",
    //   image: "nostr",
    // },
    {
      label: "Telegram",
      link: "https://t.me/gavdaly",
      image: "telegram",
    },
    // {
    //   label: "Mastodon",
    //   link: "https://indiehackers.social/@gav",
    //   image: "mastodon",
    // },
  ],
};
