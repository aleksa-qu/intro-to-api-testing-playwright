|#| Name                                                                                          |Testing data|
|-|-----------------------------------------------------------------------------------------------|------------|
|1| Successful order change with correct id                                                       | 1, 5, 10|
|2| Unsuccessful order change with incorrect id                                                   | 0,11|
|3| Unsuccessful order change with missing id                                                     | NULL|
|4| Unsuccessful order change with id written in incorrect format                                 | 'test"|
|5| Successful order delete with correct id                                                       | 1, 5, 10|
|6| Unsuccessful order delete with incorrect id                                                   | 0, 11|
|7| Unsuccessful order delete with missing id                                                     | NULL|
|8| Unsuccessful order delete with id written in incorrect format                                 |'test'|
|9| Successful authentication and return of API key with valid username and password in string format |'test','test'|
|10| Unsuccessful authentication with missing username and password                                | NULL|
