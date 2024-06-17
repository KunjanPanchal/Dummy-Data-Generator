import mongoose from "mongoose";
import express from "express";
import { Employee } from "./models/employee.js";

const conn = mongoose.connect("mongodb://127.0.0.1:27017/company")


const app = express()
app.set('view engine', 'ejs');
const port = 3000

const getRandom = (arr)=>{
    let rno = Math.floor(Math.random() * (arr.length - 1))
    return arr[rno]
}

app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
})

app.get('/generate', async (req, res) => {
    await Employee.deleteMany({});

    let randomNames = ["rohan", "kunjan", "harry", "jarry"];
    let randomLaguages = ["python", "java", "javaScript", "c++", "ruby"]
    let randomCities = ["jambusar", "vadodara", "bharuch", "pune"]
    for (let index = 0; index < 10; index++) {

        let e = await Employee.create({
            name: getRandom(randomNames),
            salary: Math.floor(Math.random() * (50000 - 20000) + 20000),
            language: getRandom(randomLaguages),
            city: getRandom(randomCities),
            isManager: (Math.random() > 0.5) ? true : false
        })
        console.log(e)
    }

    res.render('index', { foo: 'FOO' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})