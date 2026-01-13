import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { BaseMessage, HumanMessage, SystemMessage, AIMessage } from 'langchain';
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class ChatService {
  history: BaseMessage[] = [];

  private aiModel: ChatOpenAI;
  constructor() {
    this.aiModel = new ChatOpenAI({
      model: 'qwen/qwen-2.5-7b-instruct',
      apiKey: process.env.openRouter,
      temperature: 1,
      configuration: {
        baseURL: 'https://openrouter.ai/api/v1',
      },
    });
  }
  async promptGen(message: string): Promise<any> {
    const system = new SystemMessage('You are a helpful assistant.');
    const user = new HumanMessage(message);
    this.history.push(user);
    const prompt = [system, ...this.history];
    return prompt;
  }

  async resp(prompt: BaseMessage[]): Promise<AIMessage> {
    const res = await this.aiModel.invoke(prompt);
    this.history.push(res);
    return res;
  }

  async orchest(message: string): Promise<BaseMessage[]> {
    const prompt = await this.promptGen(message);
    const res = await this.resp(prompt);
    return this.chatshowing();
  }

  async chatshowing(): Promise<any[]> {
    const rolewise = this.history.map((item) => ({
    role: item.getType(),
    content: item.content,
  }));
  return this.prettychat(rolewise)
}
  async prettychat(rolewise){
    const pretty = rolewise.map(item => [item.role,item.content])
    return pretty
  }
}

//   }
//   async response(message: string): Promise<AIMessage> {
//     const user = new HumanMessage(message);
//     const system = new SystemMessage('You are a helpful assistant.');
//     const prompt = [system, user];
//     const res = await this.aiModel.invoke(prompt);
//     return res;
//   }

//   async aimessage(message: string) {
//     const res = await this.response(message);
//     return `USER : ${message}<br>BOT : ${res.content}`;
//   }
