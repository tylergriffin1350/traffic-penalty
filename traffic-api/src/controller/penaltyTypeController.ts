import prismaClient from "../PrismaClient";
import { Prisma } from "@prisma/client";

export const createPenaltyType = async (req: any, res: any) => {
  const { name, code, fee, point } = req.body;
  // Create the penalty type in the database
  const penaltyType = await prismaClient.penaltyType.create({
    data: {
      name: name,
      code: code,
      fee: fee,
      point: point,
    },
  });

  // Return the created penalty type
  res.status(201).json(penaltyType);
};

export const getPenaltyTypes = async (req: any, res: any) => {
  try {
    const { page = "1", limit, search = "" } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = limit ? parseInt(limit as string, 10) : null;
    const offset = limitNumber ? (pageNumber - 1) * limitNumber : 0;

    const whereCondition: Prisma.PenaltyTypeWhereInput = {
      name: {
        contains: search as string,
        mode: "insensitive",
      },
    };

    const [penaltyTypes, total] = await Promise.all([
      prismaClient.penaltyType.findMany({
        where: whereCondition,
        ...(limitNumber && {
          take: limitNumber,
          skip: offset,
        }),
        orderBy: {
          createdAt: "desc",
        },
      }),
      prismaClient.penaltyType.count({
        where: whereCondition,
      }),
    ]);

    const totalPages = limitNumber ? Math.ceil(total / limitNumber) : 1;

    res.status(200).json({
      data: penaltyTypes,
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
      error: "Failed to retrieve penalty types",
      error_msg: error.message,
    });
  }
};

export const getPenaltyTypeById = async (req: any, res: any) => {
  const { id } = req.params;

  // Get the penalty type by ID from the database
  const penaltyType = await prismaClient.penaltyType.findUnique({
    where: {
      id: id,
    },
  });

  // If the penalty type is not found, return a 404 error
  if (!penaltyType) {
    res.status(404).json({ error: "Penalty type not found" });
  }

  // Return the penalty type
  res.status(200).json(penaltyType);
};

export const updatePenaltyType = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, code, fee, point } = req.body;

  // Update the penalty type in the database
  const penaltyType = await prismaClient.penaltyType.update({
    where: {
      id: id,
    },
    data: {
      name,
      code,
      fee,
      point,
    },
  });

  // Return the updated penalty type
  res.status(200).json(penaltyType);
};

export const deletePenaltyType = async (req: any, res: any) => {
  const { id } = req.params;

  // Delete the penalty type from the database
  const penaltyType = await prismaClient.penaltyType.delete({
    where: {
      id: id,
    },
  });

  // Return a success message
  res.status(200).json({ message: "Penalty type deleted successfully" });
};
