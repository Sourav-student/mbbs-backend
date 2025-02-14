const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});


app.post("/submit", (req, res) => {
    const { name, email, phone, country } = req.body;

    
    if (!name || !email || !phone || !country) {
        return res.status(400).json({ message: "All fields are required" });
    }

   
    const formData = { name, email, phone, country, timestamp: new Date() };

    fs.readFile("submissions.json", (err, data) => {
        let submissions = [];
        if (!err && data.length) {
            submissions = JSON.parse(data);
        }
        submissions.push(formData);

        fs.writeFile("submissions.json", JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Error saving data" });
            }
            res.json({ message: "Form submitted successfully!" });
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
