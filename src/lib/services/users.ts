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
    try {
      console.log('Criando novo usuário:', { ...data, password: '***' });
      
      // Verificar se já existe um usuário com este email
      const existingUser = await prisma.users.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new Error('Já existe um usuário com este email');
      }

      const password_hash = await hash(data.password, 8);

      const user = await prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
          password_hash,
          role: data.role,
        },
      });

      console.log('Usuário criado com sucesso:', { id: user.id, name: user.name, email: user.email });
      return user;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },

  // Listar todos os usuários
  async findAll() {
    try {
      console.log('Buscando todos os usuários');
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
      console.log(`${users.length} usuários encontrados`);
      return users;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  // Buscar usuário por ID
  async findById(id: string) {
    try {
      console.log('Buscando usuário por ID:', id);
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
      console.log('Usuário encontrado:', user);
      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  },

  // Atualizar usuário
  async update(id: string, data: UpdateUserData) {
    try {
      console.log('Atualizando usuário:', { id, ...data, password: data.password ? '***' : undefined });
      
      // Se estiver atualizando o email, verificar se já existe
      if (data.email) {
        const existingUser = await prisma.users.findFirst({
          where: { 
            email: data.email,
            NOT: { id }
          },
        });

        if (existingUser) {
          throw new Error('Já existe um usuário com este email');
        }
      }

      let updateData: any = { ...data };
      
      if (data.password) {
        updateData.password_hash = await hash(data.password, 8);
        delete updateData.password;
      }

      const user = await prisma.users.update({
        where: { id },
        data: updateData,
      });

      console.log('Usuário atualizado com sucesso:', { id: user.id, name: user.name, email: user.email });
      return user;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

  // Deletar usuário
  async delete(id: string) {
    try {
      console.log('Deletando usuário:', id);
      await prisma.users.delete({
        where: { id },
      });
      console.log('Usuário deletado com sucesso');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  },
}; 