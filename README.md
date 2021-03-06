# EasyBudget - Frontend

Webiste project that manage your budget easily. The project was built with Next.js and TypeScript.

## Usage

### Setup backend

The backend of the project was built with Strapi.js and you can check it out [here](https://github.com/cristianrodri/easybudget-backend). You can also visit the production website [here](https://easybudget.vercel.app)

### Local files

You need to create a .env.local file and add the following code

```
  NEXT_PUBLIC_CLIENT_URL = http://localhost:3000
  NEXT_PUBLIC_SERVER_API_URL = http://localhost:1337
```

### Install dependencies

```
  yarn install
```

### Run the server

```
  yarn dev
```

### Test

Some tests was made. If you want to check it out, just run the following command

```
  yarn test
```
