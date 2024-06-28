/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Product
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Product` (
  `productId` varchar(50) NOT NULL,
  `title` varchar(50) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `show` int(11) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastUpdate` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`productId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Review
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Review` (
  `reviewId` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `rate` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reviewId`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: Users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` varchar(50) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `fullName` varchar(100) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tokens
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) DEFAULT '',
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expiration_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `FK_tokens_users` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 44 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Product
# ------------------------------------------------------------

INSERT INTO
  `Product` (
    `productId`,
    `title`,
    `description`,
    `image`,
    `price`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'cOnem',
    'TESTING',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos.\r\n\r\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos.',
    'pointblank_icon.png',
    50000,
    1,
    '2024-06-24 21:07:09',
    '2024-06-24 21:07:09'
  );
INSERT INTO
  `Product` (
    `productId`,
    `title`,
    `description`,
    `image`,
    `price`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'dlS9F',
    'test',
    'test',
    '/uploads/T21iWZHIb8.png',
    123,
    1,
    '2024-06-24 22:11:22',
    '2024-06-24 22:11:22'
  );
INSERT INTO
  `Product` (
    `productId`,
    `title`,
    `description`,
    `image`,
    `price`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'JfPPv',
    'testasd',
    'testing update product and upload',
    '/photoProducts/DTOx1dChfI.jpg',
    123,
    1,
    '2024-06-26 17:45:12',
    '2024-06-26 17:45:12'
  );
INSERT INTO
  `Product` (
    `productId`,
    `title`,
    `description`,
    `image`,
    `price`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'NzYWp',
    'asdasd',
    'product/uploadproduct/uploadproduct/upload',
    'nostalgia-icon.png',
    20000,
    1,
    '2024-06-24 21:29:22',
    '2024-06-24 21:29:22'
  );
INSERT INTO
  `Product` (
    `productId`,
    `title`,
    `description`,
    `image`,
    `price`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'VBDCL',
    'TESTING 2',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos.\r\n\r\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos.',
    'pointblank_icon.png',
    100000,
    1,
    '2024-06-24 21:27:04',
    '2024-06-24 21:27:04'
  );
INSERT INTO
  `Product` (
    `productId`,
    `title`,
    `description`,
    `image`,
    `price`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'vjwqC',
    'test',
    'test',
    '/uploads/BdJ4REYAMD.png',
    12313,
    1,
    '2024-06-24 22:13:58',
    '2024-06-24 22:13:58'
  );
INSERT INTO
  `Product` (
    `productId`,
    `title`,
    `description`,
    `image`,
    `price`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'Vtz83',
    'test 2',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos.',
    '1.png',
    12345,
    1,
    '2024-06-24 20:57:37',
    '2024-06-24 20:57:37'
  );
