import { Body, Controller, HttpCode, Post, BadRequestException, Param } from "@nestjs/common";

import { z } from "zod"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";

import { AnswerQuestionUseCase } from "@/domain/forum/application/use-cases/answer-question";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const answerQuestionBodySchema = z.object({
    content: z.string(),
    attachments: z.array(z.string().uuid())
})

type AnswerQuestionBodySchema = z.infer<typeof answerQuestionBodySchema>


//Rota para criar questoes
@Controller("/questions/:questionId/answers")
export class AnswerQuestionsController {
    constructor(private answerQuestion: AnswerQuestionUseCase) { }

    @Post()
    @HttpCode(201)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Body(new ZodValidationPipe(answerQuestionBodySchema))
        body: AnswerQuestionBodySchema,
        @CurrentUser() user: UserPayload,
        @Param("questionId") questionId: string
    ) {
        const { content, attachments } = body
        const { sub: userId } = user

        const result = await this.answerQuestion.execute({
            authorId: userId,
            questionId,
            content,
            attachmentsIds: attachments,
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
