import { BadRequestException, UnauthorizedException, UsePipes } from "@nestjs/common";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { AuthenticateStudentUseCase } from "@/domain/forum/application/use-cases/authenticate-student";
import { WrongCredentialsError } from "@/domain/forum/application/use-cases/errors/wrong-creadentials-error";
import { Public } from "@/infra/auth/public";

const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

//Rota para criar usuario
@Controller("/sessions")
@Public() // Torna apenas essa rota publica, muito util quando se coloca rota privada no geral
export class AuthenticateController {
    constructor(private authenticateStudent: AuthenticateStudentUseCase) { }

    @Post()
    @UsePipes(new ZodValidationPipe(authenticateBodySchema))
    @HttpCode(201)

    async handle(@Body() body: AuthenticateBodySchema) {
        const { email, password } = body

        const result = await this.authenticateStudent.execute({
            email,
            password
        })

        if (result.isLeft()) {
            const error = result.value

            switch (error.constructor) {
                case WrongCredentialsError:
                    throw new UnauthorizedException(error.message)
                default:
                    throw new BadRequestException(error.message)
            }
        }

        const { accessToken } = result.value

        return {
            access_token: accessToken
        }

    }
}