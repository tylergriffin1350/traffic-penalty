import prismaClient from "../PrismaClient";
import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

export const addPenalty = async (req: Request, res: Response) => {
  const { address, committedAt, penaltyTypeId, vehicle, operatorId } = req.body;

  const { driverId } = req.params;

  console.log("driverId", driverId);

  if (!driverId) {
    res.status(400).json({ error: "Driver ID is required" });
  }
  // Create the penalty in the database
  const penalty = await prismaClient.penality.create({
    data: {
      driver: {
        connect: {
          id: driverId,
        },
      },
      address: address,
      committedAt: committedAt,
      vehicle: {
        create: {
          type: vehicle.type,
          plate: vehicle.plate,
          loadCapacity: vehicle.loadCapacity,
        },
      },
      operator: {
        connect: {
          id: operatorId,
        },
      },
      penaltyType: {
        connect: {
          id: penaltyTypeId,
        },
      },
    },
  });

  // Return the created penalty
  res.status(201).json(penalty);
};

export const getPenalties = async (req: any, res: any) => {
  try {
    const { page = "1", limit, search = "" } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = limit ? parseInt(limit as string, 10) : null;
    const offset = limitNumber ? (pageNumber - 1) * limitNumber : 0;

    // Build search condition for related fields
    const whereCondition: Prisma.PenalityWhereInput = {
      OR: [
        {
          driver: {
            name: {
              contains: search as string,
              mode: "insensitive",
            },
          },
        },
        {
          driver: {
            licenseNumber: {
              contains: search as string,
              mode: "insensitive",
            },
          },
        },
        {
          vehicle: {
            plate: {
              contains: search as string,
              mode: "insensitive",
            },
          },
        },
      ],
    };

    const [penalties, total] = await Promise.all([
      prismaClient.penality.findMany({
        where: whereCondition,
        include: {
          driver: true,
          vehicle: true,
          penaltyType: true,
          operator: true,
        },
        ...(limitNumber && {
          skip: offset,
          take: limitNumber,
        }),
        orderBy: {
          createdAt: "desc",
        },
      }),
      prismaClient.penality.count({
        where: whereCondition,
      }),
    ]);

    const totalPages = limitNumber ? Math.ceil(total / limitNumber) : 1;

    res.status(200).json({
      data: penalties,
      meta: {
        page: pageNumber,
        limit: limitNumber || "all",
        total,
        totalPages,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: "Failed to retrieve penalties",
      error_msg: error.message,
    });
  }
};

export const getPenaltyByDriverId = async (req: any, res: any) => {
  const { driverId } = req.params;

  try {
    const { page = 1, limit = 0 } = req.query;

    // Convert limit and page to numbers, ensuring they are valid
    const parsedLimit = parseInt(limit as string, 10) || 0;
    const parsedPage = parseInt(page as string, 10) || 1;

    const offset = parsedLimit > 0 ? (parsedPage - 1) * parsedLimit : 0;

    const penalties = await prismaClient.penality.findMany({
      where: {
        driverId: driverId,
      },
      include: {
        driver: true,
        vehicle: true,
        penaltyType: true,
        operator: true,
      },
      // Apply limit and offset for pagination if parsedLimit is greater than 0
      take: parsedLimit > 0 ? parsedLimit : undefined, // Use 'take' for limit in Prisma findMany
      skip: parsedLimit > 0 ? offset : undefined, // Use 'skip' for offset in Prisma findMany
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prismaClient.penality.count({
      where: {
        driverId: driverId,
      },
    });

    const totalPages =
      total > 0 && parsedLimit > 0 ? Math.ceil(total / parsedLimit) : 0;

    res.status(200).json({
      data: penalties,
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages,
    });
  } catch (error: any) {
    // Catch any errors during the database operation
    console.error("Error fetching penalties by driver ID:", error);

    // Return a 500 Internal Server Error for database or other unexpected errors
    res.status(500).json({
      error: "Failed to retrieve penalties by driver ID",
      error_msg: error.message,
    });
  }
};
