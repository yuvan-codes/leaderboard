// const mongoose = require("mongoose");
// const express = require("express");
// const app = express();
// const port = 3000;

// app.use(express.json());

// mongoose
//   .connect("mongodb+srv://yuvan:ssalysns@test.tvcsa.mongodb.net/", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// const userSchema = new mongoose.Schema({
//   name: String,
//   points: Number,
// });

// const User = mongoose.model("User", userSchema);

// // Example route to add a user
// app.post("/add-user", async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const user = new User({ name, email });
//     await user.save();
//     res.send("User added successfully");
//   } catch (error) {
//     res.status(500).send("Error adding user");
//   }
// });

// // Example route to fetch all users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).send("Error fetching users");
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
