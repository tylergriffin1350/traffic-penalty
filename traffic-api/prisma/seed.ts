import prismaClient from "../src/PrismaClient";

async function main() {
  const roles = [
    { id: "edeb97b6-9c59-47c2-9efd-b4a5ed51a003", name: "Traffic" },
    { id: "4e15d077-e47e-42a8-8542-a23bef744ab5", name: "Admin" },
    { id: "3fd2dd83-f2bc-4775-81e8-b3653f2f09bf", name: "Approver" },
    { id: "a63faa54-42e1-43ee-86d0-3a9139a8c5f2", name: "Agency" },
  ];

  for (const role of roles) {
    await prismaClient.role.upsert({
      where: { id: role.id },
      update: {},
      create: role,
    });
  }

  console.log("✅ Roles seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prismaClient.$disconnect();
  });