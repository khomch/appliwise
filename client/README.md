# Appliwise — Job application tracker
Current version: 0.1.

## Running local

1. Setup and run the server:

- Install and run `PostgreSQL` process;
- Create `Database` for the project;
- To connect to the database create `.env` file in `/server` folder with `DATABASE_URL="postgresql://your-connection-string"`;
- Install dependencies:
```bash
cd server
npm i
```
- Run the server:
```bash
npm run dev
```

2. Setup and run the client:
- Install dependencies:
```bash
cd client
npm i
```
- Run the client:
```bash
npm run dev
```


Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
