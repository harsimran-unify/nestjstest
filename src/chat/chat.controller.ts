import { Controller, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Get } from '@nestjs/common';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService){}

    @Get(':message')
    async chatroute(@Param('message') message: string){
        return this.chatService.aimessage(message);
    }
}
