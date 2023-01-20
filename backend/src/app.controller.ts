import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {

    @Get('/transcendence')
    welcome(): string {
        return "Welcom page";
    }
}