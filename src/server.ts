import { app } from "./app";
import { prisma } from "./db/prisma";

const port = Number(process.env.PORT || 4000);

const bootstrap = async () => {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      // Keep startup log concise and explicit for local dev.
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server", error);
    process.exit(1);
  }
};

void bootstrap();
