## Lombok
- `@Data`
  - Generates getters, setters, equals, hashCode, toString
- `@NoArgsConstructor`
  - Spring needs a no-argument constructor to instantiate the object during JSON deserialization
  - Jackson (used by Spring to deserialize JSON) prefers a no-arg constructor unless you go full “immutable + @JsonCreator” style
- `@AllArgsConstructor`
  - creates a constructor that sets values for every field