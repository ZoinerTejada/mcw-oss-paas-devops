import React from 'react';
import { Grid } from 'react-bootstrap';

const MissingRoute = () => (
  <div>
    <Grid>
      <h1>Oops! We could not find the page you're looking for.</h1>
      <h2>
        Please use top menu to navigate elsewhere.
      </h2>
    </Grid>
  </div>
);

export default MissingRoute;