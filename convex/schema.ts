import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        image:v.optional(v.string()),
        role:v.union(v.literal("candidate"),v.literal("interviewer")),//"candidate"  on interviewee or "interviewer" on interviewer
        clerkId:v.string(),//clerk user id

}).index("by_clerkId",["clerkId"]),
});



