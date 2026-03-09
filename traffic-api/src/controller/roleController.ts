import express from "express";
import prismaClient from "../PrismaClient";
import { Prisma } from "@prisma/client";

export const createRole = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, description } = req.body;

  // Create a new role in the database
  const role = await prismaClient.role.create({
    data: {
      name,
    },
  });

  // Return the created role
  res.status(201).json(role);
};

export const getRoles = async (req: express.Request, res: express.Response) => {
  try {
    const { page = "1", limit, search = "" } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = limit ? parseInt(limit as string, 10) : null;
    const offset = limitNumber ? (pageNumber - 1) * limitNumber : 0;

    const whereCondition: Prisma.RoleWhereInput = {
      name: {
        contains: search as string,
        mode: "insensitive",
      },
    };

    const [roles, total] = await Promise.all([
      prismaClient.role.findMany({
        where: whereCondition,
        ...(limitNumber && {
          take: limitNumber,
          skip: offset,
        }),
        orderBy: {
          createdAt: "desc",
        },
      }),
      prismaClient.role.count({
        where: whereCondition,
      }),
    ]);

    const totalPages = limitNumber ? Math.ceil(total / limitNumber) : 1;

    res.status(200).json({
      data: roles,
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
      error: "Failed to retrieve roles",
      error_msg: error.message,
    });
  }
};

export const getRoleById = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  // Get the role by ID from the database
  const role = await prismaClient.role.findUnique({
    where: {
      id: id,
    },
  });

  // If the role is not found, return a 404 error
  if (!role) {
    res.status(404).json({ error: "Role not found" });
  }

  // Return the role
  res.status(200).json(role);
};

export const updateRole = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { name, description } = req.body;

  // Validate input
  if (!name || !description) {
    res.status(400).json({ error: "Name and description are required" });
  }

  // Update the role in the database
  const role = await prismaClient.role.update({
    where: {
      id: id,
    },
    data: {
      name,
    },
  });

  // Return the updated role
  res.status(200).json(role);
};

export const deleteRole = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  // Delete the role from the database
  await prismaClient.role.delete({
    where: {
      id: id,
    },
  });

  // Return a success message
  res.status(200).json({ message: "Role deleted successfully" });
};
