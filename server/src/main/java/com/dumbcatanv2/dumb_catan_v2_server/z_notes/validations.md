## Validations
- the @Size annotation does not prevent null values so `when using @Size should still also use @NotNull`
- when you only need a minimum use `@NotBlank`
  - `@NotBlank also prevents null values` 
  - when validating a list of lists you can do the following if applicable:\
`@NotEmpty`\
`private List<@NotEmpty List<@NotBlank String>> tileOrder;`
    - this ensures that tileOrder is not null AND not empty
    - the inner @NotEmpty ensures that the inner list is not null and not empty
    - the @NotBlank ensures that the strings inside the inner list are not null and not empty
  - at a minimum when validating lists or lists of lists you should do:\
`@NotEmpty`\
`private List<List<String>> tileOrder;`
- when validating numerical values need to use the non-primitive wrapper class like Integer or Long so that @NotNull works