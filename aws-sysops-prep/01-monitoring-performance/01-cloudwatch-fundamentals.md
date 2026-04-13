# 01.1: Amazon CloudWatch Fundamentals

Trong AWS, **Monitoring** (Giám sát) là bước đầu tiên để đảm bảo hệ thống hoạt động ổn định. Dịch vụ quan trọng nhất chính là **Amazon CloudWatch**.

## 1. CloudWatch Metrics (Số liệu)
Metrics là các biến số về trạng thái hệ thống của bạn (ví dụ: CPU Utilization, Disk I/O).

- **Standard Resolution**: Dữ liệu được thu thập mỗi 1 - 5 phút (miễn phí).
- **High Resolution**: Cho phép thu thập dữ liệu ở mức giây (đến 1 giây). Cần thiết cho các ứng dụng nhạy cảm (critical applications).
- **Custom Metrics**: Bạn có thể gửi dữ liệu riêng của mình lên CloudWatch (ví dụ: số lượng user đang login, nhiệt độ server vật lý).

### Technical English Keywords:
- **Namespace**: Công-te-nơ chứa các Metrics (Ví dụ: `AWS/EC2`).
- **Dimensions**: Các cặp key-value dùng để lọc (filter) dữ liệu (Ví dụ: `InstanceId`).
- **Retention**: Thời gian lưu trữ dữ liệu. Metadata (tên metric) lưu vô hạn, nhưng datapoints thì giảm dần theo thời gian.

## 2. CloudWatch Alarms (Cảnh báo)
Dùng để tự động hóa phản ứng (automated response) khi một Metric vượt ngưỡng (**Threshold**).

- **OK**: Metric nằm trong ngưỡng cho phép.
- **ALARM**: Metric vượt ngưỡng.
- **INSUFFICIENT_DATA**: Không đủ dữ liệu để đánh giá.

### Scenario Example:
> "Your application is experiencing high latency. You need to be notified when the average latency exceeds 500ms for 3 consecutive periods of 5 minutes."
> -> Bạn sẽ tạo một **CloudWatch Alarm** dựa trên metric **Latency** với **Statistic** là **Average**, Threshold là **500**, và **Evaluation Periods** là **3**.

## 3. Study Guide Question (Check what you know)
**Question**: An administrator needs to track the memory usage of an EC2 instance. By default, CloudWatch does not provide this metric. What should the administrator do?

A. Enable Detailed Monitoring.
B. Install the CloudWatch Agent on the instance.
C. Create a CloudWatch Alarm for CPU Utilization.
D. Check the AWS Config logs.

*(Hãy chọn đáp án bạn cho là đúng và tôi sẽ giải thích nhé!)*
