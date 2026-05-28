# ⚡ Hermes SuperCode Skills

**13 production-grade skills for Claude Code · Zero config · MIT License**

[English](#english) · [中文](#中文) · [Türkçe](#türkçe)

---

## English

### What is this?

Hermes is a collection of 13 specialized skills that extend Claude Code with deep expertise in infrastructure, security, data pipelines, deployment, debugging, API design, database operations, authentication, observability, and more.

Each skill follows the same discipline: **Recon → Plan → Execute → Verify**, structured JSON output, tiered safety rails (🔴 Red / 🟡 Yellow / 🟢 Green), and rollback capability where applicable.

### Skills

| # | Skill | What it does | Trigger examples |
|---|-------|-------------|-----------------|
| 1 | **infra-automation** | DNS, SSL, Cloudflare Workers, CDN config | "Add an A record for api.example.com" |
| 2 | **prediction-alpha** | Prediction market analysis, odds, arbitrage detection | "Analyze this Polymarket market" |
| 3 | **ghost-scraper** | Ethical web scraping with anti-detection awareness | "Scrape product data from this URL" |
| 4 | **mcp-conductor** | Multi-agent task decomposition and orchestration | "Coordinate 5 agents on this research task" |
| 5 | **pipeline-architect** | ETL/ELT pipelines, streaming, data warehouse design | "Build a Kafka-to-ClickHouse pipeline" |
| 6 | **security-sentinel** | Security audits, vulnerability scanning, SSL hardening | "Audit example.com security posture" |
| 7 | **deploy-ninja** | Zero-downtime deployments, canary, blue-green, rollback | "Deploy v2.3.4 with canary strategy" |
| 8 | **quantum-debugger** | Race conditions, memory leaks, performance profiling | "Production service intermittently segfaults" |
| 9 | **api-sculptor** | REST/GraphQL/gRPC design, OpenAPI specs | "Design an Order API for e-commerce" |
| 10 | **prompt-forge** | System prompt engineering, few-shot design, evaluation | "Write a system prompt for a support agent" |
| 11 | **db-whisperer** | Query optimization, indexing, schema migrations (app-layer DB) | "This Postgres query is timing out" |
| 12 | **auth-architect** | OAuth2/OIDC, JWT, RBAC, SSO, MFA design | "Implement OAuth2 with refresh token rotation" |
| 13 | **obs-guardian** | OpenTelemetry, structured logging, Prometheus/Grafana, SLOs | "Add distributed tracing to my microservices" |

### Installation

```bash
git clone https://github.com/mturac/hermes-supercode-skills.git
cd hermes-supercode-skills

# Symlink all skills into Claude Code skills directory
for skill in skills/*/; do
  ln -sf "$(pwd)/$skill" ~/.claude/skills/$(basename "$skill")
done

# Verify
ls ~/.claude/skills/
```

### Demo

```
$ npx hermes-skills install
⚡ Hermes SuperCode Skills v1.0.0

Installing 13 skills to ~/.claude/skills/ ...

  ✅  api-sculptor      API design specialist (REST/GraphQL/gRPC)
  ✅  auth-architect    Auth & identity systems (OAuth2/JWT/SSO)
  ✅  db-whisperer      Database optimization & migrations
  ✅  deploy-ninja      Zero-downtime deployments & rollback
  ✅  ghost-scraper     Ethical web scraping
  ✅  infra-automation  DNS, SSL, Cloudflare, CDN
  ✅  mcp-conductor     Multi-agent orchestration
  ✅  obs-guardian      OpenTelemetry, Prometheus, SLOs
  ✅  pipeline-architect ETL/ELT pipelines & streaming
  ✅  prediction-alpha  Prediction market analysis
  ✅  prompt-forge      LLM prompt engineering
  ✅  quantum-debugger  Race conditions & memory leaks
  ✅  security-sentinel Security audits & vuln scanning

13/13 installed in 0.8s
```

```
$ npx hermes-skills add db-whisperer --local
✅ db-whisperer installed to ./.claude/skills/db-whisperer/
```

```
$ npx hermes-skills list
Skill              Status     Target
─────────────────────────────────────
api-sculptor       ✅ active  global
auth-architect     ✅ active  global
db-whisperer       ✅ active  local
deploy-ninja       ✅ active  global
...
```

### Design Principles

1. **Recon → Plan → Execute → Verify** — no skill jumps straight to action
2. **Structured JSON output** — every skill produces machine-parseable results
3. **Tiered safety rails** — 🔴 Red (never) / 🟡 Yellow (confirm first) / 🟢 Green (safe)
4. **Rollback capability** — destructive operations always have an undo path
5. **Progressive disclosure** — SKILL.md stays lean, heavy references live in `references/`

---

## 中文

### 这是什么？

Hermes 是一套包含 **13 个专业技能**的 Claude Code 扩展包，覆盖基础设施自动化、安全审计、数据管道、部署策略、深度调试、API 设计、数据库优化、身份认证、可观测性等核心领域。

每个技能遵循统一纪律：**侦察 → 规划 → 执行 → 验证**，输出结构化 JSON，并采用分级安全护栏（🔴 禁止 / 🟡 确认后执行 / 🟢 安全执行）。

### 技能列表

| # | 技能 | 功能 | 触发示例 |
|---|------|------|---------|
| 1 | **infra-automation** | DNS、SSL、Cloudflare Workers、CDN 配置 | "为 api.example.com 添加 A 记录" |
| 2 | **prediction-alpha** | 预测市场分析、赔率计算、套利检测 | "分析这个 Polymarket 市场" |
| 3 | **ghost-scraper** | 合规网页抓取，反反爬感知 | "从这个 URL 抓取产品数据" |
| 4 | **mcp-conductor** | 多智能体任务分解与编排 | "协调 5 个代理完成这个研究任务" |
| 5 | **pipeline-architect** | ETL/ELT 管道、流处理、数仓设计 | "构建 Kafka 到 ClickHouse 的管道" |
| 6 | **security-sentinel** | 安全审计、漏洞扫描、SSL 加固 | "审计 example.com 安全状况" |
| 7 | **deploy-ninja** | 零停机部署、金丝雀发布、蓝绿部署、回滚 | "使用金丝雀策略部署 v2.3.4" |
| 8 | **quantum-debugger** | 竞态条件、内存泄漏、性能剖析 | "生产服务间歇性崩溃" |
| 9 | **api-sculptor** | REST/GraphQL/gRPC 设计，OpenAPI 规范 | "为电商设计订单 API" |
| 10 | **prompt-forge** | 系统提示词工程、少样本设计、评估框架 | "为支持代理编写系统提示词" |
| 11 | **db-whisperer** | 查询优化、索引策略、数据库迁移（应用层） | "这个 Postgres 查询超时了" |
| 12 | **auth-architect** | OAuth2/OIDC、JWT、RBAC、SSO、MFA 设计 | "实现带刷新令牌轮换的 OAuth2" |
| 13 | **obs-guardian** | OpenTelemetry、结构化日志、Prometheus/Grafana、SLO | "为微服务添加分布式追踪" |

### 安装

```bash
git clone https://github.com/mturac/hermes-supercode-skills.git
cd hermes-supercode-skills

# 将所有技能软链接到 Claude Code 技能目录
for skill in skills/*/; do
  ln -sf "$(pwd)/$skill" ~/.claude/skills/$(basename "$skill")
done
```

### 演示

```
$ npx hermes-skills install
⚡ Hermes SuperCode Skills v1.0.0

Installing 13 skills to ~/.claude/skills/ ...

  ✅  api-sculptor      API design specialist (REST/GraphQL/gRPC)
  ✅  auth-architect    Auth & identity systems (OAuth2/JWT/SSO)
  ✅  db-whisperer      Database optimization & migrations
  ✅  deploy-ninja      Zero-downtime deployments & rollback
  ✅  ghost-scraper     Ethical web scraping
  ✅  infra-automation  DNS, SSL, Cloudflare, CDN
  ✅  mcp-conductor     Multi-agent orchestration
  ✅  obs-guardian      OpenTelemetry, Prometheus, SLOs
  ✅  pipeline-architect ETL/ELT pipelines & streaming
  ✅  prediction-alpha  Prediction market analysis
  ✅  prompt-forge      LLM prompt engineering
  ✅  quantum-debugger  Race conditions & memory leaks
  ✅  security-sentinel Security audits & vuln scanning

13/13 installed in 0.8s
```

```
$ npx hermes-skills add db-whisperer --local
✅ db-whisperer installed to ./.claude/skills/db-whisperer/
```

```
$ npx hermes-skills list
Skill              Status     Target
─────────────────────────────────────
api-sculptor       ✅ active  global
auth-architect     ✅ active  global
db-whisperer       ✅ active  local
deploy-ninja       ✅ active  global
...
```

### 设计原则

1. **侦察 → 规划 → 执行 → 验证** — 不跳过任何阶段直接行动
2. **结构化 JSON 输出** — 每个技能都产出机器可解析的结果
3. **分级安全护栏** — 🔴 禁止 / 🟡 确认后执行 / 🟢 安全执行
4. **回滚能力** — 破坏性操作始终有撤销路径
5. **渐进式披露** — SKILL.md 保持精简，重型参考资料放在 `references/` 目录

---

## Türkçe

### Bu nedir?

Hermes, Claude Code'u **13 uzmanlaşmış skill** ile genişleten, production-grade bir koleksiyondur. Altyapı otomasyonu, güvenlik denetimi, veri pipeline'ları, deployment stratejileri, derin hata ayıklama, API tasarımı, veritabanı optimizasyonu, kimlik doğrulama ve gözlemlenebilirlik gibi kritik alanlarda derin uzmanlık sağlar.

Her skill aynı disiplini izler: **Keşif → Planlama → Uygulama → Doğrulama**, yapılandırılmış JSON çıktısı ve katmanlı güvenlik rayları (🔴 Kırmızı / 🟡 Sarı / 🟢 Yeşil).

### Skill Listesi

| # | Skill | Ne yapar | Tetikleyici örnekler |
|---|-------|----------|---------------------|
| 1 | **infra-automation** | DNS, SSL, Cloudflare Workers, CDN yapılandırması | "api.example.com için A kaydı ekle" |
| 2 | **prediction-alpha** | Tahmin piyasası analizi, oran hesaplama, arbitraj tespiti | "Bu Polymarket piyasasını analiz et" |
| 3 | **ghost-scraper** | Etik web scraping, bot-tespiti farkındalığı | "Bu URL'den ürün verisi çek" |
| 4 | **mcp-conductor** | Çok ajanlı görev ayrıştırma ve orkestrasyon | "5 ajanı bu araştırma görevinde koordine et" |
| 5 | **pipeline-architect** | ETL/ELT pipeline'ları, streaming, veri ambarı tasarımı | "Kafka'dan ClickHouse'a pipeline kur" |
| 6 | **security-sentinel** | Güvenlik denetimi, zafiyet tarama, SSL sertleştirme | "example.com güvenlik durumunu denetle" |
| 7 | **deploy-ninja** | Sıfır-kesinti deployment, canary, blue-green, rollback | "v2.3.4'ü canary stratejisiyle deploy et" |
| 8 | **quantum-debugger** | Race condition, bellek sızıntısı, performans profilleme | "Production servis aralıklı çöküyor" |
| 9 | **api-sculptor** | REST/GraphQL/gRPC tasarımı, OpenAPI spec'leri | "E-ticaret için Sipariş API'si tasarla" |
| 10 | **prompt-forge** | Sistem prompt mühendisliği, few-shot tasarımı, değerlendirme | "Destek ajanı için sistem promptu yaz" |
| 11 | **db-whisperer** | Sorgu optimizasyonu, indeksleme, şema migrasyonları (uygulama katmanı) | "Bu Postgres sorgusu zaman aşımına uğruyor" |
| 12 | **auth-architect** | OAuth2/OIDC, JWT, RBAC, SSO, MFA tasarımı | "Refresh token rotasyonlu OAuth2 uygula" |
| 13 | **obs-guardian** | OpenTelemetry, yapılandırılmış loglama, Prometheus/Grafana, SLO'lar | "Mikroservislerime dağıtık izleme ekle" |

### Kurulum

```bash
git clone https://github.com/mturac/hermes-supercode-skills.git
cd hermes-supercode-skills

# Tüm skill'leri Claude Code skills dizinine sembolik bağla
for skill in skills/*/; do
  ln -sf "$(pwd)/$skill" ~/.claude/skills/$(basename "$skill")
done

# Doğrula
ls ~/.claude/skills/
```

### Demo

```
$ npx hermes-skills install
⚡ Hermes SuperCode Skills v1.0.0

Installing 13 skills to ~/.claude/skills/ ...

  ✅  api-sculptor      API design specialist (REST/GraphQL/gRPC)
  ✅  auth-architect    Auth & identity systems (OAuth2/JWT/SSO)
  ✅  db-whisperer      Database optimization & migrations
  ✅  deploy-ninja      Zero-downtime deployments & rollback
  ✅  ghost-scraper     Ethical web scraping
  ✅  infra-automation  DNS, SSL, Cloudflare, CDN
  ✅  mcp-conductor     Multi-agent orchestration
  ✅  obs-guardian      OpenTelemetry, Prometheus, SLOs
  ✅  pipeline-architect ETL/ELT pipelines & streaming
  ✅  prediction-alpha  Prediction market analysis
  ✅  prompt-forge      LLM prompt engineering
  ✅  quantum-debugger  Race conditions & memory leaks
  ✅  security-sentinel Security audits & vuln scanning

13/13 installed in 0.8s
```

```
$ npx hermes-skills add db-whisperer --local
✅ db-whisperer installed to ./.claude/skills/db-whisperer/
```

```
$ npx hermes-skills list
Skill              Status     Target
─────────────────────────────────────
api-sculptor       ✅ active  global
auth-architect     ✅ active  global
db-whisperer       ✅ active  local
deploy-ninja       ✅ active  global
...
```

### Tasarım İlkeleri

1. **Keşif → Planlama → Uygulama → Doğrulama** — hiçbir skill direkt aksiyona atlamaz
2. **Yapılandırılmış JSON çıktısı** — her skill makine tarafından ayrıştırılabilir sonuç üretir
3. **Katmanlı güvenlik rayları** — 🔴 Kırmızı (asla) / 🟡 Sarı (önce onayla) / 🟢 Yeşil (güvenli)
4. **Rollback yeteneği** — yıkıcı operasyonların her zaman geri alma yolu vardır
5. **Aşamalı açıklama** — SKILL.md yalın kalır, ağır referanslar `references/` klasörüne gider

---

## Repo Structure

```
hermes-supercode-skills/
├── README.md
├── LICENSE
├── skills/
│   ├── infra-automation/    ├── prediction-alpha/   ├── ghost-scraper/
│   ├── mcp-conductor/       ├── pipeline-architect/ ├── security-sentinel/
│   ├── deploy-ninja/        ├── quantum-debugger/   ├── api-sculptor/
│   ├── prompt-forge/        ├── db-whisperer/       ├── auth-architect/
│   └── obs-guardian/
│   (each has SKILL.md + optional references/)
├── examples/
├── tests/trigger-eval.json
├── docs/DESIGN_DECISIONS.md
└── CONTRIBUTING.md
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version:
1. Fork → create `skills/your-skill/SKILL.md` following the structure in `docs/DESIGN_DECISIONS.md`
2. Add trigger eval queries to `tests/trigger-eval.json`
3. Open a PR

## License

MIT — use it, fork it, extend it.
