import { query , mutation} from "./_generated/server";
import { v } from "convex/values";



export  const getAllInterviews = query({

    handler:async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated user");
        const interviews = await ctx.db.query("interviews").collect();
        return interviews;
    },
});

export const getMyInterviews = query({
    handler:async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated user");
        const interviews = await ctx.db.query("interviews")
        .withIndex("by_candidate_id", (q) => q.eq("candidateId", identity.subject))
        .collect();
        return interviews;
    },
});
export const getInterviewByStreamCallId = query({
    args:{
        streamCallId:v.string(),//stream call id
    },
    handler:async (ctx , args) => {
        return await ctx.db.query("interviews")
        .withIndex("by_stream_call_id", (q) => q.eq("streamCallId", args.streamCallId))
        .first();
       
    },
});

export const createInterview = mutation({
    args:{  
        title:v.string(),
        description:v.optional(v.string()),
        startTime:v.number(),
        status:v.string(),
        streamCallId:v.string(),//stream call id
        candidateId:v.string(),//candidate clerk id
        interviewersId:v.array(v.string()),//interviewer clerk id
    },
    handler:async (ctx , args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthenticated user");
        const interview = await ctx.db.insert("interviews",{
            ...args,
        });
        return interview;
    }
});

export const updateInterviewStatus = mutation({
    args:{
        id:v.id("interviews"),
        status:v.string(),
    },
    handler:async (ctx , args) => {
       return await ctx.db.patch(args.id,{
            status:args.status,
            ...(args.status === "completed" ? {endTime:Date.now()}:{}),
        });
    }
});


