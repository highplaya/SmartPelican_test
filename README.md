CREATE scripts:

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(145) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(145) DEFAULT NULL,
  `departmentId` int(11) DEFAULT NULL,
  `hired` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dep-emp` (`departmentId`),
  CONSTRAINT `dep-emp` FOREIGN KEY (`departmentId`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
