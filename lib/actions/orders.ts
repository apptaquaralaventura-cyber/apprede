'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getOrders() {
  try {
    return await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return [];
  }
}

export async function createOrder(data: any) {
  try {
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        ra: data.ra,
        course: data.course,
        workType: data.workType,
        paymentStatus: data.paymentStatus,
        projectLevel: parseInt(data.projectLevel) || 1,
        semester: data.semester,
        poloCity: data.poloCity,
        observations: data.observations,
        priority: data.priority === 'high' ? 'Alta' : data.priority === 'medium' ? 'Média' : 'Baixa',
        value: parseFloat(data.value) || 0,
        projectTitle: data.projectTitle || data.workType,
        status: data.status || 'Pendente',
      },
    });
    revalidatePath('/orders');
    revalidatePath('/dashboard');
    return { success: true, order };
  } catch (error) {
    console.error('Failed to create order:', error);
    return { success: false, error: 'Erro ao criar pedido' };
  }
}

export async function updateOrder(id: string, data: any) {
  try {
    const order = await prisma.order.update({
      where: { id },
      data: {
        clientName: data.clientName,
        clientPhone: data.clientPhone,
        ra: data.ra,
        course: data.course,
        workType: data.workType,
        paymentStatus: data.paymentStatus,
        projectLevel: parseInt(data.projectLevel) || 1,
        semester: data.semester,
        poloCity: data.poloCity,
        observations: data.observations,
        priority: data.priority === 'high' ? 'Alta' : data.priority === 'medium' ? 'Média' : 'Baixa',
        value: parseFloat(data.value) || 0,
        projectTitle: data.projectTitle || data.workType,
        status: data.status || 'Pendente',
      },
    });
    revalidatePath('/orders');
    revalidatePath('/dashboard');
    return { success: true, order };
  } catch (error) {
    console.error('Failed to update order:', error);
    return { success: false, error: 'Erro ao atualizar pedido' };
  }
}

export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({ where: { id } });
    revalidatePath('/orders');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete order:', error);
    return { success: false, error: 'Erro ao excluir pedido' };
  }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    await prisma.order.update({
      where: { id },
      data: { status },
    });
    revalidatePath('/orders');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function updateOrderPayment(id: string, paymentStatus: string) {
  try {
    await prisma.order.update({
      where: { id },
      data: { paymentStatus },
    });
    revalidatePath('/orders');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
