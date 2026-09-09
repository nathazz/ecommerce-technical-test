import z from "zod";

export const addCartItemSchema = z.object({
  quantity: z
    .number()
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1"),

  reservationDate: z.string().optional(),
});

export type AddCartItemForm = z.infer<typeof addCartItemSchema>;
