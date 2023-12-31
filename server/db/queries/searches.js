const db = require("../../configs/db.config");

const searchByText = (searchQuery) => {
  const searchTerm = `%${searchQuery}%`

  const query = `
    SELECT sets.title, sets.id , sets.deleted, users.username AS username, categories.name AS category
    FROM sets 
    JOIN users ON sets.user_id = users.id
    JOIN categories ON sets.category_id = categories.id 
    WHERE sets.title ILIKE $1 OR sets.description ILIKE $1 OR categories.name ILIKE $1;
  `;

  return db.query(query, [searchTerm])
}

module.exports = {
  searchByText
}