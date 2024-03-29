import './App.css';
import { useState } from 'react';
import groceryCartImg from './assets/grocery-cart.png';
function App() {
  const [inputValue, setInputValue] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddGroceryItem = (e) => {
    if (e.key === 'Enter') {
      if (inputValue) {
        const updateGroceryList = [...groceryItems];
        const itemIndex = updateGroceryList.findIndex(
          (item) => item.name === inputValue
        );
        if (itemIndex === -1) {
          updateGroceryList.push({
            quantity: 1,
            name: inputValue,
            completed: false,
          });
        } else {
          updateGroceryList[itemIndex].quantity++;
        }
        setGroceryItems(updateGroceryList);
        setInputValue('');
      }
    }
  };

  const handleRemoveGroceryItem = (itemName) => {
    const updateGroceryList = [...groceryItems].filter(
      (item) => item.name !== itemName
    );
    setGroceryItems(updateGroceryList);
  };

  const renderGroceryList = () => {
    return groceryItems.map((item) => (
      <li key={item.name}>
        <div className="container">
          <input type="checkbox" />
          <p>
            {item.name} <span>x{item.quantity}</span>
          </p>
        </div>
        <div>
          <button
            className="remove-button"
            onClick={() => handleRemoveGroceryItem(item.name)}
          >
            X
          </button>
        </div>
      </li>
    ));
  };

  return (
    <main className="App">
      <div>
        <div>
          <h4 className="success">You're Done</h4>
          <div className="header">
            <h1>Shopping List</h1>
            <img src={groceryCartImg} alt="" />
            <input
              type="text"
              placeholder="Add an Item"
              className="item-input"
              onChange={handleChangeInputValue}
              value={inputValue}
              onKeyDown={handleAddGroceryItem}
            />
          </div>
        </div>
        <ul>{renderGroceryList()}</ul>
      </div>
    </main>
  );
}

export default App;
