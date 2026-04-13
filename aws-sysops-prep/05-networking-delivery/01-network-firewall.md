# 05.1: AWS Network Firewall

**AWS Network Firewall** là dịch vụ firewall managed của AWS, được thêm vào phạm vi SOA-C03 để bảo vệ VPC workloads.

## 1. AWS Network Firewall là gì?

**AWS Network Firewall** là stateful, managed network firewall cung cấp:
- **Intrusion Prevention System (IPS)**
- **Deep packet inspection**
- **URL filtering**
- **Stateful traffic inspection**

### So sánh với Security Groups & NACLs:

| Feature              | Security Groups | NACLs  | Network Firewall |
| -------------------- | --------------- | ------ | ---------------- |
| **Level**            | Instance        | Subnet | VPC              |
| **Stateful**         | Yes             | No     | Yes              |
| **Deep Inspection**  | No              | No     | Yes              |
| **Domain Filtering** | No              | No     | Yes              |
| **IPS/IDS**          | No              | No     | Yes              |
| **Cost**             | Free            | Free   | Paid             |

---

## 2. Kiến trúc (Architecture)

```
                           Internet
                               │
                               ▼
                    ┌──────────────────┐
                    │  Internet Gateway │
                    └──────────────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │     Firewall Subnet            │
              │  ┌──────────────────────────┐  │
              │  │   Network Firewall       │  │
              │  │   Endpoint               │  │
              │  └──────────────────────────┘  │
              └────────────────────────────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │     Application Subnets        │
              │  ┌──────────┐  ┌──────────┐   │
              │  │  EC2     │  │  EC2     │   │
              │  │  Web     │  │  App     │   │
              │  └──────────┘  └──────────┘   │
              └────────────────────────────────┘
```

### Key Components:
- **Firewall**: Logical container cho rules và config
- **Firewall Policy**: Tập hợp rule groups
- **Firewall Endpoint**: ENI trong firewall subnet
- **Rule Group**: Tập hợp rules (stateless hoặc stateful)

---

## 3. Rule Types

### Stateless Rules:
- Xử lý **mỗi packet độc lập**
- Nhanh hơn nhưng ít flexible
- Actions: Pass, Drop, Forward to stateful

### Stateful Rules:
- Track **connection state**
- Flexible hơn, aware of traffic direction
- Rule engines:

| Engine          | Mô tả                          | Use Case                  |
| --------------- | ------------------------------ | ------------------------- |
| **Standard**    | Simple 5-tuple rules           | Basic filtering           |
| **Domain List** | Filter by domain names         | Block/allow websites      |
| **Suricata**    | IPS rules (open-source format) | Advanced threat detection |

### Ví dụ Domain List Rule:
```
# Block social media
.facebook.com
.twitter.com
.instagram.com
```

### Ví dụ Suricata Rule:
```
# Block SQL injection attempts
alert http any any -> any any (msg:"SQL Injection"; content:"SELECT"; nocase; sid:1000001;)
```

---

## 4. Deployment Patterns

### Centralized Model:
- Network Firewall trong **Inspection VPC**
- Transit Gateway routes traffic through firewall
- Best for: nhiều VPCs, centralized security team

### Distributed Model:
- Network Firewall trong **mỗi VPC**
- Best for: isolated workloads, different security requirements

### Technical English Keywords:
- **Inspection**: Quá trình analyze traffic
- **Firewall Endpoint**: Network interface point cho firewall
- **Rule Capacity**: Số lượng rules có thể chứa (measured in capacity units)

---

## 5. Logging & Monitoring

### Log Destinations:
- **S3**: Long-term storage, analysis
- **CloudWatch Logs**: Real-time monitoring, alarms
- **Kinesis Data Firehose**: Streaming to SIEM

### Log Types:
| Type      | Mô tả                                      |
| --------- | ------------------------------------------ |
| **Alert** | Traffic matched a rule configured to alert |
| **Flow**  | All traffic flow metadata                  |

---

## 6. Study Guide Question

**Question**: A company needs to protect their VPC from known malicious domains and implement intrusion prevention. They want to use managed Suricata-compatible rules. Which AWS service should they use?

A. AWS WAF with managed rule groups
B. Security Groups with deny rules
C. AWS Network Firewall with Suricata rule groups
D. Network ACLs with explicit deny entries

*(Hãy chọn đáp án bạn cho là đúng!)*
