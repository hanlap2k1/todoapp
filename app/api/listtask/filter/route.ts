import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page"));
  const pageSize = Number(searchParams.get("pageSize"));
  const typeFilter = Number(searchParams.get("typeFilter")) || dayjs().unix();
  const startDate = Number(searchParams.get("startDate")) || dayjs().unix();
  const endDate = Number(searchParams.get("endDate"));
  const status = Number(searchParams.get("status")) || 0;
  const recipient = Number(searchParams.get("recipient"));
  const condition =
    typeFilter === 1
      ? {
          deadline: {
            gte: startDate,
            lte: endDate,
          },
        }
      : typeFilter === 2
      ? status === 3
        ? {
            deadline: {
              lte: dayjs().unix(),
            },
            status: {
              not: 2,
            },
          }
        : {
            status: {
              equals: status,
            },
            deadline: {
              gt: status === 2 ? 0 : dayjs().unix(),
            },
          }
      : typeFilter === 3
      ? (recipient !== 5 ? {
          recipient: {
            equals: recipient,
          },
        }:{})
      : {};
  const countTotal = prisma.listTask.count({ where: condition });
  const [list, total] = await Promise.all([
    await prisma.listTask.findMany({
      where: condition,
      select: {
        id: true,
        content: true,
        status: true,
        startTime: true,
        deadline: true,
        recipient: true,
      },
      orderBy: { id: "desc" },
      take: pageSize || 5,
      skip: page * pageSize || 0,
    }),
    countTotal,
  ]);
  return Response.json({
    status: 200,
    message: "Thành công",
    listTask: list,
    total: total,
  });
}
