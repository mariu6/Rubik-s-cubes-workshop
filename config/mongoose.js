
// to write in the terminal:
// set DB_USER = "user" 
// set DB_PASSWORD = "123123abc"
// If using Atlas, don't forget to put IP in the white list from SECURITY -> Network Access -> +ADD IP ADDRESS

const mongoose = require('mongoose');
const StudentModel = require("./student");
const SubjectModel = require("./subject");

const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const connectionStr = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@softuni-hkggx.mongodb.net/Softuni?retryWrites=true&w=majority`;

// const dbQueries = async (people) => {
//   await people.insertOne({ "name": "Pesho" });
//   const result = await people.find({ name: "Pesho" }).toArray();
//   console.log("async Result: ", result);
// }


mongoose.connect(connectionStr, async function (err) {
  if (err) console.error("DB Error: ", err);

  const students = await StudentModel.find();       // takes all objects from db students
  console.log(students);

  await new SubjectModel({
    title: "Math",
    students: students
  }).save((err) => console.error("SubjectModel Error: ", err))


  const subject = await SubjectModel.findOne({ title: "Math" }).populate("students");
  console.log(subject);


  // // find all and return only firstName (it will come with _id as well)
  // const student = await StudentModel.find().select("firstName");  // await - when function (err) is async
  // console.log(student);    // always retutns the _id as well

  // StudentModel.findByIdAndRemove('5edeac3e26abba2cfc924987', (err, data) => {    // find from collection "StudentModel"
  //   console.log(data);                  // data is array of objects, after update it's still showing once the previouse values 
  // })

  // // creation of new student in DB
  // const newStudent = {
  //   firstName: "Toshe",
  //   lastName: "Peshov",
  //   facultyNumber: 12345,
  // }

  // new StudentModel(newStudent).save((error) => {
  //   if (error) {
  //     console.error("Error: ", error);
  //     return;
  //   }
  //   console.log("Student is successfully stored");
  // })
});
