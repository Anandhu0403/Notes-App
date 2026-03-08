import ratelimit from "../src/config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const ip = req.ip ?? req.headers["x-forwarded-for"] ?? "127.0.0.1";

    const { success, limit, remaining } = await ratelimit.limit(ip);

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", remaining);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later."
      });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);

   
    next();
  }
};

export default ratelimiter;