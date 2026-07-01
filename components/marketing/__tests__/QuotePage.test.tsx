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
});
