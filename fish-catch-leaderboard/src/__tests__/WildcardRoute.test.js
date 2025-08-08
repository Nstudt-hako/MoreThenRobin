import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// This test asserts that an unknown path (e.g. /does-not-exist) is redirected to the home screen via the wildcard route.
describe('Wildcard route redirect', () => {
  it('redirects unknown path to home (root)', async () => {
    window.history.pushState({}, 'Unknown', '/MoreThenRobin/does-not-exist');
    render(<App />);
    // HomeScreen heading should appear (ensures redirect happened)
    expect(await screen.findByRole('heading', { name: /more than robin/i })).toBeInTheDocument();
  });

  it('redirects deep unknown path to home', async () => {
    window.history.pushState({}, 'Unknown Deep', '/MoreThenRobin/unknown/deeper/path');
    render(<App />);
    expect(await screen.findByRole('heading', { name: /more than robin/i })).toBeInTheDocument();
  });

  it('keeps a known path (no redirect)', async () => {
    window.history.pushState({}, 'Leaderboard', '/MoreThenRobin/leaderboard');
    render(<App />);
    // Disambiguate: find the heading element that contains the leaderboard title (role heading level 1)
    const headings = await screen.findAllByRole('heading', { level: 1 });
    const leaderboardHeading = headings.find(h => /leaderboard/i.test(h.textContent || ''));
    expect(leaderboardHeading).toBeTruthy();
  });
});
