======== COMMIT GUIDE ================
type:

- feat A new feature.
- fix A bug fix.
- docs Documentation only changes.
- style Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
- refactor A code change that neither fixes a bug nor adds a feature.
- test Adding missing tests or correcting existing ones.
- chore Changes to the build process or auxiliary tools and libraries such as documentation generation.
- perf A code change that improves performance.
- ci Changes to your CI configuration files and scripts.
- build Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
- temp Temporary commit that won't be included in your CHANGELOG.

scope:

- Optional, can be anything specifying the scope of the commit change.
  For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc.
  In App Development, scope can be a page, a module or a component.

subject:

- Brief summary of the change in present tense. Not capitalized. No period at the end.

==== CAMADAS E DEPENDÊNCIAS ====

Camada | Pode depender de
Domain | ninguém
Application | Domain
Presentation | Application, Domain
Infrastructure | Domain, Libs, Frameworks, Drivers
