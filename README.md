# AI-Powered News Summarization Platform

![imagen](https://github.com/user-attachments/assets/7b03a1a6-8909-4fd4-9a96-0365e9d12a9a)


## Overview

This platform provides AI-generated summaries of news articles, automatically updating at regular intervals. Users can also input a URL to get a summarized version of the article. The platform categorizes articles and offers them in both English and Spanish, regardless of the original language of the article.

## Features

- **Automated Summaries**: Periodic summaries of news articles using AI.
- **Manual URL Summarization**: Users can input a URL to get an instant summary of the article.
- **Categorization**: Articles are automatically categorized based on their content.
- **Bilingual Support**: Articles are available in both English and Spanish.

## Getting Started

To get started with the project, follow these steps:

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/blasferna/lazynews.git
    cd lazynews
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add the following environment variables:
    ```env
    POSTGRES_DATABASE="verceldb"
    POSTGRES_HOST=
    POSTGRES_PASSWORD=
    POSTGRES_PRISMA_URL=
    POSTGRES_URL=
    POSTGRES_URL_NON_POOLING=
    POSTGRES_URL_NO_SSL=
    POSTGRES_USER="default"

    OPENAI_API_KEY=
    ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Resources

- [Vercel AI SDK](https://sdk.vercel.ai/) - This project uses the Vercel AI SDK to generate summaries. learn how to use the Vercel AI SDK to add AI capabilities to your projects.
