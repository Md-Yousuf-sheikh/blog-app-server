import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const resolvers = {
  //  all queries
  Query: {
    users: async (parent: any, args: any, context: any) => {
      const users = await prisma.user.findMany({});
      return users;
    },
  },

  // all mutations
  Mutation: {
    signup: async (parent: any, args: any, context: any) => {
      const hashedPassword = await bcrypt.hash(args?.password, 12);
      const newUser = await prisma.user.create({
        data: {
          name: args?.name,
          email: args?.email,
          password: hashedPassword,
        },
      });
      // create token
      const token = jwt.sign(
        {
          id: newUser.id,
        },
        "signature",
        {
          expiresIn: 60 * 60 * 24 * 30,
        }
      );
      return {
        token: token,
      };
    },
    signIn: async (parent: any, args: any, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args?.email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const valid = await bcrypt.compare(args?.password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      // create token
      const token = jwt.sign(
        {
          id: user.id,
        },
        "signature",
        {
          expiresIn: 60 * 60 * 24 * 30,
        }
      );
      return {
        token: token,
      };
    },
  },
};
