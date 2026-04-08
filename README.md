COMO RODAR

git clone https://github.com/luiggiscortegagna/LuiggiServicosWebProjeto.git

crie um arquivo "jwt.js" em /src/config/ com o seguinte conteúdo:
module.exports = {
  segredo: "qualquerum",
  expiracao: "1h"
};

na raíz (cd LuiggiServicosWebProjeto) execute os comandos:

npm install express swagger-ui-express yamljs jsonwebtoken @prisma/client@5

npm install -D prisma@5

npx prisma generate

npx prisma db push

npx prisma migrate dev

agora pode rodar:

node .\src\app.js
