-- Ravankargah Database Setup Script
-- For DirectAdmin phpMyAdmin Import
-- MySQL 5.7+ / MariaDB 10.2+

CREATE DATABASE IF NOT EXISTS `ravankargah` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `ravankargah`;

-- Users Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'admin') DEFAULT 'student',
  `full_name_en` VARCHAR(255) DEFAULT NULL,
  `age` INT DEFAULT NULL,
  `gender` ENUM('male', 'female') DEFAULT NULL,
  `education` VARCHAR(100) DEFAULT NULL,
  `marital_status` VARCHAR(50) DEFAULT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_phone` (`phone`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Courses Table
CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `price` DECIMAL(12, 2) DEFAULT 0.00,
  `teacher_name` VARCHAR(255),
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `image` VARCHAR(500),
  `category` VARCHAR(100),
  `duration_hours` INT,
  `sessions` INT,
  `is_online` BOOLEAN DEFAULT TRUE,
  `has_certificate` BOOLEAN DEFAULT FALSE,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Millon Results Table
CREATE TABLE IF NOT EXISTS `millon_results` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `first_name` VARCHAR(100),
  `last_name` VARCHAR(100),
  `gender` ENUM('male', 'female'),
  `age` INT,
  `marital_status` VARCHAR(50),
  `education_level` VARCHAR(100),
  `phone` VARCHAR(20),
  `inpatient_status` VARCHAR(10),
  `raw_responses` JSON NOT NULL,
  `calculated_scales` JSON,
  `full_report` LONGTEXT,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Enrollments Table
CREATE TABLE IF NOT EXISTS `enrollments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_course_id` (`course_id`),
  INDEX `idx_status` (`status`),
  UNIQUE KEY `unique_enrollment` (`user_id`, `course_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Certificates Table
CREATE TABLE IF NOT EXISTS `certificates` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `pdf_path` VARCHAR(500),
  `issue_date` DATE NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_course_id` (`course_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default admin user (password: admin123)
-- Note: Change this password immediately in production!
INSERT INTO `users` (`name`, `phone`, `password`, `role`) 
VALUES ('Admin', '09120000000', '$2b$10$rQq8YB5tJ5NqW1v6G4hZ3eYJr9X5Y8.0vZ2xK3mN4pQ5rS6tU7vW8', 'admin')
ON DUPLICATE KEY UPDATE `role` = 'admin';

-- Sample courses
INSERT INTO `courses` (`title`, `description`, `price`, `teacher_name`, `status`, `category`, `duration_hours`, `sessions`, `is_online`, `has_certificate`) VALUES
('دوره جامع روان‌درمانی', 'آموزش کامل مبانی و تکنیک‌های روان‌درمانی', 5000000.00, 'دکتر محمدی', 'active', 'روان‌درمانی', 40, 20, true, true),
('آزمون‌های شخصیت', 'یادگیری تفسیر آزمون‌های شخصیت بالینی', 3500000.00, 'دکتر احمدی', 'active', 'ارزیابی بالینی', 24, 12, true, true)
ON DUPLICATE KEY UPDATE `updated_at` = CURRENT_TIMESTAMP;
