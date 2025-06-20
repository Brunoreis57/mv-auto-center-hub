import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testDatabaseOperations() {
  try {
    // 1. Buscar todos os serviços ativos
    const services = await prisma.service.findMany({
      where: { active: true },
      select: { name: true, price: true, duration: true }
    })
    console.log('Serviços disponíveis:', services)

    // 2. Buscar produtos com estoque baixo
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock_quantity: { lte: 10 }
      },
      select: {
        name: true,
        stock_quantity: true,
        min_stock: true
      }
    })
    console.log('Produtos com estoque baixo:', lowStockProducts)

    // 3. Buscar configurações do sistema
    const settings = await prisma.setting.findMany({
      select: {
        key: true,
        value: true
      }
    })
    console.log('Configurações do sistema:', settings)

  } catch (error) {
    console.error('Erro ao executar operações:', error)
  } finally {
    // Sempre fechar a conexão ao terminar
    await prisma.$disconnect()
  }
}

// Executar o teste
testDatabaseOperations() 