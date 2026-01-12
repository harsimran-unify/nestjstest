import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as dotenv from 'dotenv'

dotenv.config()
@Injectable()
export class ChatService {

    aiModel = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: process.env.openRouter,
    });

    async model(message: string){
        const response = await this.aiModel.chat.completions.create({
        
        model: 'qwen/qwen-2.5-7b-instruct',
        messages: [
            {
                role: 'user',
                content: message
            }
        ]
        })
        return response
    }

    async response(message: string){
        const res = await this.model(message)
        return `USER : ${message}<br>BOT : ${res.choices[0].message.content}`;
    }
}
