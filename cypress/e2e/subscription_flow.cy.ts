/// <reference types="cypress" />

// NOTE: This spec is designed to accompany a live stripe-cli listener forwarding
// events to /api/stripe/webhook. Because automated interaction with the hosted
// Stripe Checkout page is restricted (cross‑origin + Stripe's protections), the
// test treats the payment step as a manual action. Run with `npm run dev` and
// stripe listen... then start `npm run cy:open` and execute this spec.

describe('Subscription flow (manual payment step)', () => {
  it('navigates upgrade, launches checkout, and lands on assessment screen', () => {
    cy.visit('/upgrade');

    // Click the first Subscribe button (Core). Adjust selector if pricing markup changes.
    cy.contains(/subscribe/i).first().click();

    // Expect redirect off-site to Stripe Checkout. We cannot fully automate checkout.
    cy.origin('https://checkout.stripe.com', () => {
      // This block intentionally left minimal; user completes test card entry manually.
    });

    // AFTER you finish the payment manually, Stripe will redirect back to /success?... which
    // immediately server-redirects to /assessment/start?tier=<tier>. We wait for that URL.
    cy.url({ timeout: 120000 }).should('match', /\/assessment\/start\?tier=/);
    cy.contains('Assessment unlocked').should('be.visible');
  });
});
