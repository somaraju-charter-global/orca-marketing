import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentsPage } from '../ContentsPage';

const baseItems = [
  { page: '3', title: 'The operating reality', group: 'Context' },
  { page: '4', title: '01 · First use case', group: 'Ranked use cases' },
  { page: '6', title: '02 · Second use case', group: 'Ranked use cases' },
  { page: '8', title: '03 · Third use case', group: 'Ranked use cases' },
  { page: '10', title: 'Before and with Orcaworks', group: 'Evidence & measurement' },
  { page: '11', title: 'Sector numbers', group: 'Evidence & measurement' },
];

const flatItems = [
  { page: '3', title: 'Section one' },
  { page: '4', title: 'Section two' },
];

describe('ContentsPage', () => {
  it('renders title and items', () => {
    render(<ContentsPage type="contents" items={baseItems} />);
    expect(screen.getByText('Contents')).toBeInTheDocument();
    expect(screen.getByText('01 · First use case')).toBeInTheDocument();
  });

  it('renders eyebrow when provided', () => {
    render(<ContentsPage type="contents" eyebrow="Sector deep-dive guide" items={baseItems} />);
    expect(screen.getByText('Sector deep-dive guide')).toBeInTheDocument();
  });

  it('renders each group label once', () => {
    render(<ContentsPage type="contents" items={baseItems} />);
    expect(screen.getAllByText('Ranked use cases')).toHaveLength(1);
    expect(screen.getAllByText('Context')).toHaveLength(1);
    expect(screen.getAllByText('Evidence & measurement')).toHaveLength(1);
  });

  it('links items to their page anchors', () => {
    render(<ContentsPage type="contents" items={baseItems} />);
    expect(screen.getByText('01 · First use case').closest('a')).toHaveAttribute('href', '#page-4');
    expect(screen.getByText('The operating reality').closest('a')).toHaveAttribute('href', '#page-3');
  });

  it('renders flat items without group labels', () => {
    render(<ContentsPage type="contents" items={flatItems} />);
    expect(screen.getByText('Section one')).toBeInTheDocument();
    expect(screen.getByText('Section two')).toBeInTheDocument();
  });

  it('defaults to the light surface', () => {
    const { container } = render(<ContentsPage type="contents" items={baseItems} />);
    expect(container.firstChild).toHaveClass('bg-[#f9feff]');
  });

  it('honours surface="dark"', () => {
    const { container } = render(<ContentsPage type="contents" surface="dark" items={baseItems} />);
    expect(container.firstChild).toHaveClass('bg-[var(--orca-dark)]');
  });
});
