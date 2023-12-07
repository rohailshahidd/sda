const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

app.use('/images', express.static('upload/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})

mongoose.connect("mongodb+srv://dbuser:1234@cluster0.7tovqfe.mongodb.net/");

// MiddleWare
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};
// Schema for creating user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  wData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Schema for creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
  quantity: {
    type: Number, // Assuming quantity is a number
    required: true,
  },
  description: {
    type: String, // Assuming description is a string
    required: true,
  },
});

// Schema for creating ContactForm model
const ContactForm = mongoose.model("ContactForm", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  postalCode: String,
  country: String,
  paymentMethod: String,
  voucher: String,
  // Add more fields as needed
});

const creditCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
  },
  cardHolder: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
});

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

module.exports = CreditCard;
app.post('/ccinfo', async (req, res) => {
  try {
    const creditCard = new CreditCard(req.body);
    const savedCard = await creditCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    console.error('Error storing credit card info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

app.post('/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const order = new Order(orderData);
    await order.save();
    res.status(201).json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

app.post('/submitcontactform', async (req, res) => {
  console.log("Submit Contact Form");
  const { name, email, service, message } = req.body;

  // Perform form validation here if needed

  const contactFormSubmission = new ContactForm({
    name,
    email,
    service,
    message,
  });

  try {
    await contactFormSubmission.save();
    res.json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to submit contact form" });
  }
});

app.get("/", (req, res) => {
  res.send("Root");
});

//Create an endpoint at ip/login for login the user and giving token
app.post('/login', async (req, res) => {
  console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
			success = true;
      console.log(user.id);
			const token = jwt.sign(data, 'secret_ecom');
			res.json({ success, token });
        }
        else {
            return res.status(400).json({success: success, errors: "please try with correct email/password"})
        }
    }
    else {
        return res.status(400).json({success: success, errors: "please try with correct email/password"})
    }
})

//Create an endpoint at ip/auth for registering the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
        let success = false;
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: success, errors: "existing user found with this email" });
        }
        let cart = {};
          for (let i = 0; i < 300; i++) {
          cart[i] = 0;
        }
        let wcart = {};
          for (let i = 0; i < 300; i++) {
          wcart[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
            wData: wcart,
        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        
        const token = jwt.sign(data, 'secret_ecom');
        success = true; 
        res.json({ success, token })
    })

app.get("/allproducts", async (req, res) => {
	let products = await Product.find({});
  console.log("All Products");
    res.send(products);
});

app.get("/newcollections", async (req, res) => {
	let products = await Product.find({});
  let arr = products.slice(1).slice(-8);
  console.log("New Collections");
  res.send(arr);
});

app.get("/popularinwomen", async (req, res) => {
	let products = await Product.find({});
  let arr = products.splice(0,  4);
  console.log("Popular In Women");
  res.send(arr);
});

//Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
	console.log("Add Cart");
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added")
  })
  app.post('/addtowishlist', fetchuser, async (req, res) => {
    console.log("Add Wishlist");
      let userData = await Users.findOne({_id:req.user.id});
      userData.wData[req.body.itemId] += 1;
      await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
      res.send("Added")
    })


  //Create an endpoint for saving the product in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
	console.log("Remove Cart");
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]!=0)
    {
      userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
  })
  app.post('/removefromwishlist', fetchuser, async (req, res) => {
    console.log("Remove Wishlist");
      let userData = await Users.findOne({_id:req.user.id});
      if(userData.wData[req.body.itemId]!=0)
      {
        userData.wData[req.body.itemId] -= 1;
      }
      await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.wData});
      res.send("Removed");
    })

  //Create an endpoint for saving the product in cart
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.cartData);

  })


app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length>0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  }
  else
  { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    quantity: req.body.quantity,
    description: req.body.description
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({success:true,name:req.body.name})
});

app.post("/removeproduct", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({success:true,name:req.body.name})
});

app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
