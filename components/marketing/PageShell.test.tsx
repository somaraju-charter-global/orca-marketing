import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageShell } from './PageShell';

describe('PageShell', () => {
  it('renders children', () => {
    render(
      <PageShell>
        <div>Test content</div>
      </PageShell>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with light variant by default', () => {
    const { container } = render(
      <PageShell>
        <div>Test</div>
      </PageShell>
    );
    expect(container.firstChild).toHaveClass('bg-[#f9feff]');
  });

  it('renders with dark variant', () => {
    const { container } = render(
      <PageShell variant="dark">
        <div>Test</div>
      </PageShell>
    );
    expect(container.firstChild).toHaveClass('bg-[var(--orca-dark)]');
  });

  it('renders with orange variant', () => {
    const { container } = render(
      <PageShell variant="orange">
        <div>Test</div>
      </PageShell>
    );
    expect(container.firstChild).toHaveClass('bg-[var(--orca-orange)]');
  });

  it('renders with blue variant', () => {
    const { container } = render(
      <PageShell variant="blue">
        <div>Test</div>
      </PageShell>
    );
    expect(container.firstChild).toHaveClass('bg-[var(--orca-blue)]');
  });

  it('renders with black variant', () => {
    const { container } = render(
      <PageShell variant="black">
        <div>Test</div>
      </PageShell>
    );
    expect(container.firstChild).toHaveClass('bg-[var(--orca-black)]');
  });

  it('renders with green variant', () => {
    const { container } = render(
      <PageShell variant="green">
        <div>Test</div>
      </PageShell>
    );
    expect(container.firstChild).toHaveClass('bg-[var(--orca-green)]');
  });

  it('renders with healthcareMist variant, using dark ink text on the light background', () => {
    const { container } = render(
      <PageShell variant="healthcareMist">
        <div>Test</div>
      </PageShell>
    );
    expect(container.firstChild).toHaveClass('bg-[var(--orca-healthcare-mist)]');
    expect(container.firstChild).toHaveClass('text-[var(--orca-ink)]');
  });

  it('renders section label when provided', () => {
    render(
      <PageShell sectionLabel="SECTION 1">
        <div>Test</div>
      </PageShell>
    );
    expect(screen.getByText('SECTION 1')).toBeInTheDocument();
  });

  it('renders page number when provided', () => {
    render(
      <PageShell pageNumber="1">
        <div>Test</div>
      </PageShell>
    );
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('renders citation when provided', () => {
    render(
      <PageShell citation={{ text: 'Source', url: 'https://example.com' }}>
        <div>Test</div>
      </PageShell>
    );
    const link = screen.getByText('Source');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('hides footer when showFooter is false', () => {
    const { container } = render(
      <PageShell showFooter={false}>
        <div>Test</div>
      </PageShell>
    );
    expect(container.textContent).not.toContain('Orcaworks');
  });
});
