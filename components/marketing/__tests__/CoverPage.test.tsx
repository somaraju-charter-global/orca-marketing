import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CoverPage } from '../CoverPage';

describe('CoverPage', () => {
  const defaultProps = {
    type: 'cover' as const,
    title: 'Test Guide',
    subtitle: 'A test subtitle',
  };

  it('renders title and subtitle', () => {
    render(<CoverPage {...defaultProps} />);
    expect(screen.getByText('Test Guide')).toBeInTheDocument();
    expect(screen.getByText('A test subtitle')).toBeInTheDocument();
  });

  it('renders kicker when provided', () => {
    render(<CoverPage {...defaultProps} kicker="TEST KICKER" />);
    expect(screen.getByText('TEST KICKER')).toBeInTheDocument();
  });

  it('renders sections when provided', () => {
    const sections = [
      { page: '1', title: 'Introduction' },
      { page: '2', title: 'Overview' },
    ];
    render(<CoverPage {...defaultProps} sections={sections} />);
    expect(screen.getByText('Contents')).toBeInTheDocument();
    expect(screen.getByText('Introduction')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders without sections when not provided', () => {
    const { container } = render(<CoverPage {...defaultProps} />);
    expect(container.textContent).not.toContain('Contents');
  });

  it('renders additional image when provided', () => {
    const { container } = render(<CoverPage {...defaultProps} image="/test-image.jpg" />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(1); // Logo + background image
  });
});
