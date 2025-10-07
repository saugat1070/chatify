import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    console.log(decision)
    if (decision.isDenied) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded.please try again",
        });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot acess denied" });
      } else {
        res.status(403).json({ message: "Access denied by security policy" });
      }
    }

    //check for spoofed bots
    if(decision.results.some(isSpoofedBot)){
        return res.status(403).json({error:"Spoofed bot detected"});
    }
    next();
  } catch (error) {
    console.log(`Arcjet Protection Error:${error?.message}`);
    next();
  }
};
