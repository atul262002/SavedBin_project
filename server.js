const express = require("express")
const app = express();

app.use(express.static('public'))


app.set("view engine", "ejs");
const PORT = process.env.PORT || 1090
app.use(express.urlencoded({ extended: true }))

const db = require("./mongoose/connection")
db.on("error", (error) => {
    console.error("database connection error " + error)
})

db.once("open", () => {
    console.log("mongoDb connected successfully ")
})

const savedbin = require("./model/schema")

app.get("/", (req, res) => {
    let instruction = `Welcome to SavedBin 
A place where you can paste your code snippet and share them with your colleague for modification or reviewing 
To start working , click on the New button on top right corner then paste your code , save and share with the URL link
     `
    res.render("first_view", { instruction, language: "plaintext" })
})


app.get("/new", (req, res) => {
    res.render("newfile")
})

app.post("/save", async (req, res) => {
    const value = req.body.value
    try {
        const document = await savedbin.create({ value })
        res.redirect(`/${document.id}`)
    } catch {
        res.render("/new", { value })
    }
})

app.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
        const document = await savedbin.findById(id)
        res.render("first_view", { instruction: document.value, id })
    } catch (e) {
        app.redirect("/")
    }
})


app.get("/:id/duplicate", async (req, res) => {
    const id = req.params.id
    try {
        const document = await savedbin.findById(id)
        res.render("newfile", { value: document.value })
    } catch (e) {
        app.redirect(`/${id}`)
    }
})

app.listen(PORT, () => {
    console.log(`port started at http://localhost:${PORT}`)
})