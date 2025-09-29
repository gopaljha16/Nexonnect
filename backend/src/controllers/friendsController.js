const User = require("../models/user")

const getAllRequests = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User does not exist",
      });
    }

    // getting all  the friend requests of the logged-in user
    const requests = user.friendRequests || [];
    const reqLength = requests.length;

    return res.status(200).json({
      status: true,
      requests,
      reqLength,
      message: "Your friend requests",
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "Server error",
    });
  }
};

const sendRequest = async (req , res) =>{
   try{
     
    const user = req.user;

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User doesn't exists"
        })
    }

    //find user by email , name , number which is in the database
    const {email , phoneNumber , name} = req.body;
    if(!email && !phoneNumber && !name){
        return res.status(404).json({
            success:false,
            message:"Please provide email , phoneNumber or name to search"
        })
    }
    

    const recipient = await User.findOne({
      $or: [
        { email },
        { phoneNumber },
        { firstName: name }
      ],
    });

    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //edge case send request to yourself and already freinds 
    if (recipient._id.equals(user._id)) {
      return res.status(400).json({
        success: false,
        message: "Cannot send request to yourself",
      });
    }

    if (recipient.friends.includes(user._id)) {
      return res.status(400).json({
        success: false,
        message: "Already friends",
      });
    }

    //areadyy request sent
     
    const existingRequest = recipient.friendRequests.find(
      req => req.sender.equals(user._id) && req.status === "pending"
    );
    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Friend request already sent",
      });
    }

    ///send request
     recipient.friendRequests.push({
      sender: user._id,
      status: "pending",
      sentAt: Date.now(),
    });
    await recipient.save();


    return res.status(200).json({
        success:true,
        message:"Friend request sent"
    })

   }catch(err){
    return res.status(500).json({
        success:false,
        message:err.message
    })
   }
}




module.exports = {
    sendRequest,
    getAllRequests
}

