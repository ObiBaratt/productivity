import { PrismaClient } from "@prisma/client";
import { seedData } from "./seedData";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            id: "0e3bc956-5f09-4a5f-a895-ba0798471c58",
            email: "admin@prototype.com",
            role: "ADMIN",
        },
    });

    await prisma.task.createMany({
        data: seedData,
    })
};

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});
