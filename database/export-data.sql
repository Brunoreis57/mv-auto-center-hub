-- Exportar dados das tabelas
COPY (SELECT * FROM users) TO 'users.csv' WITH CSV HEADER;
COPY (SELECT * FROM services) TO 'services.csv' WITH CSV HEADER;
COPY (SELECT * FROM products) TO 'products.csv' WITH CSV HEADER;
COPY (SELECT * FROM settings) TO 'settings.csv' WITH CSV HEADER;
COPY (SELECT * FROM clients) TO 'clients.csv' WITH CSV HEADER;
COPY (SELECT * FROM vehicles) TO 'vehicles.csv' WITH CSV HEADER;
COPY (SELECT * FROM appointments) TO 'appointments.csv' WITH CSV HEADER;
COPY (SELECT * FROM appointments_products) TO 'appointments_products.csv' WITH CSV HEADER; 