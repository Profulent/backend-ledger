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
