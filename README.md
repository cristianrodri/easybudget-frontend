# EasyBudget - Frontend

Webiste project that manage your budget easily. The project was built with Next.js and TypeScript. Mongodb is used as a database.

## Usage

### Backend

The backend of the project was built inside of the src/pages/api folder of the current project. Also src/db is used as a codebase for the database.

### Local files

You need to create a .env.local file and add the following vars. Cloudinary is used as a provider for the user avatar

```
  NEXT_PUBLIC_CLIENT_URL = http://localhost:3000
  MONGODB_URI = <your mongodb uri>
  JWT_KEY = <string>

  CLOUDINARY_NAME = <your cloudinary name>
  CLOUDINARY_KEY = <your cloudinary key>
  CLOUDINARY_SECRET = <your cloudinary secret>
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

```
  yarn test
```
