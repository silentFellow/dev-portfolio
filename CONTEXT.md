# Portfolio Content

The data model behind the site's page sections, all defined as plain arrays in
`constants/index.ts`. There's no CMS or database — this file _is_ the content.

## Language

**Service**: A short role badge shown in the hero section (e.g. "Go Developer", "Backend
Developer"). _Avoid_: Role, badge

**Work Experience**: A single entry in the resume/experience timeline, rendered as a card. _Avoid_:
Job, experience entry, timeline item

**Project**: A portfolio piece shown in the projects showcase, with a title, description,
screenshot, tech icon list, and external link. _Avoid_: Work sample, case study

**Skill Item**: A single entry in the tech-stack grid (a tool or language with an icon and short
label). _Avoid_: Tech stack item, tool

**Social Media Link**: An outbound link shown in the footer (GitHub, LinkedIn, blog). _Avoid_:
Footer link, social icon

**Section Wrapper**: The HOC (`StarWrapper`) that gives a page section its scroll-reveal animation
and its nav-anchor id. _Avoid_: Layout wrapper, animation wrapper
