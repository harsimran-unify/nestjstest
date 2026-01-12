import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalculatorController } from './calculator/calculator.controller';
import { CalculatorModule } from './calculator/calculator.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [CalculatorModule, ChatModule],
  controllers: [AppController, CalculatorController],
  providers: [AppService],
})
export class AppModule {}
