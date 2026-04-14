'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
  try {
    return await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}

export async function createUser(data: any) {
  try {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role || 'user',
      },
    });
    revalidatePath('/admin/employees');
    return { success: true, user };
  } catch (error) {
    console.error('Failed to create user:', error);
    return { success: false, error: 'Erro ao cadastrar funcionário' };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath('/admin/employees');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete user:', error);
    return { success: false, error: 'Erro ao excluir funcionário' };
  }
}
