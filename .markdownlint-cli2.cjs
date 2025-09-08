export default {
  globs: ["**/*.md", "!node_modules", "!dist", "!public"],
  config: {
    default: true,
    MD013: false, // line length
    MD033: false, // inline HTML allowed (common in Astro content)
  },
};
