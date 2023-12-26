import express from "express";
import { getUserByEmail } from "../models/users";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);

    const existingUser = await getUserByEmail(email);
  }
};
