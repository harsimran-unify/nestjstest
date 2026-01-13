import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage, AIMessage} from 'langchain';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class ChatService {

    private aiModel: ChatOpenAI;
    constructor() {
      this.aiModel = new ChatOpenAI({
        model: 'qwen/qwen-2.5-7b-instruct',
        apiKey: process.env.openRouter,
        temperature: 1,
        configuration: {
          baseURL: 'https://openrouter.ai/api/v1'
        }, 
      });
    }
    async response(message: string): Promise<AIMessage> {
      const user = new HumanMessage(message)
      const system = new SystemMessage('You are a helpful assistant.') 
      const prompt = [system, user]
      const res = await this.aiModel.invoke(prompt)
      return res;
    }

    async aimessage(message: string) {
      const res = await this.response(message);
      return `USER : ${message}<br>BOT : ${res.content}`;
    }
}
