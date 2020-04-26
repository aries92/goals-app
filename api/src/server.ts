import app from "./app";

// "username": "cupkllkb",
//   "password": "V38Kw4EN4DGzxunLOuecA5NTWNoFxDHh",
//   "database": "cupkllkb",
//   "host": "rajje.db.elephantsql.com",
//   "dialect": "postgres"

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 App listening on the port ${port}`);
});
