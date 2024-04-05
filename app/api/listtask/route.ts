import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function GET(request: NextRequest,) {
  const searchParams = request.nextUrl.searchParams
  const page = Number(searchParams.get('page'))
  const pageSize = Number(searchParams.get('pageSize'))
  const search = searchParams.get('search') as string || ""
  const [ listTask, total ] = await prisma.$transaction([
    prisma.listTask.findMany({
      where:{
        content: {
          contains: search
        }
      },
      select: {
        id: true,
        content: true,
        status: true,
        startTime: true,
        deadline: true,
        recipient: true,
      },
      orderBy: { id: 'desc' },
      take: pageSize || 5,
      skip: page*pageSize || 0,
    }),
    prisma.listTask.count({
      where:{
        content: {
          contains: search
        }
      }
    })
  ])
  return Response.json({
    status: 200,
    message: "Thành công",
    listTask,
    total
  });
}
