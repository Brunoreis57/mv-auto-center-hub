-- Insert initial admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role) VALUES
('Administrador', 'admin@mvauto.com', '$2b$10$5jf.3Z8V8V8V8V8V8V8V8uQQ9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q', 'administrador');

-- Insert initial services
INSERT INTO services (name, description, price, duration, active) VALUES
('Lavagem Completa', 'Lavagem externa e interna do veículo', 80.00, 60, true),
('Polimento', 'Polimento completo da pintura', 200.00, 120, true),
('Cristalização', 'Cristalização da pintura', 300.00, 180, true),
('Higienização', 'Higienização completa do interior', 150.00, 120, true),
('Lavagem Motor', 'Lavagem do motor', 100.00, 60, true);

-- Insert initial products
INSERT INTO products (name, description, price, stock_quantity, min_stock) VALUES
('Cera Premium', 'Cera de carnaúba premium', 89.90, 10, 5),
('Shampoo Neutro', 'Shampoo automotivo neutro', 29.90, 20, 10),
('Limpa Vidros', 'Limpa vidros automotivo', 19.90, 15, 8),
('Pretinho', 'Pretinho para pneus', 24.90, 30, 15),
('Microfibra', 'Pano de microfibra', 14.90, 50, 20);

-- Insert initial settings
INSERT INTO settings (key, value) VALUES
('company_name', 'MV Centro Automotivo'),
('company_phone', '(11) 99999-9999'),
('company_email', 'contato@mvauto.com'),
('company_address', 'Rua dos Automóveis, 123 - São Paulo/SP'),
('business_hours', '{"weekdays": "08:00-18:00", "saturday": "08:00-12:00", "sunday": "closed"}'),
('appointment_interval', '30'), -- minutes
('max_daily_appointments', '8'),
('theme', '{"primaryColor": "#0066FF", "secondaryColor": "#4C1D95", "accentColor": "#10B981"}'); 