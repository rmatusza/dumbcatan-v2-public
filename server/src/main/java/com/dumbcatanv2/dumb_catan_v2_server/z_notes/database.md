## IDs
- should use long values for ids - this would be `BIGINT` in mysql - has range -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807
  signed and 0 to 18,446,744,073,709,551,615 unsigned
  - `NOTE:` INT has the following ranges -2,147,483,648 to 2,147,483,647 signed and 0 to 4,294,967,295 unsigned
  - `NOTE:` the () in BIGINT() and others is for the "display width" which is how many digits are visible -
            `It does not affect the range of values that can be stored`