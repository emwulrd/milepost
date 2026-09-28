/**
 * Every route the app exposes, as one source of truth.
 *
 * `App.tsx` renders these paths and the header Menu lists them — sharing one
 * array means a new route is reachable from the Menu the moment it is added
 * here, instead of the two silently drifting apart.
 */
export interface AppRoute {
  path: string;
  label: string;
  title: string;
}

export const APP_ROUTES: AppRoute[] = [
  { path: '/directory', label: 'Programme directory', title: 'Programme directory — Milepost' },
  { path: '/programme', label: 'Programme detail', title: 'Programme detail — Milepost' },
  { path: '/funders', label: 'Funders', title: 'Funders — Milepost' },
  { path: '/recipients', label: 'Recipients', title: 'Recipients — Milepost' },
  { path: '/recipients/standing', label: 'Standing', title: 'Standing — Milepost' },
  { path: '/recipients/award-progress', label: 'Award progress', title: 'Award progress — Milepost' },
  { path: '/recipients/application-timeline', label: 'Application timeline', title: 'Application timeline — Milepost' },
  { path: '/verifiers', label: 'Verifiers', title: 'Verifiers — Milepost' },
  { path: '/finalize', label: 'Finalize awards', title: 'Finalize awards — Milepost' },
  { path: '/policy', label: 'Spend policy', title: 'Spend policy — Milepost' },
  { path: '/admin', label: 'Admin', title: 'Admin — Milepost' },
  { path: '/admin/standing', label: 'Admin standing lookup', title: 'Admin standing lookup — Milepost' },
  { path: '/attestations', label: 'Attestation lookup', title: 'Attestation lookup — Milepost' },
  { path: '/schemas/register', label: 'Register schema', title: 'Register schema — Milepost' },
  { path: '/keepalive', label: 'Keepalive', title: 'Keepalive — Milepost' },
  { path: '/admin/payees', label: 'Payee management', title: 'Payee management — Milepost' },
  { path: '/status', label: 'Index status', title: 'Index status — Milepost' },
  { path: '/about', label: 'About deployment', title: 'About this deployment — Milepost' },
];

/**
 * In-page anchors on the home landing page, for the header Menu's
 * "On this page" group.
 *
 * Grows as the remaining landing sections (how it works, modes, roles) land
 * in their own issues. Listing only sections that exist keeps every entry a
 * working link instead of a placeholder anchor with nothing to scroll to.
 */
export interface HomeAnchor {
  id: string;
  label: string;
}

export const HOME_ANCHORS: HomeAnchor[] = [
  { id: 'how', label: 'How it works' },
  { id: 'roles', label: 'Roles' },
  { id: 'developers', label: 'Developers' },
];
