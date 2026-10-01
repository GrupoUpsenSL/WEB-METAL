CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description LONGTEXT NOT NULL,
  short_description VARCHAR(500),
  image_url VARCHAR(500),
  icon VARCHAR(100),
  features JSON,
  price_range VARCHAR(100),
  delivery_time VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_active (is_active)
);

CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  service_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description LONGTEXT NOT NULL,
  short_description VARCHAR(500),
  main_image VARCHAR(500),
  image_urls JSON,
  client_name VARCHAR(255),
  client_email VARCHAR(255),
  location VARCHAR(255),
  budget_range VARCHAR(100),
  completion_date DATE,
  featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  INDEX idx_service_id (service_id),
  INDEX idx_slug (slug),
  INDEX idx_featured (featured),
  INDEX idx_published (is_published)
);

CREATE TABLE testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  position VARCHAR(255),
  message LONGTEXT NOT NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  image_url VARCHAR(500),
  verified BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  project_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
  INDEX idx_published (is_published),
  INDEX idx_verified (verified)
);

CREATE TABLE contact_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  service_interest VARCHAR(255),
  message LONGTEXT NOT NULL,
  status ENUM('new', 'read', 'responded', 'spam') DEFAULT 'new',
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  responded_at TIMESTAMP NULL,
  admin_notes LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_email (email),
  INDEX idx_created (created_at)
);

CREATE TABLE settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  key_name VARCHAR(255) UNIQUE NOT NULL,
  value LONGTEXT,
  type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') DEFAULT 'editor',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_active (is_active)
);

INSERT INTO services (name, slug, description, short_description, icon) VALUES
('Steel Enclosures', 'enclosures', 'Professional steel enclosure solutions for maximum protection and durability', 'High-quality steel enclosures for any need', 'Shield'),
('Metal Pergolas', 'pergolas', 'Beautiful metal pergola structures for outdoor spaces', 'Elegant outdoor pergolas', 'Home'),
('Garages', 'garages', 'Custom metal garage structures built to last', 'Durable metal garages', 'Building2'),
('Roofing Solutions', 'roofing', 'Professional roofing services with premium materials', 'Metal roofing expertise', 'Roof'),
('Solar Panels', 'solar-panels', 'Solar panel installation and structural support systems', 'Sustainable solar solutions', 'Sun'),
('Doors & Gates', 'doors-gates', 'Custom metal doors and gates with secure locking systems', 'Secure metal doors and gates', 'DoorOpen');
