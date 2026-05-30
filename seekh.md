import dotenv from "dotenv";
dotenv.config();
should be added at the top of the file to load environment variables from a .env file. This allows you to use process.env to access those variables throughout your application.

in model folder , we create user.model.js and transaction.model.js to define the schema for users and transactions respectively.
example : const userSchema = mongoose.Schema({
email: {
type:String;
}
})

## regex

Regular expressions (regex) are patterns used to match character combinations in strings.

4. in user.model.js we have an entity password: {
   type: String,
   required: [true, "Password is required for creating an account."],
   minlength:[6,"Password should contain at least 6 characters."],
   select:false
   }
   here select:falses means that when we query the user model, the password field will not be returned by default. This is a security measure to prevent the password from being exposed in API responses or logs. If you need to include the password in a query, you can explicitly select it using .select('+password') when querying the user model.

5. hashing password in user.model.js
   we gonna hash it here in this function:
   userSchema.pre("save", async function(next){  
   })

6. userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
   return next()
   }
   const hash = await bcrypt.hash(this.password, 10)
   this.password = hash
   return next()
   })

userSchema.methods.comparePassword = async function (password) {
return await bcrypt.compare(password, this.password)
}

BREAKDOWN OF THE CODE:
userSchema.pre("save", async function (next) ){}
means that before saving a user document to the database, this function will be executed. It checks if the password field has been modified. If it hasn't, it simply calls next() to proceed with saving the document without hashing the password again.

## router

routers will be created in auth.router.js but their controllers will be defined in auth.controller.js to keep the code organized and maintain separation of concerns. The router will handle the routing of HTTP requests, while the controller will contain the logic for handling those requests, such as user registration and login.

## auth.controller.js and app.js

we used app.use(express.json()); so that the express server can read JSON data from the incoming requests.

## exports

1. export default function || import anyname from "filePath"

2. export function || import { functionName } from "filePath"

3. export { functionName1, functionName2 } || import { functionName1, functionName2 } from "filePath"

## shorthand

const user = await userModel.create({
email:email,
password:password,
name:name
})

can be written as

const user = await userModel.create({
email,
password,
name
})

## token

a token is created using jsonwebtoken and then that token is stored in a cookie for authentication purposes.

why we import cookie-parser in app.js ? this is because cookie-parser is a middleware that allows us to parse cookies from the incoming HTTP requests.

## comparePassword

userSchema.methods.comparePassword = async function(password) {
return await bcrypt.compare(password, this.password)
}

here we are defining a method called comparePassword on the userSchema. This method takes a password as an argument and compares it with the hashed password stored in the database using bcrypt's compare function. It returns true if the passwords match and false otherwise. This is typically used during the login process to verify that the provided password is correct.

## userSchema.methods.functionName

a class:

class User {
comparePassword(password) {
// ...
}
}

Every object created from that class automatically gets comparePassword().

Similarly, when you create a model:

const userModel = mongoose.model("User", userSchema);

Mongoose takes all methods from:
userSchema.methods

and puts them on every document created by that model.

So after:

const user = await userModel.findOne({ email });

user is not a plain object. It's a Mongoose document.

It looks conceptually like:

user = {
email: "test@test.com",
password: "$2b$10$...",
comparePassword: async function(password) {
return await bcrypt.compare(password, this.password)
}
}

Therefore:

user.comparePassword(password)

works.

## nodemailer

allows easy email sending from Node.js apps.
