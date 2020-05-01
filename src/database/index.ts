import { createConnection } from 'typeorm';
// vai procurar um arquivo chamado ormconfig.json
// se ele encontrar, automaticamente vai importar as configurações do arquivo
// e fazer a conexão com o banco de dados.
createConnection();
