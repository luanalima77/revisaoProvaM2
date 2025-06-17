const db = require('../config/db');

//ARRUMAR ERRO: EXPORTAR MODEL CORRETAMENTE (ANTES ESTAVA SENDO EXPORTADO USUÁRIO COMO CLASSE).
const model = {
  async getAll() {
    //ARRUMAR ERRO: adicionar asterisco na seleção de dados.
    const result = await db.query('SELECT * FROM users');
    return result.rows;
  },
  
  //ARRUMAR ERRO: nome das funções assíncronas do model.
   async getById(id) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },


  //ARRUMAR ERRO: nome das funções assíncronas do model.
  async create(data) {
    const result = await db.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [data.name, data.email]
    );
    return result.rows[0];
  },



  //ARRUMAR ERRO: nome das funções assíncronas do model.
   async update(id, data) {
    //ARRUMAR ERRO: TROCAR SET name = $6 por SET name = $1.
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [data.name, data.email, id]
    );
    return result.rows[0];
  },

  
  //ARRUMAR ERRO: nome das funções assíncronas do model.
   async delete(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

//Exportando o model.
module.exports = model;
