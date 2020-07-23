# network-monitor
A simple website built with [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/) and [MySQL](https://www.mysql.com/) / [MariaDB](https://mariadb.org/) to automatically measure your network speeds.
The results can then be viewed and filtered on the site in a list or graph format.

**Note**: This project uses [speedtest-net](https://www.npmjs.com/package/speedtest-net) to run the speed tests. When you run the site [Ookla](https://www.ookla.com/consumer)'s [Terms of Use](https://www.speedtest.net/about/terms) and [Privacy Policy](https://www.speedtest.net/about/privacy) are automatically accepted.
By running this site you also agree to their terms.

## Setup and Installation

## Database Setup
This site requires a MySQL server to be running. I recommend using [MariaDB](https://mariadb.org/) although you can use an alternative.
See [here](https://downloads.mariadb.org/) for installation instructions or look below for the Linux instructions.

### MariaDB Setup on Linux (debian based)
- `sudo apt -y install mariadb-server`  
- `sudo mysql_secure_installation` 
    - Skip root password as none has been set yet. 
    - Don't set a root password. ([reference](https://www.digitalocean.com/community/tutorials/how-to-install-mariadb-on-ubuntu-18-04#step-2-%E2%80%94-configuring-mariadb))
    - "y" to accept all default.  
- `sudo mysql` - For initial access. Follow the next step to make an admin account.  

**Global Admin User Setup**
- `CREATE USER admin@localhost IDENTIFIED BY 'password';`
- `GRANT ALL ON *.* TO admin@localhost IDENTIFIED BY 'password' WITH GRANT OPTION;` 
- `FLUSH PRIVILEGES;`

### Database Setup
**User & Database Setup**
- `CREATE USER network_monitor@localhost IDENTIFIED BY 'password';`
- `CREATE DATABASE network_monitor;`
- `GRANT ALL PRIVILEGES ON network_monitor.* TO network_monitor@localhost;`
- `USE network_monitor;`
```
CREATE TABLE IF NOT EXISTS speed_tests (
    id INT NOT NULL AUTO_INCREMENT,
    test_date DATE NOT NULL,
    test_time TIME NOT NULL,
    ping_speed DECIMAL(5,2) UNSIGNED NOT NULL,
    download_speed DECIMAL(5,2) UNSIGNED NOT NULL,
    upload_speed DECIMAL(5,2) UNSIGNED NOT NULL,
    PRIMARY KEY (id)
);
```
- `DESCRIBE speed_tests;` should return:
```
+----------------+-----------------------+------+-----+---------+----------------+
| Field          | Type                  | Null | Key | Default | Extra          |
+----------------+-----------------------+------+-----+---------+----------------+
| id             | int(11)               | NO   | PRI | NULL    | auto_increment |
| test_date      | date                  | NO   |     | NULL    |                |
| test_time      | time                  | NO   |     | NULL    |                |
| ping_speed     | decimal(5,2) unsigned | NO   |     | NULL    |                |
| download_speed | decimal(5,2) unsigned | NO   |     | NULL    |                |
| upload_speed   | decimal(5,2) unsigned | NO   |     | NULL    |                |
+----------------+-----------------------+------+-----+---------+----------------+
```

### Project Setup
- Run `npm install` to setup the project.
- Copy `example.config.json` to `config.json` and edit if necessary.
- Build the website with `gulp build`
- Use `node app` to run the application.

## Running the server in the background
There are many ways to get the server to run in the background, but I use [systemd](https://systemd.io/).
The setup is shown below:

1. `sudo vim /lib/systemd/system/network-monitor.service`
2 Add the following:
```
[Unit]
Description=app.js - Website monitoring you network speeds. 
Documentation=https://github.com/Ben-Ryder/network-monitor
After=network.target

[Service]
Type=simple
User=pi
ExecStart=/usr/bin/node /home/pi/network-monitor/app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
3. `sudo systemctl daemon-reload`
4. `sudo systemctl start network-monitor`
5. `sudo systemctl enable network-monitor`
6. To view status: `sudo systemctl status network-monitor`  
7. To restart: `sudo systemctl restart network-monitor`  
(See [this nodesource.com article](https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/) for more info.)  

## Development
All development can be done through the gulp task `gulp develop`.
This task bundles:
- broswer-sync refresh for templates & styling. 
- nodemon for node server restarting.                                     
- gulp watch for sass changes
