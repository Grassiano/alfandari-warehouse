import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const item = await prisma.inventory.update({
    where: { id },
    data: {
      name: body.name,
      sku: body.sku,
      quantity: body.quantity,
      location: body.location,
      size: body.size,
    },
  });
  return NextResponse.json(item);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.inventory.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
