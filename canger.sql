/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 5.5.60 : Database - canger
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`canger` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `canger`;

/*Table structure for table `basicinfo` */

DROP TABLE IF EXISTS `basicinfo`;

CREATE TABLE `basicinfo` (
  `u_name` varchar(255) DEFAULT NULL,
  `IP` varchar(255) DEFAULT NULL,
  `visit_date` year(4) DEFAULT NULL,
  `visit_time` datetime DEFAULT NULL,
  `leave_date` year(4) DEFAULT NULL,
  `leave_time` datetime DEFAULT NULL,
  `u_identity` varchar(255) DEFAULT NULL,
  `u_source_territory` varchar(255) DEFAULT NULL,
  `u_computer_type` varchar(255) DEFAULT NULL,
  `u_OS` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `basicinfo` */

insert  into `basicinfo`(`u_name`,`IP`,`visit_date`,`visit_time`,`leave_date`,`leave_time`,`u_identity`,`u_source_territory`,`u_computer_type`,`u_OS`) values ('ldw','192.168.5.3',2018,'2018-03-12 09:36:17',NULL,NULL,NULL,NULL,NULL,NULL),('lyc','192.168.2.3',2018,'2018-03-21 09:35:38',NULL,NULL,NULL,NULL,NULL,NULL),('xak','192.168.7.1',2018,'2018-02-07 09:36:07',NULL,NULL,NULL,NULL,NULL,NULL),('dxm','192.168.5.9',2018,'2018-03-02 09:35:15',NULL,NULL,NULL,NULL,NULL,NULL),('hmr','192.168.8.6',2017,'2017-03-17 09:35:19',NULL,NULL,NULL,NULL,NULL,NULL),('cxp','192.168.9.1',2017,'2017-03-01 09:35:34',NULL,NULL,NULL,NULL,NULL,NULL),('lyc','192.168.2.3',2017,'2017-03-21 09:35:38',NULL,NULL,NULL,NULL,NULL,NULL),('ldw','192.168.8.7',2019,'2019-03-12 09:36:17',NULL,NULL,NULL,NULL,NULL,NULL),('xak','192.168.9.3',2019,'2019-03-22 09:36:07',NULL,NULL,NULL,NULL,NULL,NULL),('xak','192.168.9.3',2019,'2019-02-07 09:36:07',NULL,NULL,NULL,NULL,NULL,NULL),('ldw','192.168.8.7',2019,'2019-03-12 09:36:17',NULL,NULL,NULL,NULL,NULL,NULL),('lyc','192.168.4.3',2019,'2019-02-02 09:36:20',NULL,NULL,NULL,NULL,NULL,NULL),('ldw','192.168.7.9',2018,'2019-03-22 10:58:07',NULL,NULL,NULL,NULL,NULL,NULL),('xak','192.168.9.7',2018,'2019-03-23 12:58:19',NULL,NULL,NULL,NULL,NULL,NULL);

/*Table structure for table `clickinfo` */

DROP TABLE IF EXISTS `clickinfo`;

CREATE TABLE `clickinfo` (
  `u_name` varchar(255) DEFAULT NULL,
  `click_content` varchar(255) DEFAULT NULL,
  `IP` varchar(255) DEFAULT NULL,
  `click_time` datetime DEFAULT NULL,
  `source_territory` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `clickinfo` */

/*Table structure for table `department` */

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `department` */

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` int(2) DEFAULT NULL,
  `d_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `employee` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`account`,`password`,`name`,`age`,`sex`,`tel`,`address`) values (1,'16103330135','123456','lyc',NULL,NULL,NULL,NULL),(2,'l1610',NULL,NULL,NULL,NULL,NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
