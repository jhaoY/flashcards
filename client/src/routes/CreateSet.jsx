import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserProvider'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import "../assets/styles/EditSet.scss"

const CreateSet = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [categories, setCategories] = useState([])
  const [isPrivate, setIsPrivate] = useState(false);
  const [cards, setCards] = useState([
    { front: '', back: '' },
    { front: '', back: '' },
    { front: '', back: '' }
  ]);


  const setformData = {
    title,
    description,
    category_id: selectedCategory.id,
    private: isPrivate,
    user_id: user.id
  }

  const cardFormData = cards;

  useEffect(() => {
    axios.get('/api/categories/')
      .then(response => {
        setCategories(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/sets/create", setformData)
      .then(result => {
        const setId = result.data.data.rows[0].id
        const cardDataWithSetId = cardFormData.map(card => ({ ...card, setId }));
        axios.post("/api/cards/create", cardDataWithSetId); // TODO: Adjust this endpoint
      })
      .then(() => { navigate(`/users/${user.id}`) })
      .catch(err => { console.error(err) })
  }

  const addCard = () => {
    const newCards = [...cards, {
      front: "",
      back: "",
      deleted: false
    }]
    setCards(newCards)
  }

  const handleDelete = (cardIndex) => {
    const updatedCards = [...cards];
    updatedCards.splice(cardIndex, 1);
    setCards(updatedCards);
  }

  return (
    <div className="create-container">
      <Form>
        <div className='set-container'>
          <div className='set-header-container'>
            <h1>Create a New Set</h1>
            <Button variant='primary' type='submit' onClick={handleSubmit}>Create</Button>
          </div>
          <div className='set-info-container'>
            <FloatingLabel label='Title'>
              <Form.Control
                type='text'
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </FloatingLabel>
            <div className='set-info-details'>
              <FloatingLabel label='Description'>
                <Form.Control
                  as='textarea'
                  placeholder='Description'
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  style={{ height: '100px' }}
                />
              </FloatingLabel>
              <div className='set-info-options'>
                <Dropdown>
                  <Dropdown.Toggle variant='success' id='dropdown-basic'>
                    {selectedCategory.name || "Select a category"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categories.map(category => (
                      <Dropdown.Item
                        key={category.id}
                        onClick={() => setSelectedCategory(category)}>
                        {category.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Check
                  type="checkbox"
                  checked={isPrivate}
                  onChange={() => setIsPrivate(!isPrivate)}
                  reverse
                  label='Private?'
                />
              </div>
            </div>
          </div>
        </div>

        {cards.map((card, index) => (
          <div key={index} className='card-container'>
            <div className='card-frontback-container'>
              <FloatingLabel label='Front' className='card-container-front'>
                <Form.Control
                  type='text'
                  placeholder='Front'
                  value={card.front}
                  onChange={e => {
                    const updatedCards = [...cards];
                    updatedCards[index].front = e.target.value;
                    setCards(updatedCards)
                  }}
                />
              </FloatingLabel>
              <FloatingLabel label='Back' className='card-container-back'>
                <Form.Control
                  type='text'
                  placeholder='Back'
                  value={card.back}
                  onChange={e => {
                    const updatedCards = [...cards];
                    updatedCards[index].back = e.target.value;
                    setCards(updatedCards)
                  }}
                />
                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(index)} />
              </FloatingLabel>
            </div>
          </div>
        ))}
        <div className='footer-button-container'>
          <Button onClick={() => addCard()}>Add Card</Button>
        </div>
      </Form>
    </div>
  )
}

export default CreateSet;