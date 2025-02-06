import React, { useCallback, useState } from 'react'
import SuggestionsList from './SuggestionsList'
import useDebounce from '../hooks/useDebounce';

const AutoCompleteSearchBar = ({fetchSearchResults}) => {
    const { debounce } = useDebounce();
    const [inputText, setInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    // const [error, setError] = useState('');
    // const [loading, setLoading] = useState(false);
    const [hoveredIndex, setHoverIndex] = useState(-1);

    const resetSuggestions = useCallback(() => {
        setTimeout(() => {
            setSuggestions([]);
        }, 500);
    }, [])

    const fetchSuggestions = useCallback(async (query) => {
        // setLoading(true);
        try {
            const results = await fetchSearchResults(query);
            setSuggestions(results);
        } catch (e) {
            resetSuggestions();
            //setError(e);
        } finally {
            //setLoading(false);
        }
    }, [fetchSearchResults, resetSuggestions]);

    const fetchSuggestionsDebounced = useCallback(debounce(fetchSuggestions, 300), [debounce, fetchSuggestions]);

    const handleOnChange = (e) => {
        setInputText(e.target.value);
        if(e.target.value) {
            fetchSuggestionsDebounced(e.target.value);
        } else {
            resetSuggestions();
        }
    };

    const handleKeyDown = (e) => {
        if(e.key === 'ArrowDown') {
            setHoverIndex((prevIndex) => prevIndex === suggestions.length-1 ? -1 : prevIndex+1);
        } else if (e.key === 'ArrowUp') {
            setHoverIndex((prevIndex) => prevIndex === -1 ? suggestions.length-1 : prevIndex-1);
        }
    }

    const handleSuggestionClick = (suggestion) => {
        setInputText(suggestion.name);
        setSuggestions([]);
    };

  return (
    <div className="searchbar-container">
        <input 
            type="text" 
            placeholder="Search..." 
            value={inputText} 
            onChange={handleOnChange} 
            onKeyDown={handleKeyDown}
        />
        { suggestions.length>0 && 
            <SuggestionsList 
                suggestions={suggestions} 
                inputText={inputText} 
                hoveredIndex={hoveredIndex} 
                onSelect={handleSuggestionClick}
            /> }
    </div>
  )
}

export default AutoCompleteSearchBar