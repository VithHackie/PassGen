# PassGen
Password Management System
<div align="center">
  
# 🔐 Passgen

**A Full-Blown Cryptographic Suite & Secure Password Management System**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 About Passgen

Managing passwords shouldn't mean sacrificing security for convenience. **Passgen** is a locally-hosted, multi-user password management system that puts the cryptographic keys entirely in your hands. 

Built on a robust React and Node.js architecture with a PostgreSQL database, Passgen doesn't just store passwords—it acts as a comprehensive cryptographic utility. From generating complex, uncrackable credentials to providing a full suite of hashing algorithms, Passgen ensures that your digital footprint remains exclusively yours.

## ✨ Core Features

* **🛡️ Client-Keyed AES Encryption:** Your vault is locked with a private key you define at signup. Passgen uses Advanced Encryption Standard (AES) to encrypt your platform credentials. *Only your specific profile and private key can decrypt the vault.*
* **🔑 Advanced Password Generation:** Create highly complex, randomized passwords tailored to strict security requirements.
* **👥 Multi-User Environment:** Securely host multiple users on a single system. Complete data isolation is maintained via robust JWT (JSON Web Token) session management.
* **🧮 Comprehensive Hashing Suite:** Access a full-blown package of cryptographic hashing facilities directly within the application, allowing you to generate hashes across a wide variety of algorithms.
* **📂 Platform Mapping:** Intuitively map and save your generated passwords to their corresponding platforms and services.

---

## 🏗️ Security Architecture

Passgen is designed with a **Zero-Knowledge Architecture** approach for the database. 
1.  During user signup, a unique private key is established.
2.  All passwords saved to the database are encrypted using AES *before* resting in PostgreSQL.
3.  Decryption occurs strictly on the user's profile page upon authenticated request. If the database is ever compromised, the attacker only sees AES-encrypted ciphertext.

---

## 🚀 Getting Started

Follow these instructions to get a copy of Passgen running on your local machine for development and testing purposes.

### Prerequisites

You will need the following installed on your system:
* [Node.js](https://nodejs.org/en/download/) (v16.x or higher)
* [PostgreSQL](https://www.postgresql.org/download/) (v13.x or higher)
* *Optional:* [Docker](https://www.docker.com/) and Docker Compose (if you prefer containerized deployment)

### Standard Local Installation

**1. Clone the repository**
```bash
git clone [https://github.com/yourusername/passgen.git](https://github.com/yourusername/passgen.git)
cd passgen
