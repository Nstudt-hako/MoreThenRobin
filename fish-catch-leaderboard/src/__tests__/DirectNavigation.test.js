import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Simuliere direkten Aufruf einer tiefen URL wie auf GitHub Pages:
// Browser lädt index.html und react-router muss /home auflösen.
describe('Direct navigation', () => {
  it('rendert HomeScreen bei direktem Aufruf /home', () => {
    // Setze die Location so wie beim direkten Seitenaufruf
    window.history.pushState({}, 'Home', '/MoreThenRobin/home');
    render(<App />);
    // Ein eindeutiges Element aus HomeScreen prüfen
    expect(screen.getByRole('heading', { name: /more than robin/i })).toBeInTheDocument();
  });

  it('redirects unknown path to home (wildcard)', () => {
    // Simulate direct navigation to an unknown route
    window.history.pushState({}, 'Unknown', '/MoreThenRobin/does-not-exist');
    render(<App />);
    expect(screen.getByRole('heading', { name: /more than robin/i })).toBeInTheDocument();
  });
});
