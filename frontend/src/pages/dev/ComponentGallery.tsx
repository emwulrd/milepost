import React, { useState } from 'react';
import './ComponentGallery.css';
import {
  Button,
  Card,
  Stat,
  Badge,
  PhaseBadge,
  Field,
  AmountField,
  Select,
  TextArea,
  RadioGroup,
  DateField,
  AddressChip,
  CopyButton,
  Deadline,
  Table,
  Modal,
} from '../../components/ui';
import { Skeleton, EmptyState, ErrorPanel } from '../../components/state/AsyncStates';
import { usePageTitle } from '../../hooks/usePageTitle';

export function ComponentGallery(): React.JSX.Element {
  usePageTitle('Component Gallery — Development');
  const [modalOpen, setModalOpen] = useState(false);
  const [amountVal, setAmountVal] = useState('100.5');
  const [textVal, setTextVal] = useState('');
  const [radioVal, setRadioVal] = useState('direct');

  const demoAddress = 'GA7QYNF7SOWQ3GLR2BGMZEHXAVIRZA4KVWLTJJFC7MGXUA74P7UJVSGZ';
  const demoContract = 'CCBQHBNIG5FIJEM6SQZQGTQRO3XXHV2BGVGGUY5JXXZ3Y55ZJSV3HMVF';

  const tableColumns = [
    { key: 'role', header: 'Role', render: (row: { role: string }) => <strong>{row.role}</strong> },
    { key: 'action', header: 'Allowed Action', render: (row: { action: string }) => row.action },
    { key: 'badge', header: 'Status', render: (row: { badge: 'Open' | 'Review' | 'Settled' }) => <PhaseBadge phase={row.badge} /> },
  ];

  const tableData = [
    { role: 'Funder', action: 'Contribute funds to pool', badge: 'Open' as const },
    { role: 'Reviewer', action: 'Submit application reviews', badge: 'Review' as const },
    { role: 'Verifier', action: 'Attest condition completion', badge: 'Settled' as const },
  ];

  return (
    <div className="container page-wrapper component-gallery">
      <header className="gallery-header">
        <span className="eyebrow">Development Tooling</span>
        <h1 className="gallery-title">UI Component Gallery</h1>
        <p className="text-muted">
          Interactive showcase of all design system components in both light and dark themes.
        </p>
      </header>

      {/* Buttons */}
      <section className="gallery-section">
        <h2>Buttons</h2>
        <div className="gallery-row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" loading>Loading</Button>
        </div>
      </section>

      {/* Badges & Phase Badges */}
      <section className="gallery-section">
        <h2>Badges</h2>
        <div className="gallery-row">
          <Badge tone="accent">Accent</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="danger">Danger</Badge>
          <PhaseBadge phase="Open" />
          <PhaseBadge phase="Review" />
          <PhaseBadge phase="Settled" />
          <PhaseBadge phase="Cancelled" />
        </div>
      </section>

      {/* Cards & Stats */}
      <section className="gallery-section">
        <h2>Cards & Stats</h2>
        <div className="gallery-grid">
          <Card>
            <Stat label="Total Volume" value="125,000 XLM" />
          </Card>
          <Card>
            <Stat label="Active Recipients" value="48" helper="Verified applicants" />
          </Card>
          <Card>
            <Stat label="Release Progress" value="84%" helper="16 / 19 tranches" />
          </Card>
        </div>
      </section>

      {/* Form Fields */}
      <section className="gallery-section">
        <h2>Form Inputs</h2>
        <div className="gallery-form-grid">
          <Field label="Programme Name" value={textVal} onChange={(e) => setTextVal(e.target.value)} placeholder="e.g. STEM Grants 2026" />
          <AmountField
            label="Contribution Amount"
            value={amountVal}
            onChange={setAmountVal}
            asset="XLM"
            balance={1_000_000_000n}
          />
          <Select
            label="Disbursement Mode"
            value={radioVal}
            onChange={(e) => setRadioVal(e.target.value)}
            options={[
              { value: 'direct', label: 'Direct Mode' },
              { value: 'allocated', label: 'Allocated Mode' },
              { value: 'restricted', label: 'Restricted Mode' },
            ]}
          />
          <DateField
            label="Application Deadline"
            value="2026-10-15"
            onChange={() => {}}
          />
          <RadioGroup
            legend="Disbursement Mode Option"
            name="disbursement-mode"
            value={radioVal}
            onChange={setRadioVal}
            options={[
              { value: 'direct', label: 'Direct', description: 'Straight to verified payee' },
              { value: 'allocated', label: 'Allocated', description: 'Recipient chooses payee' },
            ]}
          />
          <TextArea
            label="Proposal Abstract"
            value=""
            onChange={() => {}}
            placeholder="Brief overview of the project..."
          />
        </div>
      </section>

      {/* AddressChip & CopyButton */}
      <section className="gallery-section">
        <h2>Addresses & Explorer Links</h2>
        <div className="gallery-row">
          <AddressChip address={demoAddress} showExplorerLink copyLabel="Copy account" />
          <AddressChip address={demoContract} showExplorerLink copyLabel="Copy contract" verified />
          <CopyButton value={demoAddress} label="Copy custom text" showLabel />
          <Deadline deadline={Math.floor(Date.now() / 1000) + 86400 * 3} label="Closes in" />
        </div>
      </section>

      {/* Table */}
      <section className="gallery-section">
        <h2>Table</h2>
        <Table columns={tableColumns} data={tableData} keyField="role" />
      </section>

      {/* Async States */}
      <section className="gallery-section">
        <h2>Async & Feedback States</h2>
        <div className="gallery-grid">
          <Skeleton variant="card" label="Loading card" />
          <EmptyState title="No Applications Found" message="There are currently no submissions for this round." />
          <ErrorPanel title="Submission Failed" message="The transaction simulation was rejected by the network." />
        </div>
      </section>

      {/* Modal Dialog */}
      <section className="gallery-section">
        <h2>Modal Dialog</h2>
        <Button variant="secondary" onClick={() => setModalOpen(true)}>
          Open Demo Modal
        </Button>
        {modalOpen && (
          <Modal title="Confirm Action" onClose={() => setModalOpen(false)}>
            <p className="text-muted">
              This is a demonstration modal rendered using the standard Milepost Modal component.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            </div>
          </Modal>
        )}
      </section>
    </div>
  );
}
