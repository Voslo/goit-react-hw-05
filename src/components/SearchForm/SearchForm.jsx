import { useEffect, useRef } from 'react';
import css from './SearchForm.module.css'

export const SearchForm = ({ onSearch }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(e.target.elements.query);
    e.target.reset();
    inputRef.current?.focus(); 
  };

  return (
    <div>
      <header>
        <form className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.input}
            ref={inputRef} 
            type="text"
            name="query"
          />
          <button className={css.btn} type="submit">Search</button>
        </form>
      </header>
    </div>
  );
};