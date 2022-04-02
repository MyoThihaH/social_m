import mongoose from "mongoose";
import User from "../models/users.js";

export const followUsers =async (req, res) => {
    const {id: followId} = req.params;
    const followerId = req.userId;
    try {
        const resMongoFollower = await User.findById({_id: followerId});
        const resMongoFollow = await User.findById({ _id: followId });
        let followingArr = resMongoFollower.following;
        let followerArr = resMongoFollow.followers;
        if(!followingArr.includes(followId)) {
            followingArr.push(followId);
            followerArr.push(followerId);
        } else {
            followingArr.splice(followingArr.indexOf(followId),1);
            followerArr.splice(followerArr.indexOf(followerId),1);
        }
        
        const resMongo1 = await User.findByIdAndUpdate( followerId, { following: followingArr }, { new: true });
        await resMongo1.save();
        const resMongo2 = await User.findByIdAndUpdate( followId, { followers: followerArr }, { new: true });
        await resMongo2.save();
        res.status(200).json(resMongo1);
    } catch (err) {
        res.status(404).json(err.message)
    }
    
    
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({},{email: 0});
        res.status(200).json(users);
    } catch (err) {
        res.status(404).json(err);
    }
}