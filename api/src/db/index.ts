import { Pool } from "pg";

const pool = new Pool({
  user: "cupkllkb", //db user
  host: "rajje.db.elephantsql.com", //db host etc: 127.0.0.1
  database: "cupkllkb", //db name
  password: "V38Kw4EN4DGzxunLOuecA5NTWNoFxDHh", // password
  port: 5432 // db port etc: 5432 for postgresql
});

export default {
  query: (text: string, params: any) => pool.query(text, params)
};
