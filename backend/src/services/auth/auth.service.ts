import { AuthEntity, RecoverEntity } from "../../entity/auth";
import myDataSource from "../../config/db";
import { UserData } from "../../types";
import redis from "../../config/redis";

export const authGetUserByEmail = async (email: string) => {
  try {
    return await myDataSource.getRepository(AuthEntity).findOneBy({ email });
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Error during get user by email");
  }
};

export const authSignUp = async (
  body: Omit<AuthEntity, "id" | "created_at" | "updated_at">
) => {
  try {
    const auth = myDataSource.getRepository(AuthEntity).create(body);
    return await myDataSource.getRepository(AuthEntity).save(auth);
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Error during Sign Up");
  }
};

export const authUpdateUser = async (userData: UserData) => {
  try {
    return await myDataSource
      .createQueryBuilder()
      .update("User")
      .set({ password: userData.password })
      .where("id = :id", { id: userData.id })
      .execute();
  } catch (err: unknown) {
    console.error(err);
    throw new Error("Error during Sign Up");
  }
};

export const createRecoverCode = async (code: string, id: number) => {
  try {
    return await redis.set(code, id, "EX", 3600);
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Error during Sign Up");
  }
};

export const getUserIdFromRedis = async (code: any) => {
  try {
    return await redis.get(code);
  } catch (e: unknown) {
    console.error(e);
    throw new Error("Error during get user from redis");
  }
};
