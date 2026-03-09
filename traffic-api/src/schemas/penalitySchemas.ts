import {z} from "zod";


export const createPenaltyTypeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    code: z.string(),
    point: z.number(),
    fee: z.number()
})


export const createPenaltySchema = z.object({
    penaltyTypeId: z.string().uuid(),
    operatorId: z.string().uuid(),
    vehicle: z.object({
        type: z.string().min(1, "Number is required"),
        plate: z.string().min(1, "Number is required"),
        loadCapacity: z.number()
    }),
    address: z.string(),
    committedAt: z.string(),

});

