"use server";

import { db } from "@/databases/drizzle";
import { books } from "@/databases/schema";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "An error happened while creating the book",
    };
  }
};
