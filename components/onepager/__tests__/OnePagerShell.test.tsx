import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OnePagerShell } from '../OnePagerShell';

describe('OnePagerShell', () => {
  it('renders children', () => {
    render(
      <OnePagerShell>
        <div>Test content</div>
      </OnePagerShell>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders footer website when provided', () => {
    render(
      <OnePagerShell footer={{ website: 'orcaworks.com' }}>
        <div>Test</div>
      </OnePagerShell>
    );
    expect(screen.getByText('orcaworks.com')).toBeInTheDocument();
  });

  it('renders with light variant by default', () => {
    const { container } = render(
      <OnePagerShell>
        <div>Test</div>
      </OnePagerShell>
    );
    expect(container.querySelector('.bg-white')).toBeInTheDocument();
  });

  it('renders with dark variant', () => {
    const { container } = render(
      <OnePagerShell variant="dark">
        <div>Test</div>
      </OnePagerShell>
    );
    expect(container.querySelector('.bg-\\[--orca-dark\\]')).toBeInTheDocument();
  });
});
