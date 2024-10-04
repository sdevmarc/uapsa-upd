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
            origin: '*',
            methods: ['GET', 'POST']
        });

        await nestApp.init();
        cachedServer = serverlessExpress.createServer(expressApp);
    }
    return cachedServer;
}

export const handler: Handler = async (event: any, context: Context) => {
    try {
        const server = await bootstrap();
        return serverlessExpress.proxy(server, event, context, 'PROMISE').promise;
    } catch (error) {
        console.error('File upload error:', error);
        throw new Error(`File upload failed: ${error.message}`);
    }
};