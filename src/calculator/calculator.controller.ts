import { Controller, Param } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { Get, Post } from '@nestjs/common';
import { OperationDto } from 'src/calculator/dto/operation.dto';

@Controller('calculator')
export class CalculatorController {
    constructor(private readonly calculatorService: CalculatorService){}

    @Get('/health') 
    async healthRoute(){
        return this.calculatorService.health();
    }

    @Post('/:operation/:a/:b')
    async operationRoute(@Param() params: OperationDto){
        const { operation, a, b } = params;
        if (operation == 'add'){
            return this.calculatorService.add(a , b)
        }
        else if (operation == 'sub'){
            return this.calculatorService.sub(a , b)
        }
        else if (operation == 'mul'){
            return this.calculatorService.mul(a , b)
        }
        else if (operation == 'div'){
            return this.calculatorService.div(a , b)
        }
        else {
            return 'Please enter valid operations: add, sub, mul, div'
        }
    }
}
