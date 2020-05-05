/*
  Student: Achille LAROCHE
  Student number: 3008965
 */

// tslint:disable:no-console
// tslint:disable:prefer-for-of
// tslint:disable:ordered-imports
// tslint:disable:max-line-length
// tslint:disable:no-string-literal
// tslint:disable:object-literal-sort-keys

"use strict";
import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import cors from "cors";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const app = express();
import path from "path";
const port = process.env.PORT || 80;
// cors
app.use(cors());

// database defaults
const adapter = new FileSync(path.join(__dirname + "/db.json"));
const db = low(adapter);
db.defaults({users: {}, tasks: []}).write();

// add JSON handling
app.use(express.json());

// root route
/*app.get("/", cors(), (req, res, next) => {
    res.json({
        id: "webapp1.0",
        status: "running"
    });
});*/

// register new user
app.post("/register", cors(), async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({error: "Missing parameter"});
            return;
        }
        const regex = /^[A-Za-z0-9 ]+$/;
        if (req.body.username.length < 3 || regex.test(req.body.username) !== true) {
            res.status(400).json({error: "Invalid username"});
            return;
        }
        if (req.body.password.length < 3 || regex.test(req.body.password) !== true) {
            res.status(400).json({error: "Invalid password"});
            return;
        }
        if (db.get("users['" + req.body.username + "']").value() != null) {
            res.status(400).json({error: "User already exists"});
            return;
        }
        const hash = crypto.createHash("sha256").update(req.body.password).digest("hex");
        db.set("users['" + req.body.username + "']", {
            password: hash
        }).write();

        const payload = {
            user: {
                id: req.body.username
            }
        };

        jwt.sign(
            payload,
            "webapp-1098429605962", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

// login user
app.post("/login", cors(), async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).json({error: "Missing parameter"});
            return;
        }
        const regex = /^[A-Za-z0-9 ]+$/;
        if (req.body.username.length < 3 || regex.test(req.body.username) !== true) {
            res.status(400).json({error: "Invalid username"});
            return;
        }
        if (req.body.password.length < 3 || regex.test(req.body.password) !== true) {
            res.status(400).json({error: "Invalid password"});
            return;
        }
        if (db.get("users['" + req.body.username + "']").value() == null) {
            res.status(400).json({error: "Invalid username or password"});
            return;
        }
        const user: any = db.get("users['" + req.body.username + "']").value();
        const hash = crypto.createHash("sha256").update(req.body.password).digest("hex");
        if (user.password !== hash) {
            res.status(400).json({error: "Invalid username or password"});
            return;
        }

        new Date().toISOString();

        const payload = {
            user: {
                id: req.body.username
            }
        };

        jwt.sign(
            payload,
            "webapp-1098429605962", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

// get user data
app.get("/user", cors(), async (req, res, next) => {
    if (!req.header("token")) {
        res.status(400).json({error: "Invalid Token"});
        return;
    }
    try {
        const data: any = jwt.verify(req.header("token"), "webapp-1098429605962");
        const tasks: any = db.get("tasks").value();
        const user = data.user.id;
        const usertasks = [];
        for (const task of tasks) {
            const users: any = task.users;
            if (users.includes(user)) {
                usertasks.push(task);
            }
        }
        data.user["tasks"] = usertasks;
        res.status(200).json({data});
    } catch (err) {
        res.status(400).json({error: "Invalid Token"});
    }
});

// get all users
app.get("/users", cors(), async (req, res, next) => {
    if (!req.header("token")) {
        res.status(400).json({error: "Invalid Token"});
        return;
    }
    try {
        jwt.verify(req.header("token"), "webapp-1098429605962");
        const usersobj: any = db.get("users").value();
        const users = [];
        for (const key of Object.keys(usersobj)) {
            users.push(key);
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({error: "Invalid Token"});
    }
});

// get task data by title
app.get("/task/:id", cors(), async (req, res, next) => {
    if (!req.header("token")) {
        res.status(400).json({error: "Invalid Token"});
        return;
    }
    try {
        if (!req.params.id) {
            res.status(400).json({error: "Missing parameter"});
            return;
        }
        jwt.verify(req.header("token"), "webapp-1098429605962");
    } catch (err) {
        res.status(400).json({error: "Invalid Token"});
    }
    try {
        const array: any = db.get("tasks").value();
        let id: number = -1;
        for (let i = 0; i < array.length; ++i) {
            if (array[i].title === req.params.id) {
                id = i;
                break;
            }
        }
        if (id < 0) {
            res.status(400).json({error: "Task '" + req.params.id + "' does not exist"});
            return;
        }
        res.status(200).json({task: array[id]});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

// get all tasks
app.get("/tasks", cors(), async (req, res, next) => {
    if (!req.header("token")) {
        res.status(400).json({error: "Invalid Token"});
        return;
    }
    try {
        jwt.verify(req.header("token"), "webapp-1098429605962");
        const data: any = jwt.verify(req.header("token"), "webapp-1098429605962");
        const tasks: any = db.get("tasks").value();
        const user = data.user.id;
        const usertasks = [];
        for (const task of tasks) {
            const users: any = task.users;
            if (users.includes(user)) {
                usertasks.push(task);
            }
        }

        res.status(200).json(usertasks);
    } catch (err) {
        res.status(400).json({error: "Invalid Token"});
    }
});

// create task
app.post("/addtask", cors(), async (req, res, next) => {
    if (!req.header("token")) {
        res.status(400).json({error: "Invalid Token"});
        return;
    }
    try {
        jwt.verify(req.header("token"), "webapp-1098429605962");
    } catch (err) {
        res.status(400).json({error: "Invalid Token"});
    }

    try {
        if (!req.body.title || !req.body.description || !req.body.users || !req.body.delivery || !req.body.priority) {
            res.status(400).json({error: "Missing parameter"});
            return;
        }
        const regex = /^[A-Za-z0-9 ]+$/;
        if (req.body.title.length < 3 || regex.test(req.body.title) !== true) {
            res.status(400).json({error: "Invalid title"});
            return;
        }
        if (req.body.description.length < 10) {
            res.status(400).json({error: "Invalid description"});
            return;
        }
        if (req.body.users.length <= 0) {
            res.status(400).json({error: "Invalid userlist"});
            return;
        }
        if (new Date(req.body.delivery) < new Date()) {
            res.status(400).json({error: "Invalid delivery"});
            return;
        }
        if (parseInt(req.body.priority, 10) < 1 || parseInt(req.body.priority, 10) > 5) {
            res.status(400).json({error: "Invalid priority (must be between 1 and 5)"});
            return;
        }
        const tasks: any = db.get("tasks");
        const array: any = tasks.value();
        for (const task of array) {
            if (task.title === req.body.title) {
                res.status(400).json({error: "A task with this title already exists"});
                return;
            }
        }
        tasks.push({
            title: req.body.title,
            users: req.body.users,
            delivery: req.body.delivery,
            priority: req.body.priority,
            description: req.body.description,
            inprogress: true
        }).write();
        res.status(200).json({
            title: req.body.title,
            users: req.body.users,
            delivery: req.body.delivery,
            priority: req.body.priority,
            description: req.body.description,
            inprogress: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

// edit task
app.put("/edittask", cors(), async (req, res, next) => {
    if (!req.header("token")) {
        res.status(400).json({error: "Invalid Token"});
        return;
    }
    try {
        jwt.verify(req.header("token"), "webapp-1098429605962");
    } catch (err) {
        res.status(400).json({error: "Invalid Token"});
    }

    try {
        if (!req.body.title || (!req.body.description && !req.body.users && !req.body.delivery && !req.body.priority && req.body.inprogress === null)) {
            res.status(400).json({error: "Missing parameter"});
            return;
        }
        const regex = /^[A-Za-z0-9 ]+$/;
        if (req.body.title.length < 3 || regex.test(req.body.title) !== true) {
            res.status(400).json({error: "Invalid title"});
            return;
        }
        if (req.body.description && req.body.description.length < 10) {
            res.status(400).json({error: "Invalid description"});
            return;
        }
        if (req.body.users && req.body.users.length <= 0) {
            res.status(400).json({error: "Invalid userlist"});
            return;
        }
        if (req.body.delivery && new Date(req.body.delivery) <= new Date()) {
            res.status(400).json({error: "Invalid delivery"});
            return;
        }
        if (req.body.priority && (parseInt(req.body.priority, 10) < 1 || parseInt(req.body.priority, 10) > 5)) {
            res.status(400).json({error: "Invalid priority (must be between 1 and 5)"});
            return;
        }
        const array: any = db.get("tasks").value();
        let id: number = -1;
        for (let i = 0; i < array.length; ++i) {
            if (array[i].title === req.body.title) {
                id = i;
                break;
            }
        }
        if (id < 0) {
            res.status(400).json({error: "Task '" + req.body.title + "' does not exist"});
            return;
        }
        array[id] = {
            title: req.body.title,
            users: req.body.users || array[id].users,
            delivery: req.body.delivery || array[id].delivery,
            priority: req.body.priority || array[id].priority,
            description: req.body.description || array[id].description,
            inprogress: (req.body.inprogress === null ? array[id].inprogress : req.body.inprogress)
        };
        db.set("tasks", array).write();
        res.status(200).json({
            title: req.body.title,
            users: req.body.users || array[id].users,
            delivery: req.body.delivery || array[id].delivery,
            priority: req.body.priority || array[id].priority,
            description: req.body.description || array[id].description,
            inprogress: (req.body.inprogress === null ? array[id].inprogress : req.body.inprogress)
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

// remove task
app.post("/rmtask", cors(), async (req, res, next) => {
    if (!req.header("token")) {
        res.status(400).json({error: "Invalid Token"});
        return;
    }
    try {
        jwt.verify(req.header("token"), "webapp-1098429605962");
    } catch (err) {
        res.status(400).json({error: "Invalid Token"});
    }

    try {
        if (!req.body.title) {
            res.status(400).json({error: "Missing parameter"});
            return;
        }
        const array: any = db.get("tasks").value();
        let id: number = -1;
        for (let i = 0; i < array.length; ++i) {
            if (array[i].title === req.body.title) {
                id = i;
                break;
            }
        }
        if (id < 0) {
            res.status(400).json({error: "Task '" + req.body.title + "' does not exist"});
            return;
        }
        array.splice(id, 1);
        db.set("tasks", array).write();
        res.status(200).json({success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Internal server error"});
    }
});

app.use(express.static(__dirname + "../../../www"));

app.all("/*", (req, res) => {
    res.sendFile(path.join(__dirname + "../../../www/index.html"));
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
