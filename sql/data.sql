/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Layanan
# ------------------------------------------------------------

INSERT INTO
  `Layanan` (
    `layananId`,
    `title`,
    `description`,
    `image`,
    `show`,
    `createdAt`,
    `lastUpdate`
  )
VALUES
  (
    'e19ZS',
    'asd',
    'asd',
    '/photoProducts/lPs5pcCooa.png',
    1,
    '2024-07-09 10:31:48',
    '2024-07-09 10:31:48'
  );

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
    'pKxBg',
    'asd',
    'asd',
    '/photoProducts/fcb9D0DPQV.png',
    123,
    1,
    '2024-07-09 10:28:25',
    '2024-07-09 10:28:25'
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
    'uY2QU',
    'test',
    'test',
    '/photoProducts/yjO90TfIkA.png',
    123,
    1,
    '2024-07-09 10:01:56',
    '2024-07-09 10:01:56'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: Review
# ------------------------------------------------------------

INSERT INTO
  `Review` (`reviewId`, `name`, `rate`, `message`)
VALUES
  ('3QAxt', 'test', 5, 'asdasdasdasdasd');
INSERT INTO
  `Review` (`reviewId`, `name`, `rate`, `message`)
VALUES
  ('8VfVm', 'test', 3, 'asdasdasdasd');

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
    44,
    'qwe21',
    '5921d714-839e-40b0-9cc5-d1018eed96bd',
    '2024-07-09 08:58:16',
    '2024-07-09 16:58:16'
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
    45,
    'qwe21',
    '94fffc71-d41b-49a3-8411-848826c2d5cf',
    '2024-07-09 09:31:02',
    '2024-07-09 17:31:02'
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
    46,
    'qwe21',
    'eae4d21f-c376-4c5b-9743-d2a9b19ad57f',
    '2024-07-09 09:43:50',
    '2024-07-09 17:43:50'
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
    47,
    'qwe21',
    '746946f9-9e4d-4a12-9911-86fbf0c7f6c7',
    '2024-07-09 09:48:04',
    '2024-07-09 17:48:04'
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
    48,
    'qwe21',
    '3bfcc2a3-7c22-4978-9166-e140949542ca',
    '2024-07-09 09:48:58',
    '2024-07-09 17:48:58'
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
    49,
    'qwe21',
    '2dd7f64a-3139-475c-8597-7e3854d07f57',
    '2024-07-09 09:56:59',
    '2024-07-09 17:56:59'
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
    50,
    'qwe21',
    '1a46a8d2-d234-4a6c-b382-050bbc5e47cb',
    '2024-07-09 09:57:31',
    '2024-07-09 17:57:31'
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
    51,
    'qwe21',
    '1805b5ab-4a52-4cfc-9898-d21e683b0051',
    '2024-07-09 09:59:19',
    '2024-07-09 17:59:19'
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
    52,
    'qwe21',
    'fa98cfd9-fd42-4ab0-a0c9-b09f7d343a9d',
    '2024-07-09 10:03:11',
    '2024-07-09 18:03:11'
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
    53,
    'qwe21',
    'f3aecec8-4ccd-4391-b09b-6e6150a4148f',
    '2024-07-09 10:06:50',
    '2024-07-09 18:06:50'
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
    54,
    'qwe21',
    '97e997a1-41a2-459f-9f86-9334e94712cc',
    '2024-07-09 10:17:15',
    '2024-07-09 18:17:15'
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
    55,
    'qwe21',
    '23b3f4b0-881d-4c20-abd5-6d8f50a8e97a',
    '2024-07-09 10:17:24',
    '2024-07-09 18:17:24'
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
    56,
    'qwe21',
    '9d0360f0-94c2-4cd7-a17b-4f6908977cd2',
    '2024-07-09 10:24:14',
    '2024-07-09 18:24:14'
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
    57,
    'qwe21',
    '2e6a6def-bbb8-457e-92d0-7c372d43ef3c',
    '2024-07-09 10:36:57',
    '2024-07-09 18:36:57'
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
    58,
    'qwe21',
    'b83c7cde-c3c3-42f9-83a7-16060253999e',
    '2024-07-09 10:38:41',
    '2024-07-09 18:38:41'
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
    59,
    'qwe21',
    '4bbaefec-24af-42e3-84b2-5638f2a5cdc0',
    '2024-07-09 10:43:57',
    '2024-07-09 18:43:57'
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
    60,
    'qwe21',
    '05b5ffd2-f300-4bce-b1fd-ad76244fec0a',
    '2024-07-09 10:46:47',
    '2024-07-09 18:46:47'
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
    61,
    'qwe21',
    '7618ce5e-581d-4d84-befd-1706b9615b9f',
    '2024-07-09 10:47:03',
    '2024-07-09 18:47:03'
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
    62,
    'qwe21',
    'caa0fb8a-d6b0-4891-90e4-19f5b7fc4fbb',
    '2024-07-09 10:53:23',
    '2024-07-09 18:53:23'
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
    63,
    'qwe21',
    'ea22b267-4edb-4c4e-b5d7-dd965de8a1d1',
    '2024-07-09 10:54:18',
    '2024-07-09 18:54:18'
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
    64,
    'qwe21',
    '1263d5c3-fbda-4c35-b68c-c08b75c80f60',
    '2024-07-09 10:55:57',
    '2024-07-09 18:55:57'
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
    65,
    'qwe21',
    '1d539a4f-24c0-4ef2-ad5d-10368618dfd5',
    '2024-07-09 11:01:07',
    '2024-07-09 19:01:07'
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
    66,
    'qwe21',
    '68c7a750-0756-4b3b-8ccc-e43e5b33ce69',
    '2024-07-09 11:01:26',
    '2024-07-09 19:01:26'
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
    67,
    'qwe21',
    'e8c44781-0950-44a4-a904-73b740685cbc',
    '2024-07-09 11:03:06',
    '2024-07-09 19:03:06'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
