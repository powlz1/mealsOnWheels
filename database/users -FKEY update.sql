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

CREATE TABLE IF NOT EXISTS customer (
  customer_id int(11) NOT NULL AUTO_INCREMENT,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  address varchar(100) NOT NULL,
  email varchar(50) NOT NULL,
  phone varchar(250) NOT NULL,
  PRIMARY KEY (customer_id)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS customerDay (
  customerDayid int(11) NOT NULL AUTO_INCREMENT,
  customerid int(11) NOT NULL,
  CONSTRAINT customerDay_customerDay FOREIGN KEY (customerid) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY (customerDayid)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;





CREATE TABLE IF NOT EXISTS MRcategory (
  MRcategoryid int(11) NOT NULL AUTO_INCREMENT,
  category varchar(50) NOT NULL,
  mealRid int(11) NOT NULL,
  CONSTRAINT MRcategory_mealR FOREIGN KEY (mealRid) REFERENCES mealR(mealRid) ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY (MRcategoryid)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;





CREATE TABLE IF NOT EXISTS customerMR (
  customerid int(11) NOT NULL,
  mealRid int(11) NOT NULL,
 CONSTRAINT customerMR_customer FOREIGN KEY (customerid) REFERENCES customer(customer_id) ON DELETE SET NULL ON UPDATE CASCADE,
 CONSTRAINT customerMR_mealR FOREIGN KEY (mealRid) REFERENCES mealR(mealRid) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;




CREATE TABLE IF NOT EXISTS mealR (
  mealRid int(11) NOT NULL AUTO_INCREMENT,
  requirment varchar(50) NOT NULL,
  categoryid int(11) NOT NULL,
 CONSTRAINT mealR_MRcategory FOREIGN KEY (categoryid) REFERENCES MRcategory(mealRid) ON DELETE SET NULL ON UPDATE CASCADE,
  PRIMARY KEY (mealRid)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



CREATE TABLE IF NOT EXISTS driver(
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  email varchar(50) NOT NULL,
  phone varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


INSERT INTO customerDay(customerid) VALUES
(1),
(2),
(3);

INSERT INTO MRcategory (category, mealRid) VALUES
('category1',1),
('category2',2),
('category3',3);


INSERT INTO customerMR(customerid,mealRid) VALUES
(1,1),
(2,2),
(3,3);

INSERT INTO mealR (requirment,categoryid ) VALUES
('requirment1',1),
('requirment2',2),
('requirment3',3);

INSERT INTO customer VALUES  
('1','firstName1','lastName1','address1','email1','phone1'),
('2','firstName2','lastName2','address2','email2','phone2'),
('3','firstName3','lastName3','address3','email3','phone3');

INSERT INTO driver (username, password, email, phone) VALUES
('username1','password1','email1','phone1'),
('username2','password2','email2','phone2'),
('username3','password3','email3','phone3');
