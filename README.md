# internet-monitor
A simple website built with nodejs, expressJS and mysql to automatically measure your network speeds.
The results can them be viewed and filtered on the site in a list or graph format.

## Setup and Installation

**Prerequisites**  
speedtest-cli

** mysql /mariadb **
- install mysql/mariadb
- `CREATE USER 'speedtest-user'@'localhost' IDENTIFIED BY 'speedtest-password';`
- `CREATE DATABASE speedtest;`
- `USE speedtest;`
```
CREATE TABLE tests (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
```


mysql (mariadb)
+ must provide user details + host to config.
+ database & table made when the server starts (if it doesnt exist)

**Running server in background**  
for ubuntu/raspbian you can use systemd and define a new service.

## Development

broswer-sync  
nodemon  
gulp
