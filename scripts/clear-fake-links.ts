import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.projectBank.updateMany({
    where: {
      github_links: {
        contains: "example"
      }
    },
    data: {
      github_links: null
    }
  });
  console.log("Cleared fake GitHub links from database.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
