import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TwoPageVerticalBrief } from '../TwoPageVerticalBrief';
import type { TwoPageVerticalBrief as TwoPageVerticalBriefContent } from '@/content/onepager-types';

function makeBrief(accentTheme?: TwoPageVerticalBriefContent['accentTheme']): TwoPageVerticalBriefContent {
  return {
    layout: 'two-page-vertical-brief',
    slug: 'test-brief',
    accentTheme,
    vertical: 'Testing',
    audience: 'QA',
    hero: {
      eyebrow: 'ORCAWORKS FOR TESTING',
      headline: 'Test headline',
      subheadline: 'Test subheadline',
    },
    page1: {
      businessCostProofPoint: {
        label: 'The business cost',
        statement: 'Test statement',
      },
      challenge: { title: 'The challenge', body: 'Test body' },
      solutionVisual: {},
      orcaworksValue: { title: 'Value', items: [{ title: 'Item', description: 'Desc' }] },
      bottomCallout: { title: 'Opportunity', statement: 'Test' },
    },
    page2: {
      title: 'Page 2 title',
      subtitle: 'Page 2 subtitle',
      strategicBusinessPriorities: [{ title: 'Priority', description: 'Desc' }],
      priorityWorkflows: [{ title: 'Workflow', description: 'Desc' }],
      valueMetrics: [{ metric: 'Metric', baseline: 'Baseline', movement: 'Movement', impact: 'Impact' }],
      cta: { statement: 'Test CTA' },
    },
    footer: { website: 'orcaworks.com' },
  };
}

describe('TwoPageVerticalBrief - accent theme', () => {
  it('defaults to the orange accent when no accentTheme is set', () => {
    const { container } = render(<TwoPageVerticalBrief {...makeBrief(undefined)} />);
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--tp-accent')).toBe('var(--orca-orange)');
  });

  it('sets the --tp-accent variable to green when accentTheme is "green"', () => {
    const { container } = render(<TwoPageVerticalBrief {...makeBrief('green')} />);
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--tp-accent')).toBe('var(--orca-green)');
  });

  it('still renders both pages content correctly with a theme set', () => {
    render(<TwoPageVerticalBrief {...makeBrief('blue')} />);
    expect(screen.getByText('Test headline')).toBeInTheDocument();
    expect(screen.getByText('Page 2 title')).toBeInTheDocument();
  });

  it('healthcareMist uses the paired teal for the foreground accent, not the pale mist itself', () => {
    const { container } = render(<TwoPageVerticalBrief {...makeBrief('healthcareMist')} />);
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--tp-accent')).toBe('var(--orca-healthcare-mist-ink)');
  });

  it('healthcareMist uses the real pale mist color for the callout background, not a diluted accent', () => {
    render(<TwoPageVerticalBrief {...makeBrief('healthcareMist')} />);
    const calloutLabel = screen.getByText('The business cost');
    const callout = calloutLabel.closest('div.border-l-4') as HTMLElement;
    expect(callout.className).toContain('bg-[var(--orca-healthcare-mist)]');
    expect(callout.className).not.toContain('bg-[var(--tp-accent)]/10');
  });

  it('other themes still use the diluted accent for the callout background', () => {
    render(<TwoPageVerticalBrief {...makeBrief('green')} />);
    const calloutLabel = screen.getByText('The business cost');
    const callout = calloutLabel.closest('div.border-l-4') as HTMLElement;
    expect(callout.className).toContain('bg-[var(--tp-accent)]/10');
  });

  it('defaults the banner to navy when no accentTheme is set', () => {
    const { container } = render(<TwoPageVerticalBrief {...makeBrief(undefined)} />);
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--tp-banner')).toBe('var(--orca-dark)');
  });

  it('uses a dark teal banner for healthcareMist instead of navy', () => {
    const { container } = render(<TwoPageVerticalBrief {...makeBrief('healthcareMist')} />);
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--tp-banner')).toBe('var(--orca-healthcare-mist-dark)');
  });

  it('keeps the banner navy for the other accent themes too', () => {
    const { container } = render(<TwoPageVerticalBrief {...makeBrief('green')} />);
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--tp-banner')).toBe('var(--orca-dark)');
  });
});
