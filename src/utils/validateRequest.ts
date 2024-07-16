import { Request, Response, NextFunction } from 'express';
import { adminBot } from '../api/telegraf';
import env from '../config/env';


export const validateRequestBody = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter(field => !(field in req.body));

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(', ')}`;
      adminBot.telegram.sendMessage(env.ADMIN_GROUP_ID, `Error: ${errorMessage}`, {
        parse_mode: 'MarkdownV2'
      });
      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
};
