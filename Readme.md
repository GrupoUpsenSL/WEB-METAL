METAL 2026

# WEB-METAL – Estructuras Metálicas Andrew

Website redesign for Estructuras Metálicas Andrew.

| Part | Stack | Folder | Port |
|------|-------|--------|------|
| Backend | PHP 8.2 REST API (PDO), MySQL 8, JWT admin auth, PHPMailer | `/workspaces/WEB-METAL/backend` | 8000 |
| Frontend | React + Vite + Tailwind | `/workspaces/WEB-METAL/frontend` | 5173 |
| Database | MySQL 8, database `andrew_metal` | – | 3306 |

> **XAMPP / phpMyAdmin do not work in Codespaces.** We install PHP, MySQL and Composer directly and use the MySQL terminal client instead.

---

## 0. Before you start

1. Open the repo in a **new Codespace** on **your branch**.
2. Open the terminal (Ctrl + `). All commands below assume a Linux (Ubuntu) Codespace.
3. Run the blocks **in order**. Every block is safe to run again.

Check you are in the right place:

```bash
cd /workspaces/WEB-METAL && pwd && git branch --show-current && ls
```

You should see `backend`, `frontend` and your branch name.

---

## 1. Install system dependencies (once per new Codespace)

Installed packages are **lost when a Codespace is deleted**, so repeat this section in every new Codespace.

### 1.1 Update the package list and install base tools

```bash
sudo apt-get update
sudo apt-get install -y software-properties-common ca-certificates curl unzip git
```

### 1.2 Add the PHP 8.2 repository

Ubuntu 22.04 only ships PHP 8.1, so we add the trusted PHP repository (ondrej/php).

```bash
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update
```

### 1.3 Install PHP 8.2 and the extensions the API needs

```bash
sudo apt-get install -y php8.2-cli php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip
```

Make `php` point to 8.2 (some Codespace images ship another PHP):

```bash
sudo update-alternatives --install /usr/bin/php php /usr/bin/php8.2 100
sudo update-alternatives --set php /usr/bin/php8.2
hash -r
```

Check it:

```bash
/usr/bin/php8.2 -v
/usr/bin/php8.2 -m | grep -i -E "pdo_mysql|mbstring|curl"
```

> If `php -v` still shows a different version, run `which -a php` and use `/usr/bin/php8.2` explicitly, or run `export PATH=/usr/bin:$PATH`.

### 1.4 Install Composer (PHP package manager)

Installed with the official installer and run with PHP 8.2 so it doesn't pull other PHP versions.

```bash
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
sudo /usr/bin/php8.2 /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
rm /tmp/composer-setup.php
composer --version
```

### 1.5 Install MySQL 8

```bash
sudo apt-get install -y mysql-server
```

Codespaces has no systemd, so MySQL must be started manually. The first `usermod` line fixes a known "cannot change directory" start-up error in containers.

```bash
sudo usermod -d /var/lib/mysql/ mysql
sudo service mysql start
sudo service mysql status
```

You should see `active (running)`.

### 1.6 Check Node and npm

These come preinstalled in Codespaces. Check them:

```bash
node -v && npm -v
```

If either command is not found:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

---

## 2. Set up the database

### 2.1 Set the root password to `root` (development only)

```bash
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; FLUSH PRIVILEGES;"
```

### 2.2 Create the database

```bash
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS andrew_metal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 2.3 Load the schema (6 tables)

This finds `schema.sql` wherever it is in the repo and imports it:

```bash
SCHEMA=$(find /workspaces/WEB-METAL -name schema.sql -not -path "*/node_modules/*" -not -path "*/vendor/*" | head -1)
echo "Using: $SCHEMA"
mysql -u root -proot andrew_metal < "$SCHEMA"
```

Check the tables exist (`services`, `projects`, `testimonials`, `contact_messages`, `settings`, `users`):

```bash
mysql -u root -proot andrew_metal -e "SHOW TABLES;"
```

Handy queries:

```bash
mysql -u root -proot andrew_metal -e "SELECT * FROM services;"
mysql -u root -proot andrew_metal            # interactive shell (type exit to leave)
```

> The "password on the command line may be insecure" warning is normal in development.

---

## 3. Install the project dependencies

### 3.1 Backend

```bash
cd /workspaces/WEB-METAL/backend
[ -f composer.json ] && composer install || echo "No composer.json yet - skipping"
```

Create your local environment file (never commit `.env`):

```bash
[ -f .env.example ] && cp -n .env.example .env || echo "No .env.example found - create .env manually (see section 6)"
```

### 3.2 Frontend

```bash
cd /workspaces/WEB-METAL/frontend
npm install
```

---

## 4. Run everything (3 terminals)

Open three terminals (the `+` button in the terminal panel).

**Terminal 1 – MySQL** (needed again after every Codespace stop/restart):

```bash
sudo service mysql start
```

**Terminal 2 – PHP API on port 8000:**

```bash
cd /workspaces/WEB-METAL/backend
php -S 0.0.0.0:8000 -t public
```

> If your entry point is not in `public/`, change `-t public` to the right folder (for example `-t .`).

**Terminal 3 – React on port 5173:**

```bash
cd /workspaces/WEB-METAL/frontend
npm run dev -- --host
```

Open the **Ports** tab in VS Code:

- Port **5173** → open in the browser to see the site.
- Port **8000** → right-click → *Port Visibility* → **Public**, so the frontend can call the API.

Quick API test (from any terminal):

```bash
curl -i http://localhost:8000
```

---

## 5. One-shot script (optional)

Sections 1 and 2 as a single block. Paste it into the terminal of a fresh Codespace:

```bash
set -e
sudo apt-get update
sudo apt-get install -y software-properties-common ca-certificates curl unzip git
sudo add-apt-repository -y ppa:ondrej/php
sudo apt-get update
sudo apt-get install -y php8.2-cli php8.2-mysql php8.2-mbstring php8.2-xml php8.2-curl php8.2-zip mysql-server
sudo update-alternatives --install /usr/bin/php php /usr/bin/php8.2 100
sudo update-alternatives --set php /usr/bin/php8.2
hash -r
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
sudo /usr/bin/php8.2 /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
rm /tmp/composer-setup.php
sudo usermod -d /var/lib/mysql/ mysql
sudo service mysql start
sleep 3
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; FLUSH PRIVILEGES;"
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS andrew_metal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
SCHEMA=$(find /workspaces/WEB-METAL -name schema.sql -not -path "*/node_modules/*" -not -path "*/vendor/*" | head -1)
mysql -u root -proot andrew_metal < "$SCHEMA"
cd /workspaces/WEB-METAL/backend && { [ -f composer.json ] && composer install || true; }
cd /workspaces/WEB-METAL/frontend && npm install
echo "SETUP DONE"
```

Then start the three servers as in section 4.

---

## 6. Environment variables

Create `backend/.env` (copy from `.env.example` if it exists):

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=andrew_metal
DB_USER=root
DB_PASS=root
JWT_SECRET=change-this-to-a-long-random-string
```

Generate a secret:

```bash
php -r "echo bin2hex(random_bytes(32)), PHP_EOL;"
```

---

## 7. Git workflow

```bash
git checkout main && git pull origin main      # update main
git checkout your-branch                       # switch to your branch
git merge main                                 # bring main's latest changes into your branch
git add . && git commit -m "describe change"   # save your work
git push -u origin your-branch                 # publish your branch
```

`.gitignore` should include:

```
.env
vendor/
node_modules/
```

---

## 8. Troubleshooting

| Problem | Fix |
|---------|-----|
| `Can't connect to local MySQL server through socket` | MySQL is not running: `sudo service mysql start` |
| `Access denied for user 'root'` | Repeat step 2.1, then use `-proot` |
| `could not find driver` (PDO) | `sudo apt-get install -y php8.2-mysql`, then restart the PHP server |
| `php -v` shows the wrong version | `sudo update-alternatives --set php /usr/bin/php8.2 && hash -r` |
| `Table doesn't exist` | Repeat step 2.3 |
| `Address already in use` (port 8000/5173) | `fuser -k 8000/tcp` (or `5173/tcp`), then start again |
| Frontend can't reach the API (CORS / blocked) | Set port 8000 to **Public** in the Ports tab and allow the frontend origin in the API CORS headers |
| Codespace stopped overnight | Run `sudo service mysql start`, then restart the PHP and Vite servers |