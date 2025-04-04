import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


// Conectando o Nest ao banco de dados
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            log: ["warn", "error"]
        }) // forma simplificada
    }

    onModuleInit() {
        return this.$connect()
    }

    onModuleDestroy() {
        return this.$disconnect()
    }
}