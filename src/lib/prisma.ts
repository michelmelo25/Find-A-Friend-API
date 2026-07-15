import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { env } from "@/env";

// Carregue a URL do DB do processo (geralmente via .env)
const connectionString = env.DATABASE_URL;

if (!connectionString) {
  console.log(connectionString);
  throw new Error("DATABASE_URL is not set");
}

// Crie o pool de conexão do driver e o adaptador
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});
