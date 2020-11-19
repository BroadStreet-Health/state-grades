import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
  incrementAsync2,
} from './counter-slice';
import styles from './counter.module.css';

import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <Button as="a" href="/">
        Home
      </Button>
      <br />
      <div className={'row'}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
        <button
          className={styles.asyncButton}
          onClick={() =>
            dispatch(incrementAsync2(Number(incrementAmount) || 0))
          }
        >
          Add Async2
        </button>
      </div>
    </div>
  );
}
