-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: luanvan
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `idsanpham` int NOT NULL,
  `sanphamten` varchar(255) DEFAULT NULL,
  `sanphamgia` float DEFAULT NULL,
  `sanphammota` varchar(255) DEFAULT NULL,
  `sanphamgioitinh` varchar(45) DEFAULT NULL,
  `idchatlieu` int DEFAULT NULL,
  `idkieumat` int DEFAULT NULL,
  `idthuonghieu` int DEFAULT NULL,
  `idkichthuoc` int DEFAULT NULL,
  `idloaimay` int DEFAULT NULL,
  `sanphamhinhdaidien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idsanpham`),
  KEY `fk_kieumat_idx` (`idkieumat`),
  KEY `fk_chatlieu_idx` (`idchatlieu`),
  KEY `fk_thuonghieu_idx` (`idthuonghieu`),
  KEY `fk_kichthuoc_idx` (`idkichthuoc`),
  KEY `fk_loaimay_idx` (`idloaimay`),
  CONSTRAINT `fk_chatlieu` FOREIGN KEY (`idchatlieu`) REFERENCES `chatlieu` (`idchatlieu`),
  CONSTRAINT `fk_kichthuoc` FOREIGN KEY (`idkichthuoc`) REFERENCES `kichthuoc` (`idkichthuoc`),
  CONSTRAINT `fk_kieumat` FOREIGN KEY (`idkieumat`) REFERENCES `kieumat` (`idkieumat`),
  CONSTRAINT `fk_loaimay` FOREIGN KEY (`idloaimay`) REFERENCES `loaimay` (`idloaimay`),
  CONSTRAINT `fk_thuonghieu` FOREIGN KEY (`idthuonghieu`) REFERENCES `thuonghieu` (`idthuonghieu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,'Casio 1',90,'Day la dong ho','Nam',1,1,1,1,1,'https://wscdn.vn/upload/image/1-KHUNG-SP-6676612-550872714.webp'),(2,'Hublot',200,'Dong ho onl','Nữ',1,3,2,1,2,'https://wscdn.vn/upload/image/1-KHUNG-SP-1383270855-177077930.webp');
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-22 21:28:09
