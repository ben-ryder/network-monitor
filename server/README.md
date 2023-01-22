# Platformatic DB API

This is a generated [Platformatic DB](https://oss.platformatic.dev/docs/reference/db/introduction) application.

## Requirements

Platformatic supports macOS, Linux and Windows ([WSL](https://docs.microsoft.com/windows/wsl/) recommended).
You'll need to have [Node.js](https://nodejs.org/) >= v16.17.0 or >= v18.8.0

## Setup 

1. Setup Database

Technically you can set up the database however you wish and then edit the `DATABASE_URL` environment
variable. There is a pre-defined script included in this project that can make this process easy
for local development or deployments too...

```bash
# Copy the example setup script and edit as required
cp scripts/example.setup.sql setup.sql

# Run the script to setup the database & user
psql postgres -f ./scripts/setup.sql 
```

2. Setup Environment Variables

```bash
cp .env.example .env
```
and then edit as required...

3. Install dependencies:

```bash
npm install
```

4. Apply migrations:

```bash
npx platformatic db migrations apply
```


## Usage

Run the API with:

```bash
npm start
```

### Explore
- ⚡ The Platformatic DB server is running at http://localhost:3042/
- 📔 View the REST API's Swagger documentation at http://localhost:3042/documentation/
- 🔍 Try out the GraphiQL web UI at http://localhost:3042/graphiql


