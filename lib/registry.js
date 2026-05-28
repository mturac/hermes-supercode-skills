export const SKILLS = {
  'api-sculptor': {
    name: 'api-sculptor',
    description: 'Design and generate production REST/GraphQL APIs with validation, docs, and tests.',
    triggers: [
      'scaffold a REST API for user management',
      'generate OpenAPI spec from my routes',
      'add pagination and filtering to my endpoints'
    ]
  },
  'auth-architect': {
    name: 'auth-architect',
    description: 'Implement authentication flows: JWT, OAuth2, RBAC, session management.',
    triggers: [
      'add JWT refresh token rotation',
      'implement OAuth2 with GitHub provider',
      'set up role-based access control'
    ]
  },
  'db-whisperer': {
    name: 'db-whisperer',
    description: 'Optimize queries, write migrations, and design schemas for SQL/NoSQL databases.',
    triggers: [
      'optimize this slow PostgreSQL query',
      'write a migration to add soft deletes',
      'design schema for a multi-tenant SaaS'
    ]
  },
  'deploy-ninja': {
    name: 'deploy-ninja',
    description: 'Automate deployments with Docker, Kubernetes, and CI/CD pipeline configs.',
    triggers: [
      'write a Dockerfile for my Node.js app',
      'create a Kubernetes deployment manifest',
      'set up GitHub Actions for staging deploy'
    ]
  },
  'ghost-scraper': {
    name: 'ghost-scraper',
    description: 'Build resilient web scrapers with anti-detection, retries, and data extraction.',
    triggers: [
      'scrape product prices with rotation',
      'extract structured data from HTML tables',
      'bypass rate limits with exponential backoff'
    ]
  },
  'infra-automation': {
    name: 'infra-automation',
    description: 'Provision cloud infrastructure with Terraform, Pulumi, or CloudFormation.',
    triggers: [
      'write Terraform for an ECS cluster',
      'automate S3 bucket with lifecycle policies',
      'create VPC with public and private subnets'
    ]
  },
  'mcp-conductor': {
    name: 'mcp-conductor',
    description: 'Build and configure Model Context Protocol servers and tool integrations.',
    triggers: [
      'create an MCP server for my database',
      'add a custom tool to Claude Code',
      'configure MCP with filesystem access'
    ]
  },
  'obs-guardian': {
    name: 'obs-guardian',
    description: 'Add observability: structured logging, metrics, tracing, and alerting.',
    triggers: [
      'add OpenTelemetry tracing to my API',
      'set up Prometheus metrics endpoint',
      'create structured JSON logging with correlation IDs'
    ]
  },
  'pipeline-architect': {
    name: 'pipeline-architect',
    description: 'Design data pipelines, ETL workflows, and event-driven architectures.',
    triggers: [
      'build an ETL pipeline for Postgres to BigQuery',
      'design an event-driven order processing flow',
      'implement a fan-out message queue pattern'
    ]
  },
  'prediction-alpha': {
    name: 'prediction-alpha',
    description: 'Integrate ML models, feature engineering, and prediction APIs into apps.',
    triggers: [
      'add a recommendation engine to my app',
      'integrate OpenAI embeddings for search',
      'build a churn prediction feature pipeline'
    ]
  },
  'prompt-forge': {
    name: 'prompt-forge',
    description: 'Engineer, test, and optimize LLM prompts for production reliability.',
    triggers: [
      'audit this system prompt for jailbreaks',
      'improve my RAG prompt for accuracy',
      'write a structured output prompt with JSON schema'
    ]
  },
  'quantum-debugger': {
    name: 'quantum-debugger',
    description: 'Deep debug complex issues: memory leaks, race conditions, async bugs.',
    triggers: [
      'find the memory leak in my Node.js server',
      'debug a race condition in my async queue',
      'trace why this request hangs intermittently'
    ]
  },
  'security-sentinel': {
    name: 'security-sentinel',
    description: 'Audit code for vulnerabilities: OWASP Top 10, injection, secrets, CVEs.',
    triggers: [
      'audit my auth middleware for SQLi',
      'scan for hardcoded secrets in this repo',
      'check this dependency tree for CVEs'
    ]
  }
};

export const SKILL_NAMES = Object.keys(SKILLS);
