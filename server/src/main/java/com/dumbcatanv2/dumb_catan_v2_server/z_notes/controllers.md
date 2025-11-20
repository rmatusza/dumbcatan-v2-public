## @RequiredArgsConstructor
- Recommended over field injection (@Autowired) by Spring team
- Safer for immutability/testability
- `NOTE:` requires lombok
  - added as a dependency to pom but that didn't work
  - had to install lombok plugin from intellij marketplace
  - hovered over the annotation and clicked "add lombok to classpath" which resolved the issue