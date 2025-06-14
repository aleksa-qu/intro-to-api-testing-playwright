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


| #  | Name                                                                                                  | Testing Data        |
|----|-------------------------------------------------------------------------------------------------------|---------------------|
| 1  | Successful calculation of risk with income greater than 0 returns 200                                 | 1, 100, 1000, 10000 |
| 2  | Unsuccessful calculation of risk with income 0 returns 400                                            | 0                   |
| 3  | Unsuccessful calculation of risk with negative income returns 400                                     | -1                  |
| 4  | Unsuccessful calculation of risk with empty income returns 400                                        | NULL                |
| 5  | Successful calculation of risk with positive debt returns 200                                         | 1, 100, 1000        |
| 6  | Unsuccessful calculation of risk with negative debt returns 400                                       | -1                  |
| 7  | Successful calculation of risk with empty debt returns 200                                            | NULL                |
| 8  | Successful calculation of risk with age greater than 16 returns 200                                   | 17, 40, 60          |
| 9  | Unsuccessful calculation of risk with age 16 or younger returns 200, but negative risk decision       | 1, 8, 16            |
| 10 | Unsuccessful calculation of risk with empty age returns 400                                           | NULL                |
| 11 | Unsuccessful calculation of risk with negative age returns 400                                        | -1                  |
| 12 | Successful calculation of High risk returns 200                                                       | 3,6                 |
| 13 | Successful calculation of Medium risk returns 200                                                     | 6, 9, 12            |      |
| 14 | Successful calculation of Low Risk returns 200                                                        | 12, 18, 24, 30, 36  |
| 15 | Unsuccessful calculation of risk with empty loan period returns 400                                   | NULL                |
| 16 | Unsuccessful calculation of risk with 0 months loan period returns 400                                | 0                   |
| 17 | Unsuccessful calculation of risk with negative loan period returns 400                                | -1                  |
| 18 | Unsuccessful calculation of risk with less than 3 months returns 200, but unknown risk result         | 1, 2                |
| 19 | Successful calculation of risk with loan amount greater than 0 returns 200                            | 1, 100, 1000        |
| 20 | Unsuccessful calculation of risk with loan amount 0 returns 400                                       | 0                   |
| 21 | Unsuccessful calculation of risk with negative loan amount returns 400                                | -1                  |
| 22 | Unsuccessful calculation of risk with empty loan amount returns 400                                   | NULL                |
| 23 | Unsuccessful calculation of risk with empty fields returns 400                                        | NULL                |
| 24 | Successful calculation of risk with employment status true returns 200                                | true                |
| 25 | Unsuccessful calculation of risk with employment status false returns 200, but negative risk decision | false               |
