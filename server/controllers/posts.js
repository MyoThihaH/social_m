import mongoose from "mongoose";
import PostMessage from "../models/posts.js";



export const getPost = async (req, res) => {
    try{
        res.status(200).json(await PostMessage.find());
    } catch(err) {
        res.status(400).json(err);
    }
    
    
}

export const addPost = async (req, res) => {
    const { title, message, tags, selectedFile} = req.body;
    const userId = req.userId;
    const tagsArr = tags?.split(',');
    
    
    try {
        const resMongo = await PostMessage({
            title,
            message,
            creatorId: userId,
            tags: tagsArr,
            selectedFile,
        });
        await resMongo.save();
        res.status(201).json(resMongo);
    } catch(e) {
        res.status(404).json({"message":e.message});
    }
        
}

export const editPost = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const {title, message, selectedFile, tags} = req.body;
    const tagsArr = tags?.split(',');
    try{
        const isValid = mongoose.Types.ObjectId.isValid(id);
        const found = await PostMessage.findOne({ _id: id });
        if(found.creatorId != userId)
            res.status(401).json({"message":"Unauthorize"});
        if(!isValid||!found)
            throw new Error("Id is not valid")
        const resMongo = await PostMessage.findOneAndUpdate({_id: id},{title, message, selectedFile, tags: tagsArr}, { new: true });
        res.status(200).json(resMongo);
    } catch(err) {
        res.status(404).json({"message":err.message});
    }
    
}

export const deletePost = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    try{
        const isValid = mongoose.Types.ObjectId.isValid(id);
        const found = isValid?await PostMessage.findOne({ _id: id }):false;
        console.log(found);
        if(!isValid||!found)
            throw new Error("id is not valid")
        if(found.creatorId != userId)
            res.status(401).json({"message":"Unauthorize"});
        await PostMessage.deleteOne({id});
        res.status(200).json({"message":"Delete Success"});
    } catch(err) {
        res.status(404).json({"message":err.message});
    }
    

}

export const likePost = async (req, res) => {
    const likeId = req.userId;
    const { id } = req.params;
    try{
        const resMongo = await PostMessage.findOne({_id: id});
        let likeIds = resMongo.likeIds;
        let likeCount = resMongo.likeCount;
        if(likeIds.includes(likeId)) {
            likeIds = likeIds.filter(id => id != likeId)
            likeCount--;
        } else {
            likeIds.push(likeId)
            likeCount++;
        }
        const data = await PostMessage.findOneAndUpdate({ _id: id },{ likeCount, likeIds},{ new: true });
        data.save();
        res.status(200).json(data);
    } catch(err) {
        console.log(err)
        res.status(404).json({"message":err});
    }
   
}


export const commentPost = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const data = req.body;
    try {
        const resMongo = await PostMessage.findOne({_id: id});
        const comments = resMongo.comments;
        comments.push({ userId, text: data.text});
        const resForClient = await PostMessage.findOneAndUpdate({_id: id},{ comments }, { new: true });
        res.status(200).json(resForClient);
    } catch (error) {
        res.status(400).json({"message":error.message});
    }

}

export const replyComment = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const { text, commentId } = req.body;
    try {
        const data = await PostMessage.findOne({_id: id});
        let comments = data.comments;
         comments = comments.map((cmt) =>{
            if(cmt._id == commentId){
                cmt.replies.push({ text, userId })
            }
            return cmt;
        });
        const resMongo = await PostMessage.findOneAndUpdate({_id: id}, { comments }, { new: true });
        res.status(200).json(resMongo);

    } catch (error) {
        res.status(400).json({"message":error.message});
    }
    
}