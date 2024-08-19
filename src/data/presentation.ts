type Social = {
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

const presentation: Presentation = {
  mail: "gavin@gavdaly.com",
  title: "Hi, I’m Gavin 👋",
  profile: "/profile.jpg",
  description: "",
  socials: [
    {
      label: "X",
      link: "https://twitter.com/gavdaly",
    },
    {
      label: "Github",
      link: "https://github.com/gavdaly",
    },
  ],
};

export default presentation;
