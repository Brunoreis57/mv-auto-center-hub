import { prisma } from '../db';
import { hash } from 'bcryptjs';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: 'administrador' | 'funcionario';
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  role?: 'administrador' | 'funcionario';
  active?: boolean;
}

export const userServices = {
  // Criar novo usuário
  async create(data: CreateUserData) {
    const password_hash = await hash(data.password, 8);

    const user = await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash,
        role: data.role,
      },
    });

    return user;
  },

  // Listar todos os usuários
  async findAll() {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        created_at: true,
      },
    });

    return users;
  },

  // Buscar usuário por ID
  async findById(id: string) {
    const user = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        created_at: true,
      },
    });

    return user;
  },

  // Atualizar usuário
  async update(id: string, data: UpdateUserData) {
    let updateData: any = { ...data };
    
    if (data.password) {
      updateData.password_hash = await hash(data.password, 8);
      delete updateData.password;
    }

    const user = await prisma.users.update({
      where: { id },
      data: updateData,
    });

    return user;
  },

  // Deletar usuário
  async delete(id: string) {
    await prisma.users.delete({
      where: { id },
    });
  },
}; 