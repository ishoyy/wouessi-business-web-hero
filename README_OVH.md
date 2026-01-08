# Business Web Hero — OVHcloud Turnkey Deployment (Docker + Caddy)

## Deploy (Ubuntu 22.04)
1) Install Docker:
```bash
sudo apt update
sudo apt install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
```

2) Upload the APP folder to your server, then:
```bash
cp .env.example .env
nano .env
```

3) DNS: A record -> your server IP.

4) Start:
```bash
docker compose up -d --build
docker compose logs -f
```

Leads are stored in: `./data/leads.json`
