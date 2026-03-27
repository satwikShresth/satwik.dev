import { MarkerType } from '@xyflow/react';
import { makeLabel } from './makeLabel';
import type { EdgeConfig, NodeConfig } from './types';

export const nodes: Array<NodeConfig> = [
  {
    id: 'react',
    type: 'info',
    data: {
      name: 'react',
      label: makeLabel('react', 'React Frontend'),
      info: 'Material UI · React Hook Form · Tesseract.js · Zustand',
      style: {
        padding: 12,
        border: '2px solid #3B5BDB',
        borderRadius: 8,
        minWidth: 160,
        zIndex: 10
      },
      Card: {
        Header: 'Rich Client',
        Body: 'Component‑driven UI with Material UI, form state via React Hook Form, OCR powered by Tesseract.js and app state in Zustand.',
        Footer: 'Fast & interactive'
      }
    },
    position: { x: 0, y: 0 }
  },
  {
    id: 'group-docker',
    type: 'labeledGroup',
    style: {
      border: '1px dashed #555',
      borderRadius: 10
    },
    height: 420,
    data: {
      label: makeLabel('docker', 'Docker Network'),
      Card: {
        Header: 'Isolated Services',
        Body: 'Everything runs in a single Docker network for consistency across dev, staging, and production.',
        Footer: 'Reproducible infra'
      }
    }
  },
  {
    id: 'caddy',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel('server', 'Caddy (Reverse Proxy)'),
      info: 'TLS termination & routing',
      style: {
        padding: 12,
        border: '2px solid #34A853',
        borderRadius: 8,
        minWidth: 160,
        zIndex: 10
      },
      Card: {
        Header: 'Auto‑HTTPS',
        Body: 'Auto‑provisions TLS certs and forwards requests to your Hono backend.',
        Footer: 'Secure by default'
      }
    },
    position: { x: 200, y: 100 }
  },
  {
    id: 'backend',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel('server', 'Hono + Drizzle'),
      info: 'Stateless API · SendGrid',
      style: {
        padding: 12,
        border: '2px solid #EA4335',
        borderRadius: 8,
        minWidth: 150,
        zIndex: 10
      },
      Card: {
        Header: 'API Layer',
        Body: 'Hono REST API with Drizzle ORM (no user data stored) and SendGrid for transactional emails.',
        Footer: 'Lightweight & reliable'
      }
    },
    position: { x: 200, y: 0 }
  },
  {
    id: 'postgres',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel('database', 'PostgreSQL'),
      info: 'Relational DB',
      style: {
        padding: 10,
        border: '2px solid #FBBC05',
        borderRadius: 8,
        minWidth: 120,
        zIndex: 10
      },
      Card: {
        Header: 'ACID Store',
        Body: 'Holds only system metadata; user data is not persisted here.',
        Footer: 'Transactional safety'
      }
    },
    position: { x: 400, y: 0 }
  },
  {
    id: 'meilisearch',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel('search', 'MeiliSearch'),
      info: 'Real‑time text indexing',
      style: {
        padding: 12,
        border: '2px solid #9C27B0',
        borderRadius: 8,
        minWidth: 150,
        zIndex: 10
      },
      Card: {
        Header: 'Instant Search',
        Body: 'Indexes all content for real‑time full‑text search with filters.',
        Footer: 'Fast & typo‑tolerant'
      }
    },
    position: { x: 400, y: 100 }
  }
];

export const edges: Array<EdgeConfig> = [
  {
    id: 'e-react-caddy',
    source: 'react',
    target: 'caddy',
    label: 'HTTPS & search',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-caddy-backend',
    source: 'caddy',
    target: 'backend',
    label: 'forwards API',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-backend-postgres',
    source: 'backend',
    target: 'postgres',
    label: 'reads/writes',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-backend-meilisearch',
    source: 'backend',
    target: 'meilisearch',
    label: 'push indexing',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-caddy-meilisearch',
    source: 'caddy',
    target: 'meilisearch',
    label: 'forwards search',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];
