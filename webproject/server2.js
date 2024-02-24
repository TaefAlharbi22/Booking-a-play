const express = require("express");
const app = express();
const port = 3000;
//setting up database

const Mysql = require("mysql2");
const pool = Mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    password: "root",
    user: "root",
    database: "tickets_",
});

//serving static routing

app.use("/", express.static("./AllFile"));

//json routing to Insert the user data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/insert", (request, response) => {

        const data = { Firstname: request.body.Firstname, email: request.body.email,mobile:request.body.mobile,
        textListL:request.body.textListL ,textar:request.body.textar};
        const query = "INSERT INTO contact_info SET ?";

    pool.query(query, data, (error, result) => {
        if (error) throw error;
        response.send("تم إدخال البيانات بنجاح!");
    });
});

// View data route
app.get("/view", (request, response) => {
    const query = "SELECT * FROM contact_info";

    pool.query(query, (error, result) => {
        if (error) throw error;
        response.json(result);
    });
});

//activating server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});