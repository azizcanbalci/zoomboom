import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        image:v.optional(v.string()),
        role:v.union(v.literal("candidate"),v.literal("interviewer")),//"candidate"  on interviewee or "interviewer" on interviewer
        clerkId:v.string(),//clerk user id

}).index("by_clerk_id",["clerkId"]),

interviews:defineTable({
        title:v.string(),
        description:v.optional(v.string()),
        startTime:v.number(),
        endTime:v.optional(v.number()),
        status:v.string(),
        streamCallId:v.string(),//stream call id
        candidateId:v.string(),//candidate clerk id
        interviewersId:v.array(v.string()),//interviewer clerk id
}).index("by_candidate_id",["candidateId"]).index("by_stream_call_id",["streamCallId"]),

comments:defineTable({
    content:v.string(),
    rating:v.number(),//1-5 rating
    interviewerId:v.string(),//interviewer clerk id
    interviewId:v.id("interviews"),//interview id
}).index("by_interview_id",["interviewId"]),
});




