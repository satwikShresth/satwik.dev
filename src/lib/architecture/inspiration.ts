import { MarkerType } from '@xyflow/react';
import { makeLabel } from './makeLabel';
import type { EdgeConfig, NodeConfig } from './types';

export const nodes: Array<NodeConfig> = [
  {
    id: 'react',
    type: 'info',
    data: {
      label: makeLabel('react', 'React Frontend'),
      info: 'Your React app served by Caddy',
      style: {
        padding: 12,
        border: '2px solid #3B5BDB',
        borderRadius: 8
      },
      Card: {
        Header: 'Single‑Page Application',
        Body: 'All UI routes handled client‑side. Every request hits its own path, served through Caddy for seamless navigation.',
        Footer: 'Path‑based routing via Caddy'
      }
    },
    position: { x: 0, y: 0 }
  },
  {
    id: 'group-docker',
    type: 'labeledGroup',
    parentId: 'react',
    height: 410,
    data: {
      label: makeLabel('docker', 'Docker Network'),
      Card: {
        Header: 'One‑Click Setup',
        Body: 'Encapsulates every service in an isolated network. Provides environment orchestration, security boundaries, and a reproducible dev/staging workflow.',
        Footer: 'Secure & replicable stack'
      }
    },
    style: {
      border: '1px dashed #555',
      borderRadius: 10
    },
    position: { x: 0, y: 0 }
  },
  {
    id: 'caddy',
    type: 'info',
    parentId: 'group-docker',
    extent: 'parent',
    data: {
      label: makeLabel('server', 'Caddy (Reverse Proxy)'),
      info: 'Handles TLS & routes to Hono',
      style: {
        padding: 12,
        border: '2px solid #34A853',
        borderRadius: 8,
        minWidth: 160,
        zIndex: 10
      },
      Card: {
        Header: 'Auto‑HTTPS',
        Body: 'Auto‑provisions TLS certificates and renews them. Routes incoming traffic to the appropriate backend.',
        Footer: 'Secure by default'
      }
    }
  },
  {
    id: 'ts',
    type: 'info',
    data: {
      label: makeLabel('server', 'TypeScript + Hono'),
      info: 'Your Hono‑based REST API',
      style: {
        padding: 10,
        border: '2px solid #EA4335',
        borderRadius: 8,
        minWidth: 140,
        zIndex: 10
      },
      Card: {
        Header: 'Robust API Layer',
        Body: 'Manages complex DB interactions, authorization flows, and work‑order queuing. Fully documented routes make it easy for the frontend to consume.',
        Footer: 'Client‑friendly endpoints'
      }
    },
    parentId: 'group-docker',
    extent: 'parent'
  },
  {
    id: 'redis',
    type: 'info',
    data: {
      label: makeLabel('database', 'Redis Queue'),
      info: 'Work queue for background jobs',
      style: {
        padding: 10,
        border: '2px solid #FBBC05',
        borderRadius: 8,
        minWidth: 120,
        zIndex: 10
      },
      Card: {
        Header: 'In‑Memory Speed',
        Body: 'Stores session data and job queues for lightning‑fast access. Ideal for transient state and rapid task dispatch.',
        Footer: 'Low‑latency data store'
      }
    },
    parentId: 'group-docker',
    extent: 'parent'
  },
  {
    id: 'postgres',
    type: 'info',
    data: {
      label: makeLabel('database', 'PostgreSQL'),
      info: 'Primary data store',
      style: {
        padding: 10,
        border: '2px solid #FBBC05',
        borderRadius: 8,
        minWidth: 120,
        zIndex: 10
      },
      Card: {
        Header: 'ACID‑Compliant Store',
        Body: 'Handles high‑concurrency workloads with robust transaction support. Scales horizontally with replicas and partitioning.',
        Footer: 'Reliable relational DB'
      }
    },
    parentId: 'group-docker',
    extent: 'parent'
  },
  {
    id: 'celery',
    type: 'info',
    data: {
      label: makeLabel('python', 'Celery Workers'),
      info: 'Python workers pulling from Redis',
      style: {
        padding: 10,
        border: '2px solid #34A853',
        borderRadius: 8,
        minWidth: 140,
        textAlign: 'center',
        zIndex: 10
      },
      Card: {
        Header: 'Python Orchestration',
        Body: 'Self‑manages Python workloads—including numpy and Rust‑accelerated tasks—for complex processing like plagiarism detection.',
        Footer: 'Cross‑language interoperability'
      }
    },
    parentId: 'group-docker',
    extent: 'parent'
  },
  {
    id: 's3',
    type: 'info',
    data: {
      label: makeLabel('cloud', 'Minio S3 Store'),
      info: 'Object storage for uploads',
      style: {
        padding: 12,
        border: '2px solid #5F6368',
        borderRadius: 8,
        minWidth: 150,
        zIndex: 10
      },
      Card: {
        Header: 'Object Storage',
        Body: 'Offloads file uploads/downloads from the backend. Generates signed URLs for secure, direct client access.',
        Footer: 'Scalable & durable'
      }
    },
    parentId: 'group-docker',
    extent: 'parent'
  }
];

export const edges: Array<EdgeConfig> = [
  {
    id: 'e-react-caddy',
    source: 'react',
    target: 'caddy',
    label: 'HTTPS',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-caddy-ts',
    source: 'caddy',
    target: 'ts',
    label: 'forwards API',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-ts-postgres',
    source: 'ts',
    target: 'postgres',
    label: 'reads/writes',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-ts-redis',
    source: 'ts',
    target: 'redis',
    label: 'push jobs',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-celery-redis',
    source: 'celery',
    target: 'redis',
    label: 'pull jobs',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-celery-postgres',
    source: 'celery',
    target: 'postgres',
    label: 'reads/writes',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-caddy-s3',
    source: 'caddy',
    target: 's3',
    label: 'upload/download via signed URL for Client',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e-ts-s3',
    source: 'ts',
    target: 's3',
    label: 'issues signed URL',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];
