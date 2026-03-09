import prismaClient from "../PrismaClient";
import { Prisma } from "@prisma/client";

export const createDriver = async (req: any, res: any) => {
  const { name, age, phoneNumber, city, region, kebele, sex, licenseNumber } =
    req.body;

  // Create the driver in the database
  const driver = await prismaClient.driver.create({
    data: {
      name,
      phoneNumber,
      region,
      kebele,
      city,
      age,
      sex,
      licenseNumber,
    },
  });

  // Return the created driver
  res.status(201).json(driver);
};

export const getDrivers = async (req: any, res: any) => {
  try {
    const { page = "1", limit, search = "" } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = limit ? parseInt(limit as string, 10) : null;
    const offset = limitNumber ? (pageNumber - 1) * limitNumber : 0;

    const whereCondition: Prisma.DriverWhereInput = {
      OR: [
        {
          name: {
            contains: search as string,
            mode: "insensitive",
          },
        },
        {
          licenseNumber: {
            contains: search as string,
            mode: "insensitive",
          },
        },
      ],
    };

    const [drivers, total] = await Promise.all([
      prismaClient.driver.findMany({
        where: whereCondition,
        ...(limitNumber && {
          skip: offset,
          take: limitNumber,
        }),
        orderBy: {
          createdAt: "desc",
        },
      }),
      prismaClient.driver.count({
        where: whereCondition,
      }),
    ]);

    const totalPages = limitNumber ? Math.ceil(total / limitNumber) : 1;

    res.status(200).json({
      data: drivers,
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
      error: "Failed to retrieve drivers",
      error_msg: error.message,
    });
  }
};

export const getDriverById = async (req: any, res: any) => {
  const { driverId } = req.params;

  // Get the driver by ID from the database
  const driver = await prismaClient.driver.findUnique({
    where: {
      id: driverId,
    },
  });

  // If the driver is not found, return a 404 error
  if (!driver) {
    res.status(404).json({ error: "Driver not found" });
  }

  // Return the driver
  res.status(200).json(driver);
};

export const getDriverByLicenseNumber = async (req: any, res: any) => {
  const { licenseNumber } = req.params;

  // Get the driver by ID from the database
  const driver = await prismaClient.driver.findUnique({
    where: {
      licenseNumber: licenseNumber,
    },
  });

  // If the driver is not found, return a 404 error
  if (!driver) {
    res.status(404).json({ error: "Driver not found" });
  }

  // Return the driver
  res.status(200).json(driver);
};
export const getDriverByPhoneNumber = async (req: any, res: any) => {
  const { phoneNumber } = req.params;

  // Get the driver by ID from the database
  const driver = await prismaClient.driver.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  // If the driver is not found, return a 404 error
  if (!driver) {
    res.status(404).json({ error: "Driver not found" });
  }

  // Return the driver
  res.status(200).json(driver);
};

export const deleteDriver = async (req: any, res: any) => {
  const { id } = req.params;

  // Delete the driver from the database
  await prismaClient.driver.delete({
    where: {
      id: id,
    },
  });

  // Return a success message
  res.status(200).json({ message: "Driver deleted successfully" });
};
