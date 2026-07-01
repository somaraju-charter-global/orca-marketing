import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatPage } from '../StatPage';

describe('StatPage', () => {
  const defaultProps = {
    type: 'stat' as const,
    headline: 'Impact Metrics',
    stats: [
      { value: '50%', label: 'Efficiency gain' },
      { value: '$1M', label: 'Cost savings' },
    ],
  };

  it('renders headline', () => {
    render(<StatPage {...defaultProps} />);
    expect(screen.getByText('Impact Metrics')).toBeInTheDocument();
  });

  it('renders all stats', () => {
    render(<StatPage {...defaultProps} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('Efficiency gain')).toBeInTheDocument();
    expect(screen.getByText('$1M')).toBeInTheDocument();
    expect(screen.getByText('Cost savings')).toBeInTheDocument();
  });

  it('renders stat descriptions when provided', () => {
    const props = {
      ...defaultProps,
      stats: [
        { value: '50%', label: 'Efficiency gain', description: 'Measured over 6 months' },
      ],
    };
    render(<StatPage {...props} />);
    expect(screen.getByText('Measured over 6 months')).toBeInTheDocument();
  });

  it('renders eyebrow when provided', () => {
    render(<StatPage {...defaultProps} eyebrow="BY THE NUMBERS" />);
    expect(screen.getByText('BY THE NUMBERS')).toBeInTheDocument();
  });
});
