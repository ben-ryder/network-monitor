# network-monitor
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
CREATE TABLE [IF NOT EXISTS] tests (
    id INT NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    ping DECIMAL(4,2) NOT NULL,
    download DECIMAL(4,2) NOT NULL,
    upload DECIMAL(4,2) NOT NULL,
    PRIMARY KEY (id)
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
