# 🚀 Teste SenacFullStack

## 📋 Pré-requisitos

- PHP >= 8.1  
- Composer  
- Node.js >= 16 + npm ou yarn  
- SQLite  
- Git (opcional, mas recomendado)

---

## 📂 Clonar repositório

```bash
git clone https://github.com/DevMatosGabriel/testeDevFullStack.git
cd testeDevFullStack
```

---

## ⚙️ Instalar dependências do PHP

```bash
composer install
```

---

## ⚛️ Instalar dependências do Node

```bash
npm install
# ou
yarn install
```

---

## 🔑 Configurar ambiente

Copiar o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Gerar a chave da aplicação:

```bash
php artisan key:generate
```

---

## ✅ Validações no `.env`

Adicione ou valide os seguintes parâmetros:

```ini
APP_KEY=base64:...             # validar se a key foi gerada
APP_URL=http://localhost:8000
APP_TIMEZONE=America/Sao_Paulo

DB_FOREIGN_KEYS=true

# Sessões (driver e cookies)
SESSION_DRIVER=file
SESSION_DOMAIN=localhost
SESSION_SECURE_COOKIE=false
SESSION_SAME_SITE=lax

CACHE_DRIVER=database

VITE_APP_NAME=Laravel
```

---

## 🗄️ Rodar as migrações

```bash
php artisan migrate
```

---

## 🌱 Popular tabelas

```bash
php artisan db:seed
```

---

## 👤 Criar usuários de teste

Executar o seeder de usuários:

```bash
php artisan db:seed --class=AdminUserSeeder
```

### Usuários criados

- **Admin**  
  - Login: `00000000000`  
  - Senha: `admin123`

- **Moderador**  
  - Login: `11111111111`  
  - Senha: `moderador123`

- **Leitor**  
  - Login: `22222222222`  
  - Senha: `leitor123`

---

## ▶️ Iniciar o projeto

```bash
composer dev
```
