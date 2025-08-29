###Antes de iniciar, vou deixar alguns pré-requisitos para o projeto:

--> PHP >= 8.1

--> Composer

--> Node.js >= 16 + npm ou yarn

--> SQLite

--> Git (opcional, mas recomendado)

###Clonar repositório 

git clone https://github.com/DevMatosGabriel/testeDevFullStack.git

cd .\testeDevFullStack\


###Instalar dependências do PHP

composer install


###Instalar dependências do Node

npm install
# ou
yarn install

###Copie o arquivo .env.example para .env e configure as variáveis:

cp .env.example .env

###Gerar chave da aplicação 

php artisan key:generate

---------------------------------------------------------
------           validações na .env                ------
---------------------------------------------------------

APP_KEY=base64:CfMRHChlnKZjOSVFdzC2tGWg/VVpYg3NwplhJ0XSfqw= (exemplo, validar se criou a key)

APP_URL=http://localhost:8000
APP_TIMEZONE=America/Sao_Paulo (caso não exista , adicionar)
DB_FOREIGN_KEYS=true (caso não exista , adicionar)

# Sessões (driver e cookies)
SESSION_DRIVER=file  (caso não exista , adicionar)
SESSION_DOMAIN=localhost (caso não exista , adicionar)
SESSION_SECURE_COOKIE=false (caso não exista , adicionar)
SESSION_SAME_SITE=lax (caso não exista , adicionar)

CACHE_DRIVER=database (caso não exista , adicionar)

VITE_APP_NAME=Laravel (caso não exista , adicionar)


------------------------------------------------------------



###Rodar as migrações

php artisan migrate

###Popula tabelas 

php artisan db:seed

###Cria usuário admin

php artisan db:seed --class=AdminUserSeeder

usr: admin
login: 00000000000
senha: admin123

usr: Moderador
login: 11111111111
senha: moderador123

usr: Leitor
login: 22222222222
senha: leitor123


###Iniciar o projeto 

composer dev

