# Example: Cross-Skill Orchestration

## Scenario

"Deploy my e-commerce app to production, make sure it's secure, and set up
monitoring — the full pipeline."

## How MCP Conductor Decomposes This

```yaml
Task Analysis:
  complexity: HIGH
  subtasks: 5
  parallel_groups: 2

Decomposition:
  group_1 (parallel — no dependencies):
    - security_audit:
        approach: security-sentinel patterns
        scope: pre-deploy vulnerability check
    - dns_ssl_check:
        approach: infra-automation patterns
        scope: verify domain + SSL configuration

  group_2 (sequential — depends on group_1 passing):
    - deploy:
        approach: deploy-ninja patterns
        strategy: canary (5% → 25% → 50% → 100%)
    - post_deploy_security:
        approach: security-sentinel patterns
        scope: verify no new exposures after deploy
    - monitoring_setup:
        approach: infra-automation patterns
        scope: health check endpoints, alerting rules
```

## Execution Flow

### Step 1: Pre-deploy checks (parallel)

**security-sentinel** runs a non-intrusive scan:
- SSL/TLS grade check
- Security headers audit
- Known vulnerability scan
- SPF/DKIM/DMARC verification

**infra-automation** verifies infrastructure:
- DNS records correct
- SSL certificate valid and not expiring soon
- CDN configuration healthy

Both run simultaneously. If either finds a critical issue, the deployment
is blocked until the issue is resolved.

### Step 2: Deployment (sequential)

**deploy-ninja** executes a canary release:
- Deploy new version to 5% of traffic
- Monitor for 5 minutes (error rate, latency, throughput)
- Promote to 25%, then 50%, then 100%
- Automatic rollback if error rate doubles

### Step 3: Post-deploy verification (sequential)

**security-sentinel** runs a post-deploy check:
- Verify the new version doesn't expose new endpoints
- Check that security headers are still present
- Confirm no regression in SSL grade

**infra-automation** sets up monitoring:
- Health check endpoint verification
- Alerting rules for downtime
- DNS monitoring for unexpected changes

## Result

```json
{
  "task": "Full production deployment with security and monitoring",
  "status": "success",
  "subtasks_completed": 5,
  "subtasks_failed": 0,
  "duration_minutes": 28,
  "security_grade": "A",
  "deployment_strategy": "canary",
  "monitoring_active": true
}
```
