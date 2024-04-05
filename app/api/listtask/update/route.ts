import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");
  let body:any = {}
  if (contentType?.includes("multipart/form-data")) {
    const res = await request.formData();
    res.forEach(function (value: FormDataEntryValue, name: string) {
      if (name === "status" || name === "recipient" || name === "id") {
        body[name] = Number(value) as number;
      } else {
        body[name] = value.toString();
      }
    });
  } else {
    const text = await request.text();
    body = JSON.parse(text);
  }
  const task = await prisma.listTask.update({
    where: {
        id: body.id,
    },
    data: body,
  });
  return Response.json({ status: 200, message: "Thành công", new_task: task });
}
