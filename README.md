# 📚 Bookshop — SAP CAP + HANA Cloud + XSUAA

A full-stack cloud-ready Bookshop application built with **SAP Cloud Application Programming 
Model (CAP)**, deployed on **SAP Business Technology Platform (BTP)** using **HANA Cloud** 
as the database, **XSUAA** for role-based security, and an **AppRouter** for authentication flow.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | SAP CAP (Node.js) |
| Database | SAP HANA Cloud (HDI Container) |
| Authentication | XSUAA (OAuth2 / JWT) |
| API Protocol | OData V4 |
| Frontend Hosting | HTML5 App Repository |
| Routing | SAP AppRouter |
| Deployment | SAP BTP – Cloud Foundry (MTA) |

---

## 📐 Data Model

Built using **CDS (Core Data Services)** with `cuid` and `managed` mixins for 
auto-generated IDs and audit fields (`createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`).
```
Authors
  └── Books (Association to many)
```

### Entities

#### `Authors`
- `name` — Author's full name
- `books` — Association to many `Books`

#### `Books`
- `title` — Book title
- `genre` — Genre (Fiction, Sci-Fi, etc.)
- `stock` — Available inventory count
- `price` — Decimal price field
- `author` — Association back to `Authors`

---

## 🔐 Security — XSUAA

Authentication and authorization handled via **XSUAA** with two roles:

| Role | Scope | Access |
|---|---|---|
| `Viewer` | `$XSAPPNAME.Viewer` | Read-only access |
| `Admin` | `$XSAPPNAME.Admin` | Full CRUD access |

Role collections (`CAP Viewer Piyush`, `CAP Admin Piyush`) are defined in 
`xs-security.json` and assigned to BTP users via the BTP cockpit.

---

## 🌐 OData V4 API

| Operation | Endpoint |
|---|---|
| List all Books | `GET /odata/v4/bookshop/Books` |
| Get Book with Author | `GET /odata/v4/bookshop/Books?$expand=author` |
| Create Book | `POST /odata/v4/bookshop/Books` |
| Update Book | `PATCH /odata/v4/bookshop/Books(guid'...')` |
| Delete Book | `DELETE /odata/v4/bookshop/Books(guid'...')` |
| List Authors | `GET /odata/v4/bookshop/Authors` |

---

## 🏗️ BTP Architecture
```
Browser
  └── AppRouter (MyHANAApp)         ← Handles auth redirect, token forwarding
        └── CAP Service (srv)       ← OData V4 API, business logic
              └── HANA Cloud (db)   ← HDI Container, persistent storage
  
XSUAA ←──────────────────────────── OAuth2 token validation at every layer
HTML5 App Repo ───────────────────── Hosts static frontend assets
```

---

## 📁 Project Structure
```
sap-cap-bookshop-hana/
├── app/
│   └── router/             # AppRouter config (xs-app.json)
├── db/
│   ├── data/               # CSV seed data (optional)
│   └── schema.cds          # CDS entity definitions
├── srv/
│   ├── service.cds   # Service exposure & restrictions
│   └── service.js    # Custom handlers (if any)
├── xs-security.json        # XSUAA scopes, roles, role-collections
├── mta.yaml                # BTP Multi-Target Application config
├── package.json
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js >= 18
- `@sap/cds-dk` installed globally → `npm install -g @sap/cds-dk`

### Run Locally
```bash
git clone https://github.com/Piyush2276/sap-cap-bookshop-hana
cd sap-cap-bookshop-hana
npm install
cds deploy --to sqlite     # local SQLite for development
cds run                    # starts at http://localhost:4004
```

> 💡 XSUAA is bypassed locally. Full auth is enforced only on BTP.

---

## ☁️ BTP Deployment (MTA)
```bash
# Login to Cloud Foundry
cf login -a https://api.cf.<region>.hana.ondemand.com

# Build MTA archive
mbt build

# Deploy to BTP
cf deploy mta_archives/MyHANAApp_1.0.0.mtar
```

### BTP Services Provisioned by mta.yaml

| Service | Plan | Purpose |
|---|---|---|
| `xsuaa` | `application` | Auth & authorization |
| `hana` | `hdi-shared` | HANA Cloud DB container |
| `html5-apps-repo` | `app-host` | Static frontend hosting |

---

## 📝 Key Concepts Demonstrated

- ✅ CDS entity modeling with `cuid` and `managed` mixins
- ✅ One-to-many association (Author → Books)
- ✅ OData V4 CRUD with expand support
- ✅ XSUAA role-based access control (Viewer / Admin)
- ✅ AppRouter integration with JWT token forwarding
- ✅ MTA multi-module deployment (srv + db-deployer + approuter + html5)
- ✅ HANA HDI container as production database
- ✅ HTML5 App Repository for static asset hosting

---

## 👤 Author

**Piyush Kumar**  
SAP BTP Backend Developer  
📧 piyush2582002@gmail.com  
🔗 [LinkedIn](https://linkedin.com/in/piyush-kumar-267367229) | 
[GitHub](https://github.com/Piyush2276)
