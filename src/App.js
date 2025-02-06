import { useCallback } from 'react';
import './App.css';
import AutoCompleteSearchBar from './components/AutoCompleteSearchBar';

function App() {
  const fetchSearchResults = useCallback(async (query) => {
      const response = await fetch('https://dummyjson.com/recipes/search?q=' + query);
      if(!response.ok) {
        throw new Error('Failed to fetch results');
      }
      const data = await response.json();
      return data.recipes;
  }, []);

  return (
    <div className="App">
      <h2>AutoComplete Search</h2>
      <AutoCompleteSearchBar fetchSearchResults={fetchSearchResults} />
    </div>
  );
}

export default App;
