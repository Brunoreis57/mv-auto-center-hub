import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  document: string | null;
  address: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plate: string | null;
}

export interface Appointment {
  id: string;
  scheduled_at: Date;
}

export interface ClientWithRelations extends Client {
  vehicles: Vehicle[];
  appointments: Appointment[];
}

export interface CreateClientData {
  name: string;
  email?: string | null;
  phone?: string | null;
  document?: string | null;
  address?: string | null;
}

export const clientService = {
  async getAll(): Promise<ClientWithRelations[]> {
    return await prisma.clients.findMany({
      include: {
        vehicles: true,
        appointments: {
          orderBy: {
            scheduled_at: 'desc'
          },
          take: 1
        }
      }
    });
  },

  async create(data: CreateClientData): Promise<ClientWithRelations> {
    const client = await prisma.clients.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        document: data.document || null,
        address: data.address || null
      },
      include: {
        vehicles: true,
        appointments: true
      }
    });
    return client;
  },

  async update(id: string, data: Partial<CreateClientData>): Promise<ClientWithRelations> {
    return await prisma.clients.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        document: data.document,
        address: data.address
      },
      include: {
        vehicles: true,
        appointments: true
      }
    });
  },

  async delete(id: string): Promise<void> {
    await prisma.clients.delete({
      where: { id }
    });
  }
}; 