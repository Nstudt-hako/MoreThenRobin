import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MobileNav from '../MobileNav';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { GroupContext } from '../../context/GroupContext';
import { axe } from 'jest-axe';

const lightTheme = {
  primary:'#6200EE', background:'#fff', surface:'#fff', text:'#111', textSecondary:'#555', border:'#e2e8f0'
};

function renderWithProviders({ user=null, groups=[], initialPath='/home'}={}) {
  return render(
    <AuthContext.Provider value={{ user, isAdmin:false }}>
      <GroupContext.Provider value={{ groups, activeGroupId: groups[0]?.id || null }}>
        <ThemeContext.Provider value={{ theme:lightTheme }}>
          <MemoryRouter initialEntries={[initialPath]}>
            <Routes>
              <Route path="*" element={<MobileNav />} />
            </Routes>
          </MemoryRouter>
        </ThemeContext.Provider>
      </GroupContext.Provider>
    </AuthContext.Provider>
  );
}

describe('MobileNav', () => {
  test('shows login when logged out', () => {
    renderWithProviders({ user:null });
    expect(screen.getByText(/^login$/i)).toBeInTheDocument();
    // No profile nav item
    expect(screen.queryByTestId('nav-me')).not.toBeInTheDocument();
    expect(screen.queryByTestId('nav-add')).not.toBeInTheDocument();
  });

  test('shows user links when logged in without groups', () => {
    renderWithProviders({ user:{ email:'a@test' } });
    expect(screen.getByTestId('nav-me')).toBeInTheDocument();
    expect(screen.getByTestId('nav-add')).toBeInTheDocument();
    // groups link hidden without groups
    expect(screen.queryByTestId('nav-groups')).not.toBeInTheDocument();
  });

  test('shows groups link when user has groups', () => {
    renderWithProviders({ user:{ email:'a@test' }, groups:[{ id:'g1', name:'Testers'}] });
    expect(screen.getByTestId('nav-groups')).toBeInTheDocument();
  });

  test('highlights active route', () => {
    renderWithProviders({ user:{ email:'a@test' }, initialPath:'/leaderboard' });
    const active = screen.getByText(/board/i).closest('a');
    expect(active).toHaveClass('active');
  });

  test('a11y: no critical axe violations', async () => {
    const { container } = renderWithProviders({ user:{ email:'a@test' } });
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