INSERT INTO
  `Product` (
    `productId`,
    `title`,
    `description`,
    `image`,
    `price`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'YcPxG',
    'testas ',
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis, vel harum maxime dolorem perspiciatis similique consequuntur maiores, reiciendis enim adipisci officiis non ducimus dolore distinctio, sunt saepe ratione amet quos.',
    'nostalgia-icon.png',
    20000,
    1,
    '2024-06-24 21:28:19',
    '2024-06-24 21:28:19'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Review
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Users
# ------------------------------------------------------------

INSERT INTO
  `Users` (
    `user_id`,
    `username`,
    `fullName`,
    `FirstName`,
    `LastName`,
    `password`,
    `email`,
    `tanggal_lahir`,
    `alamat`,
    `googleId`,
    `photo`
  )
VALUES
  (
    'qwe21',
    'admin',
    'admin',
    'admin',
    '-',
    '$2b$05$SU9A2sAsb4A8UfRQunW9UOqWQOhmkCQWwemlGdIpeYUkImjC/zv0.',
    NULL,
    NULL,
    NULL,
    NULL,
    NULL
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tokens
# ------------------------------------------------------------

INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    1,
    'qwe21',
    'c5565a2e-d647-46ca-8bba-5fbea5621c06',
    '2024-06-21 10:05:39',
    '2024-06-21 18:05:39'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    2,
    'qwe21',
    '889039b0-6bf3-4253-89fd-c13adb404536',
    '2024-06-21 10:07:56',
    '2024-06-21 18:07:56'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    3,
    'qwe21',
    'fb2cf85c-bb25-4426-87d8-b08d64d0469e',
    '2024-06-21 10:08:41',
    '2024-06-21 18:08:41'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    4,
    'qwe21',
    '50e4186c-a942-4441-b161-5f385d960bbf',
    '2024-06-21 10:26:27',
    '2024-06-21 18:26:27'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    5,
    'qwe21',
    '166d9339-5f81-452e-ac4e-1295d38cb15c',
    '2024-06-21 10:28:22',
    '2024-06-21 18:28:22'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    6,
    'qwe21',
    '4bae139d-da4e-4313-a0ee-6f4351385741',
    '2024-06-21 10:37:20',
    '2024-06-21 18:37:20'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    7,
    'qwe21',
    '56578aca-df46-4d78-bad5-fc5c5d5eb3f9',
    '2024-06-24 18:25:43',
    '2024-06-25 02:25:43'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    8,
    'qwe21',
    'b8172d4e-2352-4ada-ad7c-c7b610c20982',
    '2024-06-24 18:41:46',
    '2024-06-25 02:41:46'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    9,
    'qwe21',
    '1038aa33-4cbb-463b-b291-7f8179b15aea',
    '2024-06-24 18:42:49',
    '2024-06-25 02:42:49'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    10,
    'qwe21',
    '511ca152-8e0c-4743-9c00-d82a9783870e',
    '2024-06-24 19:09:53',
    '2024-06-25 03:09:53'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    11,
    'qwe21',
    '7294e07f-5cd3-4b28-8aa1-8b104c1ea8ed',
    '2024-06-24 19:21:22',
    '2024-06-25 03:21:22'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    12,
    'qwe21',
    'a41f1702-402c-42a1-814d-2e672a4e4c72',
    '2024-06-24 20:37:48',
    '2024-06-25 04:37:48'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    13,
    'qwe21',
    '750229f6-670b-4178-9806-f3763675f8dd',
    '2024-06-24 20:38:52',
    '2024-06-25 04:38:52'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    14,
    'qwe21',
    'e5abba8e-f62f-461e-a59e-2aebb765e095',
    '2024-06-24 20:46:14',
    '2024-06-25 04:46:14'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    15,
    'qwe21',
    '623bda2a-87d1-4a44-a8bf-aa78adb6a731',
    '2024-06-24 20:52:38',
    '2024-06-25 04:52:38'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    16,
    'qwe21',
    '5dbea198-dca8-4bdc-99cd-8e9100ba4e11',
    '2024-06-24 20:56:18',
    '2024-06-25 04:56:18'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    17,
    'qwe21',
    '69bcb9e5-6032-4898-8548-be16535f363b',
    '2024-06-24 21:26:37',
    '2024-06-25 05:26:37'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    18,
    'qwe21',
    'dc6546fe-c76f-4df9-9c2a-44b7b1e72600',
    '2024-06-24 21:28:08',
    '2024-06-25 05:28:08'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    19,
    'qwe21',
    '8d26c42a-b827-4f65-a993-272a411efc53',
    '2024-06-24 21:29:10',
    '2024-06-25 05:29:10'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    20,
    'qwe21',
    'a4b580e5-e345-4880-a343-8610f04ceac3',
    '2024-06-24 21:29:43',
    '2024-06-25 05:29:43'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    21,
    'qwe21',
    '63e19699-be7e-4123-a7f6-8514ca7b19c6',
    '2024-06-24 21:32:17',
    '2024-06-25 05:32:17'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    22,
    'qwe21',
    '5026fd59-dab1-4ebc-944c-4f624e57523b',
    '2024-06-24 21:32:58',
    '2024-06-25 05:32:58'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    23,
    'qwe21',
    '1ba13fb0-07a5-474c-9b77-9b309d5d82fa',
    '2024-06-24 21:36:58',
    '2024-06-25 05:36:58'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    24,
    'qwe21',
    'dd21f51d-6b7e-4451-bcd7-d7639ce9f146',
    '2024-06-24 21:39:28',
    '2024-06-25 05:39:28'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    25,
    'qwe21',
    'a1b81683-51c5-45b9-a1d8-ea401d9277ad',
    '2024-06-24 21:40:26',
    '2024-06-25 05:40:26'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    26,
    'qwe21',
    'd1d3332a-67c1-4a97-9d07-9e9d7d674e1d',
    '2024-06-24 21:41:32',
    '2024-06-25 05:41:32'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    27,
    'qwe21',
    '34ea2f06-c3bc-41ab-a1d9-bb7870746043',
    '2024-06-24 21:42:18',
    '2024-06-25 05:42:18'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    28,
    'qwe21',
    '274a7795-5847-40c3-943d-7479d2acd0cb',
    '2024-06-24 21:43:41',
    '2024-06-25 05:43:41'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    29,
    'qwe21',
    '686b1e3f-1faf-4bf3-9066-980c70c3ae40',
    '2024-06-24 21:44:12',
    '2024-06-25 05:44:12'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    30,
    'qwe21',
    '6affa5ca-c0f3-469a-914b-5ff49bb59cbc',
    '2024-06-24 21:50:51',
    '2024-06-25 05:50:51'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    31,
    'qwe21',
    '34e61bb9-b6de-41d2-95af-46c8331e6e89',
    '2024-06-24 21:53:25',
    '2024-06-25 05:53:25'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    32,
    'qwe21',
    '632ccda7-2352-4c5a-a487-f9fe47808f8b',
    '2024-06-24 21:54:03',
    '2024-06-25 05:54:03'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    33,
    'qwe21',
    '7ade77c6-8097-4767-b199-2ea37082e79a',
    '2024-06-24 22:02:37',
    '2024-06-25 06:02:37'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    34,
    'qwe21',
    '3fb3518d-ce08-4dc6-bc57-c50ff34dcf72',
    '2024-06-24 22:06:07',
    '2024-06-25 06:06:07'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    35,
    'qwe21',
    '2d67c91d-b08d-43f6-b892-60e9be6c53b0',
    '2024-06-24 22:10:59',
    '2024-06-25 06:10:59'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    36,
    'qwe21',
    '82b5bf10-ed89-41ee-9914-4cc817090033',
    '2024-06-24 22:13:41',
    '2024-06-25 06:13:41'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    37,
    'qwe21',
    'ebc9a161-5d26-4606-96ce-dec8794c9c07',
    '2024-06-26 17:43:49',
    '2024-06-27 01:43:49'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    38,
    'qwe21',
    '9956e5df-8ea6-47bd-a812-a65c4e8597c4',
    '2024-06-26 19:07:03',
    '2024-06-27 03:07:03'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    39,
    'qwe21',
    'b4a88622-25ff-4cec-a5f8-d323a225ee65',
    '2024-06-26 19:09:00',
    '2024-06-27 03:09:00'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    40,
    'qwe21',
    'cf465492-ba62-4776-adbe-ab603e1c4bff',
    '2024-06-26 19:14:27',
    '2024-06-27 03:14:27'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    41,
    'qwe21',
    '5c241b92-9527-4051-9487-6251cc14e371',
    '2024-06-26 19:17:25',
    '2024-06-27 03:17:25'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    42,
    'qwe21',
    '7864621e-5b48-46a9-88ea-4cb33712ca02',
    '2024-06-26 19:18:39',
    '2024-06-27 03:18:39'
  );
INSERT INTO
  `tokens` (
    `id`,
    `user_id`,
    `token`,
    `created_at`,
    `expiration_time`
  )
VALUES
  (
    43,
    'qwe21',
    '5863d8a9-bac5-49fd-9430-0e9e402a700e',
    '2024-06-27 17:39:54',
    '2024-06-28 01:39:54'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
