import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RightHandContent } from '../RightHandContent';
import { GuideThemeProvider } from '../GuideThemeContext';

describe('RightHandContent - detailedText block', () => {
  it('uses white text on the orange background (default option)', () => {
    render(
      <RightHandContent
        content={{ type: 'detailedText', text: 'Orange block', color: 'orange' }}
      />
    );
    const wrapper = screen.getByText('Orange block').parentElement;
    expect(wrapper?.className).toContain('bg-[var(--orca-orange)]');
    expect(wrapper?.className).toContain('text-white');
  });

  it('uses the mist background with dark ink text for healthcareMist', () => {
    render(
      <RightHandContent
        content={{ type: 'detailedText', text: 'Mist block', color: 'healthcareMist' }}
      />
    );
    const wrapper = screen.getByText('Mist block').parentElement;
    expect(wrapper?.className).toContain('bg-[var(--orca-healthcare-mist)]');
    expect(wrapper?.className).toContain('text-[var(--orca-ink)]');
    expect(wrapper?.className).not.toContain('text-white');
  });

  it('falls back to the new light-panel default when no guide theme is set and no color is given', () => {
    render(
      <RightHandContent content={{ type: 'detailedText', text: 'No theme, no color' }} />
    );
    const wrapper = screen.getByText('No theme, no color').parentElement;
    expect(wrapper?.className).toContain('bg-[var(--page-panel)]');
    expect(wrapper?.className).toContain('text-[var(--page-panel-fg)]');
  });

  it('picks up the guide-level theme automatically when the block sets no color', () => {
    render(
      <GuideThemeProvider theme="healthcareMist">
        <RightHandContent content={{ type: 'detailedText', text: 'Themed block' }} />
      </GuideThemeProvider>
    );
    const wrapper = screen.getByText('Themed block').parentElement;
    expect(wrapper?.className).toContain('bg-[var(--orca-healthcare-mist)]');
    expect(wrapper?.className).toContain('text-[var(--orca-ink)]');
  });

  it('lets an explicit block color override the guide-level theme', () => {
    render(
      <GuideThemeProvider theme="healthcareMist">
        <RightHandContent
          content={{ type: 'detailedText', text: 'Overridden block', color: 'orange' }}
        />
      </GuideThemeProvider>
    );
    const wrapper = screen.getByText('Overridden block').parentElement;
    expect(wrapper?.className).toContain('bg-[var(--orca-orange)]');
    expect(wrapper?.className).toContain('text-white');
  });

  it('uses a true black background with white text for the black option', () => {
    render(
      <RightHandContent
        content={{ type: 'detailedText', text: 'Black block', color: 'black' }}
      />
    );
    const wrapper = screen.getByText('Black block').parentElement;
    expect(wrapper?.className).toContain('bg-[var(--orca-black)]');
    expect(wrapper?.className).toContain('text-white');
  });
});

