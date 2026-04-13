# 03.1: AWS Cloud Development Kit (CDK) Fundamentals

**AWS CDK** là một trong những công cụ **Infrastructure as Code (IaC)** quan trọng được thêm vào SOA-C03. CDK cho phép bạn định nghĩa cloud infrastructure bằng các ngôn ngữ lập trình quen thuộc.

## 1. CDK là gì? (What is CDK?)

**AWS Cloud Development Kit (CDK)** là một framework cho phép định nghĩa AWS infrastructure bằng code (TypeScript, Python, Java, C#, Go).

### So sánh CDK vs CloudFormation:

| Aspect          | CloudFormation          | CDK                                |
| --------------- | ----------------------- | ---------------------------------- |
| **Ngôn ngữ**    | YAML/JSON               | TypeScript, Python, Java, etc.     |
| **Abstraction** | Thấp (low-level)        | Cao (high-level constructs)        |
| **Reusability** | Limited (nested stacks) | Native (classes, modules)          |
| **IDE Support** | Limited                 | Full (autocomplete, type checking) |
| **Output**      | Direct deployment       | Synthesizes to CloudFormation      |

### Workflow:
```
┌──────────────┐    cdk synth    ┌─────────────────┐    cdk deploy    ┌─────────────┐
│   CDK Code   │ ──────────────► │  CloudFormation │ ────────────────► │ AWS Resources│
│  (TypeScript)│                 │    Template     │                   │             │
└──────────────┘                 └─────────────────┘                   └─────────────┘
```

---

## 2. Cấu trúc CDK (CDK Structure)

### Key Concepts:

- **App**: Root của CDK application
- **Stack**: Đơn vị deployment (= CloudFormation Stack)
- **Construct**: Building blocks của CDK

### Construct Levels:
| Level             | Mô tả                           | Ví dụ           |
| ----------------- | ------------------------------- | --------------- |
| **L1 (Cfn)**      | 1:1 mapping với CloudFormation  | `CfnBucket`     |
| **L2 (Curated)**  | Higher-level, sensible defaults | `Bucket`        |
| **L3 (Patterns)** | Multi-resource patterns         | `LambdaRestApi` |

### Ví dụ Code (TypeScript):
```typescript
import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class MyStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);
    
    // L2 Construct - high-level, sensible defaults
    new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });
  }
}
```

---

## 3. CDK Commands (Các lệnh CDK)

| Command         | Mô tả                                       |
| --------------- | ------------------------------------------- |
| `cdk init`      | Khởi tạo CDK project mới                    |
| `cdk synth`     | Generate CloudFormation template            |
| `cdk diff`      | So sánh deployed stack với local            |
| `cdk deploy`    | Deploy stack lên AWS                        |
| `cdk destroy`   | Xóa stack khỏi AWS                          |
| `cdk bootstrap` | Setup CDK toolkit stack (chạy 1 lần/region) |

### Technical English Keywords:
- **Synthesize**: Quá trình chuyển đổi CDK code thành CloudFormation template
- **Bootstrap**: Chuẩn bị AWS account/region cho CDK deployments
- **Construct Library**: Tập hợp các pre-built constructs

---

## 4. CDK Best Practices

### ✅ Nên làm (Do):
- Sử dụng **L2 Constructs** khi có thể (better defaults)
- **Parameterize** stacks với `cdk.CfnParameter` hoặc context
- Tổ chức code thành **reusable constructs**
- Sử dụng `cdk diff` trước khi deploy

### ❌ Tránh (Don't):
- Hardcode account/region (dùng `env` property)
- Ignore `cdk.out` trong version control
- Mix business logic với infrastructure code

---

## 5. CDK vs Terraform

| Aspect              | CDK                                    | Terraform            |
| ------------------- | -------------------------------------- | -------------------- |
| **Provider**        | AWS only (CDK for Terraform available) | Multi-cloud          |
| **State**           | CloudFormation manages                 | Terraform state file |
| **Language**        | General-purpose languages              | HCL (HashiCorp)      |
| **AWS Integration** | Native                                 | Via provider         |

---

## 6. Study Guide Question

**Question**: A DevOps engineer wants to deploy AWS infrastructure using TypeScript and ensure the deployed resources have sensible security defaults. The engineer also wants to be able to preview changes before deployment. Which combination of tools and practices should be used?

A. Write CloudFormation templates in YAML and use `aws cloudformation deploy`
B. Use AWS CDK with L2 constructs and run `cdk diff` before `cdk deploy`
C. Use AWS SAM templates and run `sam validate`
D. Write Terraform HCL files and run `terraform plan`

*(Hãy chọn đáp án bạn cho là đúng!)*
