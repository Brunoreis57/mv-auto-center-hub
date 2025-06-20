# Banco de Dados - MV Centro Automotivo

Este documento descreve a estrutura do banco de dados do sistema MV Centro Automotivo.

## Estrutura

O banco de dados é composto pelas seguintes tabelas:

### Users (Usuários)
- Armazena informações dos usuários do sistema
- Tipos de usuário: administrador, desenvolvedor, funcionário
- Campos principais: nome, email, senha (hash), função, status

### Clients (Clientes)
- Cadastro de clientes
- Campos principais: nome, email, telefone, documento, endereço

### Vehicles (Veículos)
- Cadastro de veículos dos clientes
- Relacionado com a tabela de clientes
- Campos principais: marca, modelo, ano, placa, cor

### Services (Serviços)
- Catálogo de serviços oferecidos
- Campos principais: nome, descrição, preço, duração, status

### Products (Produtos)
- Estoque de produtos
- Campos principais: nome, descrição, preço, quantidade em estoque, estoque mínimo

### Appointments (Agendamentos)
- Agendamentos de serviços
- Relaciona cliente, veículo, serviço e funcionário
- Campos principais: data/hora, status, preço total, observações

### Appointments_Products (Produtos usados nos Agendamentos)
- Tabela de junção entre agendamentos e produtos
- Registra produtos utilizados em cada serviço
- Campos principais: quantidade, preço no momento

### Settings (Configurações)
- Configurações gerais do sistema
- Armazena em formato chave-valor
- Exemplos: horário de funcionamento, configurações visuais

## Relacionamentos

- Um cliente pode ter vários veículos
- Um veículo pertence a um cliente
- Um agendamento relaciona:
  - Um cliente
  - Um veículo
  - Um serviço
  - Um funcionário
  - Vários produtos (opcional)

## Índices

Foram criados índices para otimizar as consultas mais comuns:
- Email e documento de clientes
- Placa de veículos
- Data e status de agendamentos
- Chaves estrangeiras

## Triggers

Triggers automáticos para:
- Atualização do campo `updated_at` em todas as tabelas

## Como Usar

1. Crie um banco de dados PostgreSQL
2. Execute os scripts na ordem:
   ```bash
   psql -d seu_banco -f migrations/001_initial_schema.sql
   psql -d seu_banco -f migrations/002_initial_data.sql
   ```

## Dados Iniciais

O script `002_initial_data.sql` insere:
- Usuário administrador padrão
- Serviços básicos
- Produtos iniciais
- Configurações padrão do sistema

## Backups

Recomenda-se fazer backup diário do banco de dados usando:
```bash
pg_dump -Fc seu_banco > backup_$(date +%Y%m%d).dump
```

## Segurança

- Senhas são armazenadas usando hash bcrypt
- Permissões são controladas pela coluna `role` na tabela `users`
- Deleções em cascata configuradas onde apropriado 