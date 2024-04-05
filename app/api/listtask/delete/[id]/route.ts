import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function DELETE(request: Request, { params }: { params: { id: string }}) {
    const id = params.id
    const deleteTask = await prisma.listTask.delete({
        where: {
          id: Number(id),
        },
    })
    return Response.json({status:200, message:'Xóa thành công', task_deleted:deleteTask})
}