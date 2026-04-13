# 02.1: Container Reliability với ECS & EKS

Trong SOA-C03, **Containers** là một trong những topic mới quan trọng nhất. Bài này sẽ giới thiệu về Amazon ECS và EKS từ góc độ **reliability** và **operations**.

## 1. Tổng quan về Container Services

| Service         | Mô tả                             | Khi nào dùng                |
| --------------- | --------------------------------- | --------------------------- |
| **Amazon ECS**  | Container orchestration của AWS   | Đơn giản, tích hợp AWS tốt  |
| **Amazon EKS**  | Managed Kubernetes                | Cần Kubernetes, multi-cloud |
| **AWS Fargate** | Serverless compute cho containers | Không muốn quản lý EC2      |

---

## 2. Amazon ECS (Elastic Container Service)

### Launch Types:
- **EC2 Launch Type**: Bạn quản lý EC2 instances
- **Fargate Launch Type**: AWS quản lý infrastructure

### Key Components:
- **Cluster**: Logical grouping của tasks/services
- **Task Definition**: Blueprint cho container (như Dockerfile + runtime config)
- **Service**: Đảm bảo desired number của tasks luôn chạy
- **Task**: Running instance của Task Definition

### Reliability Features:
```
┌─────────────────────────────────────────┐
│           ECS Service                    │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│  │ Task 1  │ │ Task 2  │ │ Task 3  │   │
│  └─────────┘ └─────────┘ └─────────┘   │
│         ↓           ↓           ↓        │
│  ┌──────────────────────────────────┐   │
│  │    Application Load Balancer     │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

- **Service Auto Scaling**: Tự động scale tasks dựa trên metrics
- **Health Checks**: ALB kiểm tra health và replace unhealthy tasks
- **Multi-AZ**: Distribute tasks across AZs

### Technical English Keywords:
- **Desired Count**: Số lượng tasks mong muốn
- **Running Count**: Số tasks đang thực sự chạy
- **Draining**: Quá trình gracefully remove container từ load balancer

---

## 3. Amazon EKS (Elastic Kubernetes Service)

### Kiến trúc EKS:
- **Control Plane**: AWS managed (API server, etcd, etc.)
- **Data Plane**: Bạn quản lý (EC2 nodes) hoặc Fargate

### Node Types:
| Type                    | Quản lý bởi | Use case                          |
| ----------------------- | ----------- | --------------------------------- |
| **Managed Node Groups** | AWS         | Recommended cho hầu hết workloads |
| **Self-managed Nodes**  | Bạn         | Custom AMIs, special requirements |
| **Fargate**             | AWS         | Serverless, per-pod billing       |

### Reliability Features:
- **Pod Disruption Budgets (PDB)**: Đảm bảo minimum availability during updates
- **Horizontal Pod Autoscaler (HPA)**: Scale pods based on metrics
- **Cluster Autoscaler**: Scale nodes based on pending pods

### Technical English Keywords:
- **Pod**: Smallest deployable unit trong Kubernetes
- **Node**: EC2 instance chạy pods
- **Namespace**: Logical isolation within cluster
- **Replica**: Copy của một pod

---

## 4. Fargate Considerations

### Ưu điểm (Advantages):
- Không cần quản lý EC2 instances
- Pay per vCPU/memory used
- Built-in security isolation

### Nhược điểm (Limitations):
- Không có access vào underlying host
- Một số features không available (như daemonsets trong EKS)
- Có thể đắt hơn EC2 với sustained workloads

---

## 5. Study Guide Question

**Question**: A company runs a containerized application on Amazon ECS with the Fargate launch type. The application needs to scale automatically based on the number of messages in an Amazon SQS queue. What should the solutions architect do?

A. Create a CloudWatch alarm based on the ApproximateNumberOfMessages metric and configure an ECS Service Auto Scaling policy.
B. Use AWS Lambda to poll the SQS queue and manually update the desired count of the ECS service.
C. Enable EC2 Auto Scaling for the ECS cluster.
D. Configure the SQS queue to trigger an Amazon EventBridge rule.

*(Hãy chọn đáp án bạn cho là đúng!)*
