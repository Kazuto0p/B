// index.js
const express = require('express');
const cors = require('cors');
const Food = require('./models'); // Import the Food model
const Signup = require('./model'); // Import the Signup model
const Admin = require('./admin'); // Import the Admin model

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// API routes
app.post('/add', async (req, res) => {
  const result = await new Food(req.body);
  result.save();
  res.send("data added");
});

app.post('/Signup', async (req, res) => {
  const result = await new Signup(req.body);
  result.save();
  res.send("data added");
});

app.post('/Admin', async (req, res) => {
  const result = await new Admin(req.body);
  result.save();
  res.send("data added");
});

app.get('/Update', async (req, res) => {
  const data = await Food.find();
  res.json(data);
  console.log(data);
});

app.delete('/remove/:id', async (req, res) => {
  console.log(req.params);
  let id = req.params.id;
  await Food.findByIdAndDelete(id);
  res.send("Deleted");
});

app.put('/edit/:id', async (req, res) => {
  let id = req.params.id;
  await Food.findByIdAndUpdate(id, req.body);
  res.send("updated");
});

app.post("/login", (req, res) => {
  const { oname, opass } = req.body;
  Signup.findOne({ oname: oname })
    .then(user => {
      if (user) {
        if (user.opass === opass) {
          res.json("success");
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.json("no data existed");
      }
    })
    .catch(err => console.log(err));
});

app.post("/alogin", (req, res) => {
  const { oname, opass } = req.body;
  Admin.findOne({ oname: oname })
    .then(user => {
      if (user) {
        if (user.opass === opass) {
          res.json("success");
        } else {
          res.json("password is incorrect");
        }
      } else {
        res.json("no data existed");
      }
    })
    .catch(err => console.log(err));
});

app.get('/view', async (req, res) => {
  let result = await Food.find();
  res.json(result);
});

app.get('/view-signups', async (req, res) => {
  let result = await Signup.find();
  res.json(result);
});

// Search route
app.get('/search', async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }
  try {
    const results = await Food.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    res.json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
