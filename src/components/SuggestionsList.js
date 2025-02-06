import React, { useCallback, useEffect } from 'react'

const SuggestionsList = ({ suggestions, inputText, hoveredIndex, onSelect }) => {

    const highlightText = (text) => {
        const chunks = text.split(new RegExp(`(${inputText})`, 'gi'));
        return chunks.map((c, index) => {
            return c.toLowerCase()===inputText.toLowerCase() ? <b key={index}>{c}</b> : c;
        });
    }

    const scrollActiveItemIntoView = useCallback(() => {
        const activeRecipe = document.getElementById(`recipe-${hoveredIndex}`);
        activeRecipe.scrollIntoView({
            block: 'nearest',
            inline: 'start',
            behavior: 'smooth'
        });
    }, [hoveredIndex])

    useEffect(() => {
        if(hoveredIndex !== -1) {
            scrollActiveItemIntoView();
        }
    }, [scrollActiveItemIntoView, hoveredIndex])

  return (
    <ul>
        {suggestions.map((recipe, index) => (
            <li key={index} 
                id={`recipe-${index}`}
                onClick={() => onSelect(recipe)}
                className={hoveredIndex===index ? 'hovered' : ''}>
                {highlightText(recipe.name)}
            </li>
        ))}
    </ul>
  )
}

export default SuggestionsList