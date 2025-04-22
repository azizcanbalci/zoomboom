import { query,mutation } from "./_generated/server";
import { v } from "convex/values";

export const addComment = mutation({
    args:{
        content:v.string(),
        rating:v.number(),//1-5 rating
        interviewId:v.id("interviews"),//interview id
     
    },
    handler:async (ctx , args) => {
       const identity = await ctx.auth.getUserIdentity();
         if (!identity) throw new Error("Unauthenticated user");
        
         return await ctx.db.insert("comments",{
            interviewId:args.interviewId,
            content:args.content,   
            rating:args.rating,
            interviewerId:identity.subject,
         });
    },
});

export const getComments = query({
    args:{
        interviewId:v.id("interviews"),//interview id
    },
    handler:async (ctx , args) => {
        const comments = await ctx.db.query("comments")
        .withIndex("by_interview_id", (q) => q.eq("interviewId", args.interviewId))
        .collect();
        return comments;
    }
});