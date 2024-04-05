import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");
  let body:any = {}
  if (contentType?.includes("multipart/form-data")) {
    const res = await request.formData();
    res.forEach(function (value: FormDataEntryValue, name: string) {
      if (name === "content") {
        body[name] = value.toString();
      } else {
        body[name] = Number(value) as number;
      }
    });
  } else {
    const text = await request.text();
    body = JSON.parse(text);
  }
  const task = await prisma.listTask.create({
    data: body,
  });
  return Response.json({ status: 200, message: "Thành công", new_task: task });
}
