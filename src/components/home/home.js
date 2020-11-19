import React from 'react';
import {Button} from 'react-bootstrap';
export default function Home() {
  return (
    <div>
      Home
      <br />
      <Button as="a" href="/counter">
        Go To Counter
      </Button>
    </div>
  );
}
