import { Body, Controller, HttpCode, Post, BadRequestException } from "@nestjs/common";

import { z } from "zod"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";

import { CreateQuestionUseCase } from "@/domain/forum/application/use-cases/create-question";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    attachments: z.array(z.string().uuid()),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>


//Rota para criar questoes
@Controller("/questions")
export class CreateQuestionsController {
    constructor(private createQuestion: CreateQuestionUseCase) { }

    @Post()
    @HttpCode(201)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Body(new ZodValidationPipe(createQuestionBodySchema))
        body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload) {
        const { title, content, attachments } = body
        const { sub: userId } = user

        const result = await this.createQuestion.execute({
            authorId: userId,
            title,
            content,
            attachmentsIds: attachments,
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
