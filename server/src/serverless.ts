import { Handler, Context } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as serverlessExpress from 'aws-serverless-express';

let cachedServer: Server;

async function bootstrap(): Promise<Server> {
    if (!cachedServer) {
        const expressApp = express();
        const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

        // Enable CORS
        nestApp.enableCors({
            origin: 'https://uapsa-upd.vercel.app',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
            credentials: true,
            maxAge: 3600,
        });

        await nestApp.init();
        cachedServer = serverlessExpress.createServer(expressApp);
    }
    return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
    try {
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': 'https://uapsa-upd.vercel.app',
                    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                    'Access-Control-Allow-Credentials': 'true',
                },
                body: null,
            };
        }
        const server = await bootstrap();
        return serverlessExpress.proxy(server, event, context, 'PROMISE').promise;
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': 'https://uapsa-upd.vercel.app',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};