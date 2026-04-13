# 01.2: Amazon Managed Service for Prometheus & Grafana

Trong SOA-C03, AWS đã mở rộng phạm vi **Observability** với hai dịch vụ managed mới: **Amazon Managed Service for Prometheus** và **Amazon Managed Grafana**.

## 1. Amazon Managed Service for Prometheus (AMP)

**Amazon Managed Service for Prometheus** là dịch vụ giám sát container-native, tương thích với Prometheus open-source.

### Đặc điểm chính (Key Features):
- **Fully managed**: AWS quản lý hạ tầng, scaling, security
- **PromQL compatible**: Sử dụng ngôn ngữ query Prometheus quen thuộc
- **High availability**: Dữ liệu được replicate across multiple AZs
- **Tích hợp ECS/EKS**: Dễ dàng thu thập metrics từ containers

### Khi nào sử dụng (Use Cases):
- Giám sát **Kubernetes workloads** trên EKS
- Thay thế self-managed Prometheus để giảm operational overhead
- **Multi-cluster monitoring**: Thu thập metrics từ nhiều clusters

### Technical English Keywords:
- **Scraping**: Quá trình thu thập metrics từ endpoints
- **Remote Write**: Ghi dữ liệu metrics từ remote sources
- **Workspace**: Logical container cho Prometheus resources

---

## 2. Amazon Managed Grafana (AMG)

**Amazon Managed Grafana** là dịch vụ visualization fully managed, tương thích với Grafana open-source.

### Đặc điểm chính (Key Features):
- **Pre-built dashboards**: Sẵn có dashboards cho AWS services
- **SSO integration**: Tích hợp với IAM Identity Center
- **Multiple data sources**: Kết nối CloudWatch, Prometheus, X-Ray, etc.
- **Alert management**: Cấu hình alerts trực tiếp từ dashboards

### Khi nào sử dụng (Use Cases):
- **Unified visualization**: Dashboard tập trung cho toàn bộ infrastructure
- **Team collaboration**: Chia sẻ dashboards với access control
- **Operational insights**: Combine metrics từ nhiều sources

### Technical English Keywords:
- **Data Source**: Nguồn dữ liệu được kết nối (CloudWatch, Prometheus, etc.)
- **Panel**: Widget hiển thị data trong dashboard
- **Annotation**: Markers trên graphs để highlight events

---

## 3. So sánh với CloudWatch (Comparison)

| Feature            | CloudWatch          | AMP + AMG                      |
| ------------------ | ------------------- | ------------------------------ |
| **Best for**       | AWS-native services | Container/Kubernetes workloads |
| **Query language** | CloudWatch Insights | PromQL                         |
| **Open source**    | No                  | Yes (compatible)               |
| **Multi-cloud**    | AWS only            | Any Prometheus source          |

---

## 4. Study Guide Question

**Question**: A company is running containerized applications on Amazon EKS and wants to implement a monitoring solution that is compatible with their existing Prometheus-based tooling. They also need a managed visualization solution. Which combination of AWS services should they use?

A. Amazon CloudWatch Container Insights and Amazon QuickSight
B. Amazon Managed Service for Prometheus and Amazon Managed Grafana
C. AWS X-Ray and Amazon CloudWatch Dashboards
D. Amazon CloudWatch Logs and Amazon OpenSearch Service

*(Hãy chọn đáp án bạn cho là đúng!)*
