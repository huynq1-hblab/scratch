# 04.1: AWS IAM Identity Center

**AWS IAM Identity Center** (trước đây là AWS Single Sign-On/SSO) là dịch vụ quản lý truy cập tập trung cho **multi-account environments**. Đây là một trong những topics mới quan trọng trong SOA-C03.

## 1. IAM Identity Center là gì?

**IAM Identity Center** cung cấp:
- **Single sign-on** cho tất cả AWS accounts trong Organization
- **Centralized access management** cho AWS applications
- **Integration** với external identity providers (IdPs)

### So sánh với IAM truyền thống:

| Aspect              | IAM Users               | IAM Identity Center |
| ------------------- | ----------------------- | ------------------- |
| **Scope**           | Per-account             | Organization-wide   |
| **Login**           | Per-account console     | Single portal       |
| **Credentials**     | Long-term (access keys) | Temporary (session) |
| **IdP Integration** | Via federation          | Native support      |

---

## 2. Kiến trúc (Architecture)

```
┌─────────────────────────────────────────────────────────────┐
│                    AWS Organizations                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              IAM Identity Center                      │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │   │
│  │  │   Users     │  │   Groups    │  │ Permission  │   │   │
│  │  │             │  │             │  │    Sets     │   │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘   │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│         ┌────────────────────┼────────────────────┐         │
│         ▼                    ▼                    ▼         │
│  ┌────────────┐       ┌────────────┐       ┌────────────┐   │
│  │ Account A  │       │ Account B  │       │ Account C  │   │
│  │ (Dev)      │       │ (Staging)  │       │ (Prod)     │   │
│  └────────────┘       └────────────┘       └────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Key Components

### Identity Sources:
| Source                        | Mô tả                                     |
| ----------------------------- | ----------------------------------------- |
| **Identity Center directory** | Built-in directory của AWS                |
| **Active Directory**          | AWS Managed AD hoặc self-managed AD       |
| **External IdP**              | Okta, Azure AD, OneLogin, etc. (SAML 2.0) |

### Permission Sets:
- **Định nghĩa**: Tập hợp các policies xác định user có thể làm gì
- **Assignment**: Gán Permission Set cho User/Group + Account
- **Types**: AWS managed policies hoặc custom policies

### Ví dụ Permission Set:
```json
{
  "Name": "DatabaseAdmin",
  "Description": "Full access to RDS and DynamoDB",
  "ManagedPolicies": [
    "arn:aws:iam::aws:policy/AmazonRDSFullAccess",
    "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  ],
  "SessionDuration": "PT4H"
}
```

### Technical English Keywords:
- **Permission Set**: Template cho IAM permissions
- **Account Assignment**: Liên kết User/Group với Account + Permission Set
- **Session Duration**: Thời gian session credentials hợp lệ

---

## 4. Access Portal

**AWS Access Portal** là single entry point cho users:
- URL format: `https://[your-domain].awsapps.com/start`
- Users thấy tất cả accounts họ có access
- Có thể get CLI credentials (temporary)

### CLI Access:
```bash
# Configure AWS CLI với Identity Center
aws configure sso

# Login
aws sso login --profile my-profile

# Use profile
aws s3 ls --profile my-profile
```

---

## 5. Multi-Account Strategy

### Recommended Pattern:
1. **Management Account**: Chỉ chứa Organizations và billing
2. **Security Account**: Audit logs, security tools
3. **Workload Accounts**: Dev, Staging, Prod (separated)

### Permission Set Strategy:
| Role      | Dev Account | Prod Account  |
| --------- | ----------- | ------------- |
| Developer | Admin       | ReadOnly      |
| DevOps    | Admin       | PowerUser     |
| Security  | ReadOnly    | SecurityAudit |

---

## 6. Study Guide Question

**Question**: A company has 50 AWS accounts managed by AWS Organizations. They want to implement centralized access management where developers can access development accounts with full permissions but only read-only access to production accounts. Users should authenticate once to access all accounts. Which solution meets these requirements?

A. Create IAM users in each account with the appropriate permissions
B. Use AWS IAM Identity Center with permission sets assigned per account
C. Set up SAML federation with each individual AWS account
D. Use AWS Resource Access Manager to share resources across accounts

*(Hãy chọn đáp án bạn cho là đúng!)*
