
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
const registerUser = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
      return res.status(400).json({ message: "Please upload all credentials" });
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
      return res.status(400).json({ message: "User Already Exists" });
  }
  if (!req.file) {  // Check if an image was uploaded
    return res.status(400).json({ message: "Profile image is required." });
}
console.log(req.file)
  let imageUrl = null;
  

  if (req.file) {
      // Upload image to Cloudinary
      const localFilePath = req.file.path;
      try {
          const uploadResult = await uploadOnCloudinary(localFilePath);
          console.log("Cloudinary Upload Result:", uploadResult);

          if (uploadResult && uploadResult.url) {
              imageUrl = uploadResult.url;
          }
      } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          return res.status(500).json({ message: "Image upload failed" });
      }
  }

  // If image is required, ensure it's not null
  if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
  }

  // Create new user
  const user = await User.create({
      name,
      password, // Ensure your User model hashes this password
      email,
      image: imageUrl
  });

  if (!user) {
      return res.status(500).json({ message: "Error creating user" });
  }

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
      return res.status(500).json({ message: "Error fetching user" });
  }

  const token = createdUser.generatetoken(createdUser._id);
  res.status(201).json({
      createdUser,
      token,
      message: "User created successfully"
  });
};

const loginUser =async(req,res,next)=>{
    const {email,password}= req.body
    if(!email||!password){
        throw new Error ("please upload all credientials")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new Error ("user doesnot exist")
    }
    const correcttPassword = await user.isPasswordCorrect(password)
if(!correcttPassword){
    throw new Error ("password is incoorect")
}

const token = user.generatetoken(user._id)
res.status(201)
.json({user,
    token,message:"user created successfully"})
}
//   /api/user?serach =piyush
const allUsers =async(req,res,next)=>{
const keyWord =req.query

}

// Get user profile for the currently authenticated user
const getUserProfile = async (req, res) => {
    try {
      // req.user should be set by the protect middleware
      const userId = req.user._id;
      
      const userProfile = await User.findById(userId).select("-password");
      
      if (!userProfile) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({
        success: true,
        user: userProfile
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to fetch user profile" 
      });
    }
  };
  
  // Update user profile
  const updateUserProfile = async (req, res) => {
    try {
      const userId = req.user._id;
      const { name, email } = req.body;
      
      const updates = {
        name,
        email
      };
      
      // Handle image upload if present
      if (req.file) {
        const localFilePath = req.file.path;
        const uploadResult = await uploadOnCloudinary(localFilePath);
        
        if (uploadResult && uploadResult.url) {
          updates.image = uploadResult.url;
        }
      }
      
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        { new: true }
      ).select("-password");
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({
        success: true,
        user: updatedUser,
        message: "Profile updated successfully"
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update profile"
      });
    }
  };
  


export  {registerUser ,
loginUser,  getUserProfile, updateUserProfile }