import { Link } from 'react-router-dom';
import css from './GoBackBtn.module.css';

export const GoBackBtn = ({ to }) => {
  return (
    <div className={css.container}>
      <Link className={css.link} to={to}>
        <span className={css.btn}>Go back</span>
      </Link>
    </div>
  );
};
