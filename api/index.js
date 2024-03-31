const express = require("express")
const dotenv = require("dotenv").config()
const connectDb = require("./config/dbConfig")
const cors = require("cors")
const userRoutes = require("./routes/user.route")
const authRoutes = require("./routes/auth.route")
const postRoutes = require("./routes/post.route")
const commentRoutes = require("./routes/comment.route")
const cookieParser = require("cookie-parser")
const path = require("path")

connectDb()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/api/user", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)
app.use("/api/comment", commentRoutes)
app.use(express.static(path.join(__dirname, "/client/dist")))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${process.env.PORT || 3000}`)
})
