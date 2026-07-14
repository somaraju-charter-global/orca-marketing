import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GuideThemeProvider } from '../GuideThemeContext';
import { PageShell } from '../PageShell';

describe('GuideThemeProvider - dark surface override', () => {
  it('does not override --orca-dark when no theme is set', () => {
    const { container } = render(
      <GuideThemeProvider theme={undefined}>
        <PageShell variant="dark">
          <div>Test</div>
        </PageShell>
      </GuideThemeProvider>
    );
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--orca-dark')).toBe('');
  });

  it('does not override --orca-dark for non-mist themes (e.g. orange)', () => {
    const { container } = render(
      <GuideThemeProvider theme="orange">
        <PageShell variant="dark">
          <div>Test</div>
        </PageShell>
      </GuideThemeProvider>
    );
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--orca-dark')).toBe('');
  });

  it('overrides --orca-dark to the mist-dark teal when theme is healthcareMist', () => {
    const { container } = render(
      <GuideThemeProvider theme="healthcareMist">
        <PageShell variant="dark">
          <div>Test</div>
        </PageShell>
      </GuideThemeProvider>
    );
    const scope = container.querySelector('.contents') as HTMLElement;
    expect(scope.style.getPropertyValue('--orca-dark')).toBe('var(--orca-healthcare-mist-dark)');
  });

  it('still renders PageShell content correctly with the override active', () => {
    const { getByText } = render(
      <GuideThemeProvider theme="healthcareMist">
        <PageShell variant="dark">
          <div>Themed dark page</div>
        </PageShell>
      </GuideThemeProvider>
    );
    expect(getByText('Themed dark page')).toBeInTheDocument();
  });
});
