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

  it('renders split layout with all text content when layout="split" and image set', () => {
    const sections = [{ page: '3', title: 'Section One' }];
    render(
      <CoverPage
        {...defaultProps}
        layout="split"
        image="/test-image.jpg"
        kicker="TEST KICKER"
        sections={sections}
      />
    );
    expect(screen.getByText('Test Guide')).toBeInTheDocument();
    expect(screen.getByText('A test subtitle')).toBeInTheDocument();
    expect(screen.getByText('TEST KICKER')).toBeInTheDocument();
    expect(screen.getByText('Section One')).toBeInTheDocument();
  });

  it('falls back to overlay rendering when layout="split" but no image', () => {
    render(<CoverPage {...defaultProps} layout="split" />);
    expect(screen.getByText('Test Guide')).toBeInTheDocument();
  });

  it('renders inset layout with text and image', () => {
    const { container } = render(
      <CoverPage {...defaultProps} layout="inset" image="/test-image.jpg" kicker="KICK" />
    );
    expect(screen.getByText('Test Guide')).toBeInTheDocument();
    expect(screen.getByText('KICK')).toBeInTheDocument();
    expect(container.querySelectorAll('img').length).toBeGreaterThan(1);
  });

  it('renders meta items in every layout', () => {
    const meta = ['8 use cases', 'Evidence for each'];
    for (const layout of ['overlay', 'split', 'inset'] as const) {
      const { unmount } = render(
        <CoverPage {...defaultProps} layout={layout} image="/test-image.jpg" meta={meta} />
      );
      expect(screen.getByText('8 use cases')).toBeInTheDocument();
      expect(screen.getByText('Evidence for each')).toBeInTheDocument();
      unmount();
    }
  });
});
