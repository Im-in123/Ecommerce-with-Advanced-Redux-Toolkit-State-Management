import { Sequelize } from "sequelize";

const sequelizeBlogs = new Sequelize({
	database: "blogs",
	dialect: "sqlite",
	storage: "./database/blogs.sqlite",
	logging: false,
});

sequelizeBlogs
	.authenticate()
	.then(async () => {
		await sequelizeBlogs
			.sync({ alter: true })
			.then(() => console.log("Database is synchronised for blogs db"));
		console.log("Connection established for blogs db");
	})
	.catch((err) => console.error("Unable to connect to blogs database: ", err));

const sequelizeUsers = new Sequelize({
	database: "users",
	dialect: "sqlite",
	storage: "./database/users.sqlite",
	logging: false,
});

sequelizeUsers
	.authenticate()
	.then(async () => {
		await sequelizeUsers
			.sync({ alter: true })
			.then(() => console.log("Database is synchronised for users db"));
		console.log("Connection established for users db");
	})
	.catch((err) => console.error("Unable to connect to users database: ", err));

	// Define the database connection for the products database
const sequelizeProducts = new Sequelize({
	database: "products",
	dialect: "sqlite",
	storage: "./database/products.sqlite",
	logging: false,
  });
  
  // Authenticate and sync the products database
  sequelizeProducts
	.authenticate()
	.then(async () => {
	  await sequelizeProducts
		.sync({ alter: true })
		.then(() => console.log("Database is synchronised for products db"));
	  console.log("Connection established for products db");
	})
	.catch((err) => console.error("Unable to connect to products database: ", err));
  
export { sequelizeBlogs, sequelizeUsers, sequelizeProducts };
