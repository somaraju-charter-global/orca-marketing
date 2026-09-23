import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RightHandContent } from '../RightHandContent';

describe('RightHandContent', () => {
  it('renders the default card quote with its source', () => {
    render(
      <RightHandContent
        content={{ type: 'quote', quote: 'We lose control.', source: 'Coordinator' }}
      />
    );
    expect(screen.getByText(/We lose control\./)).toBeInTheDocument();
    expect(screen.getByText(/Coordinator/)).toBeInTheDocument();
  });

  it('renders nothing in the column for a band quote', () => {
    const { container } = render(
      <RightHandContent
        content={{ type: 'quote', quote: 'Q', presentation: 'band' }}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders a bare quote without the card background', () => {
    render(
      <RightHandContent
        content={{ type: 'quote', quote: 'Bare quote', presentation: 'bare' }}
      />
    );
    const quote = screen.getByText('Bare quote');
    expect(quote.closest('.bg-\\[var\\(--orca-orange\\)\\]')).toBeNull();
  });

  it('renders the stat card with value, label and source', () => {
    render(
      <RightHandContent
        content={{ type: 'stat', value: '90%', label: 'Straight-through', source: 'Canon USA' }}
      />
    );
    expect(screen.getByText('90%')).toBeInTheDocument();
    expect(screen.getByText('Straight-through')).toBeInTheDocument();
    expect(screen.getByText(/Canon USA/)).toBeInTheDocument();
  });

  it('renders the inset image', () => {
    render(
      <RightHandContent
        content={{ type: 'image', src: '/images/x.jpg', alt: 'Port' }}
      />
    );
    const img = screen.getByAltText('Port');
    expect(img).toHaveClass('object-cover');
  });
});
