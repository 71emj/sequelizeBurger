USE burgers_db;

INSERT INTO burgers (burger_name, devoured, date) VALUES
("Cheese Burger", false, (NOW())),
("Chicken Sandwich", false, (NOW())),
("The Phillies", true, (NOW()));
