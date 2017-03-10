-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 23, 2016 at 07:31 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `itech`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(250) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

INSERT INTO customer (firstName,lastName,address,email,phone) VALUES  
('firstName1','lastName1','address1','email1','phone1'),
('firstName2','lastName2','address2','email2','phone2'),
('firstName3','lastName3','address3','email3','phone3');

CREATE TABLE IF NOT EXISTS `customerDay` (
  `customerDayid` int(11) NOT NULL AUTO_INCREMENT,
  `date` date,
  customerid int(11) NOT NULL,
  CONSTRAINT Event_country FOREIGN KEY (customerid) REFERENCES customer(customer_id),
  PRIMARY KEY (customerDayid)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*
INSERT INTO customerDay VALUES
(1),
(2),
(3);
*/

CREATE TABLE IF NOT EXISTS `MRcategory` (
  `MRcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `mealRid` int(11) NOT NULL,
  CONSTRAINT Event_country FOREIGN KEY (mealRid) REFERENCES mealR(mealRid),
  PRIMARY KEY (MRcategoryid)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

INSERT INTO MRcategory (category) VALUES
('category1'),
('category2'),
('category3');

CREATE TABLE IF NOT EXISTS `mealR` (
  `mealRid` int(11) NOT NULL AUTO_INCREMENT,
  `requirment` varchar(50) NOT NULL,
  `categoryid` int(11) NOT NULL,
 CONSTRAINT Event_country FOREIGN KEY (categoryid) REFERENCES MRcategory(mealRid),
  PRIMARY KEY (mealRid)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

INSERT INTO mealR (requirment) VALUES
('requirment1'),
('requirment2'),
('requirment3');

CREATE TABLE IF NOT EXISTS `customerMR` (
  `customerid` int(11) NOT NULL,
  `mealRid` int(11) NOT NULL,
 CONSTRAINT Event_country FOREIGN KEY (customerid) REFERENCES customer(customer_id),
 CONSTRAINT Event_country2 FOREIGN KEY (mealRid) REFERENCES mealR(mealRid)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*
INSERT INTO customerMR VALUES
(1,10),
(2,11),
(3,12);
*/

CREATE TABLE IF NOT EXISTS `driver`(
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Dumping data for table `customer`
--

INSERT INTO driver (username, password, email, phone) VALUES
('username1','password1','email1','phone1'),
('username2','password2','email2','phone2'),
('username3','password3','email3','phone3');
