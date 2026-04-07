COMO RODAR

na raíz execute os comandos:

npm install express swagger-ui-express yamljs jsonwebtoken @prisma/client@5
npm install -D prisma@5
npx prisma generate
npx prisma db push
npx prisma migrate dev

crie um arquivo dentro de /src/config com o nome "jwt.js" com o seguinte conteúdo:
module.exports = {
  segredo: "qualquerum",
  expiracao: "1h"
};

agora pode rodar:
node .\src\app.js
