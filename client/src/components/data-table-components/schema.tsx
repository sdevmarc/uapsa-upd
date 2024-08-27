import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const qrschemas = z.object({
    id: z.number(),
    name: z.string(),
    course: z.string(),
    attended: z.number(),
    points: z.number(),
});

export type QR = z.infer<typeof qrschemas>;