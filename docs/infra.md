# Інфраструктура та оркестрація

## Docker + docker-compose (вже є)

- `docker-compose up --build` запускає frontend в контейнері nginx.

## Kubernetes (базова схема)

1. Створити `deployment` для build-артефакту.
2. Створити `service` типу LoadBalancer.
3. Налаштувати `ingress` для HTTPS.

### Приклад k8s/кваліфікацій:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: react-frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: react-frontend
  template:
    metadata:
      labels:
        app: react-frontend
    spec:
      containers:
        - name: web
          image: your-registry/react-frontend:latest
          ports:
            - containerPort: 80
```

## Terraform (мінімум)

- Використати провайдер `aws` / `google` / `azurerm`.
- Створити infra-план для:
  - VPC
  - EC2 / GKE / AKS
  - Load Balancer
  - S3 bucket (Artefacts)

> У цьому репо можна шаблонно додати файли `terraform/main.tf` за наступною структурою.
