import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {

 async health(){
    return 'healthy';
 }   

 async add(a: string, b:string){
    return +a + +b;
 }

 async sub(a:string, b:string){
   return +a - +b
 }

 async mul(a:string, b:string){
   return +a * +b
 }

 async div(a:string, b:string){
   return +a / +b
 }
}  