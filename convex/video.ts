import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const setVideoUrl = mutation({
  args: {
    url: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("videoUrl", { url: args.url, updatedAt: Date.now() });
  },
});

export const getVideoUrl = query({
  handler: async (ctx) => {
    const videos = await ctx.db.query("videoUrl").order("desc").take(1);
    return videos.length ? videos[0].url : null;
    
  },
});
