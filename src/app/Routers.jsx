import { Fragment } from 'react';
import { BrowserRouter, Routes as RRDRoutes, Route } from 'react-router-dom';
import { RouteChanger } from './RouteChanger';

import { Login } from '../Login';
import { QuestionAge } from '../Age';
import { QuestionSeason } from '../Season';
import { Result } from '../Result';

export function Routers() {
  return (
    <BrowserRouter>
      <RRDRoutes>
        <Route path="/" element={<Login />} />
        <Route path="/age-question" element={<QuestionAge />} />
        <Route path="/season-question" element={<QuestionSeason />} />
        <Route path="/result" element={<Result />} />
      </RRDRoutes>

      <RouteChanger />
    </BrowserRouter>
  );
}
