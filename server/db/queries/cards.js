const db = require("../../configs/db.config");

const postCardsData = (cardsData) => {
  const promises = cardsData.map(cardData => {
    const query = `
      INSERT INTO cards(front, back, set_id)
      VALUES($1, $2, $3)
    `;
    return db.query(query, [cardData.front, cardData.back, cardData.setId]);
  });
  return Promise.all(promises);
};

const getCardsBySetId = (setId) => {
  return db
    .query(
      `
      SELECT * FROM cards
      WHERE set_id = $1;`,
      [setId]
    )
    .then((data) => data.rows);
};

const updateCardById = (cardId, updatedData) => {
  const query = `
    UPDATE cards 
    SET front = $1, back = $2 
    WHERE id = $3
    RETURNING *;
  `;

  return db.query(query, [updatedData.front, updatedData.back, cardId])
    .then(result => result.rows[0]);
};

module.exports = { postCardsData, getCardsBySetId, updateCardById  };
