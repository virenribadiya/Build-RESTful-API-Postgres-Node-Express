const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sample",
  password: "admin1234",
  port: 5432,
});
const getUsers = (request, response) => {
  pool.query("SELECT * FROM cricketer_data", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM public.cricketer_data WHERE  cric_id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  const { cric_name, cric_run, cric_total_run } = request.body;

  pool.query(
    "INSERT INTO cricketer_data (cric_name, cric_run, cric_total_run) VALUES ($1, $2, $3) ",
    [cric_name, cric_run, cric_total_run],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send("User added");
    }
  );
};

const updateUser = (request, response) => {
  //const id = parseInt(request.params.id);
  //const { name, email } = request.body;
  const {cric_id, cric_name, cric_run, cric_total_run } = request.body;

  pool.query(
    "UPDATE cricketer_data SET cric_name = $2, cric_run = $3, cric_total_run = $4 WHERE cric_id = $1",
    [cric_id,cric_name, cric_run, cric_total_run],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${cric_id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  //console.log("entered.");

  pool.query("DELETE FROM cricketer_data WHERE cric_id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
