import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QuotePage } from '../QuotePage';

describe('QuotePage', () => {
  const defaultProps = {
    type: 'quote' as const,
    quote: 'Test quote text',
  };

  it('renders quote', () => {
    render(<QuotePage {...defaultProps} />);
    expect(screen.getByText('Test quote text')).toBeInTheDocument();
  });

  it('renders source when provided', () => {
    render(<QuotePage {...defaultProps} source="John Doe" />);
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  it('renders eyebrow when provided', () => {
    render(<QuotePage {...defaultProps} eyebrow="KEY INSIGHT" />);
    expect(screen.getByText('KEY INSIGHT')).toBeInTheDocument();
  });

  it('renders supporting text when provided', () => {
    render(<QuotePage {...defaultProps} supportingText="Additional context" />);
    expect(screen.getByText('Additional context')).toBeInTheDocument();
  });

  it('uses the theme-aware variable for text when variant is dark (default)', () => {
    render(<QuotePage {...defaultProps} />);
    const quoteEl = screen.getByText('Test quote text');
    expect(quoteEl.className).toContain('text-[var(--orca-dark-fg)]');
  });

  it('keeps literal white text when variant is orange, regardless of theme', () => {
    render(<QuotePage {...defaultProps} variant="orange" />);
    const quoteEl = screen.getByText('Test quote text');
    expect(quoteEl.className).toBe('text-4xl font-bold text-white leading-tight mb-8 max-w-2xl');
    expect(quoteEl.className).not.toContain('--orca-dark-fg');
  });
});
