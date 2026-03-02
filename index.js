const express = require("express");
const app = express();
app.set("view engine", "ejs");

// Database connection
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "concert-db.cziwkiqmee2f.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "paradise-concerts",
    port: 3306,
  },
});

// Route
app.get("/", (req, res) => {
  knex
    .select()
    .from("venues")
    .then((result) => {
      let html = "<html><body><ul>";

      for (let i = 0; i < result.length; i++) {
        html += "<li>" + result[i].location + "</li>";
      }

      html += "</ul></body></html>";

      res.send(html);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Database error");
    });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
