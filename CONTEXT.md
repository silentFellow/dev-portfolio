# Portfolio Content

The data model behind the site's page sections, all defined as plain arrays in
`constants/index.ts`. There's no CMS or database — this file _is_ the content.

## Language

**Work Experience**: One employer in the experience timeline, with its role progression (e.g.
Intern → Software Engineer), dates, location and impact bullets. The resume is the source of
truth for this content. _Avoid_: Job, experience entry, timeline item

**Project**: A public portfolio piece shown in the projects showcase, with a title, description,
**Demo**, tech list and external links. _Avoid_: Work sample, case study

**Fork Credit**: The note on a **Project** built on someone else's repository, naming the upstream
and what was added on top of it. _Avoid_: Attribution, upstream note

**Demo**: The captured visual of a **Project** actually running: a short looping clip plus a
still used as its poster and reduced-motion fallback. _Avoid_: Screenshot, cover, thumbnail

**Skill Category**: A named group of **Skill Items** (Languages, Frontend, Backend & API, Databases,
Messaging & Streaming, DevOps & Tools, Development Tools), matching the resume. _Avoid_: Stack,
skill group

**Skill Item**: A single tool or language inside a **Skill Category**. _Avoid_: Tech stack item,
tool

**Blog Post**: An entry from the external blog's feed. Covers any of the author's thoughts, not only
tech (e.g. show reviews). _Avoid_: Article, tech post

**Achievement**: A certification or sustained milestone from the resume (e.g. MongoDB Associate,
LeetCode streak). _Avoid_: Award, badge

**Social Media Link**: An outbound link shown in the footer (GitHub, LinkedIn, blog). _Avoid_:
Footer link, social icon

**Window**: One section of the home page as named in the status line (whoami, about, log,
projects, ...). The site is one shell session; windows are its tmux windows. _Avoid_: Tab, page,
panel
