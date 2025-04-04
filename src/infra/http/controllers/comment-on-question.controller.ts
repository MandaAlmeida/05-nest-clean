import { Body, Controller, HttpCode, Post, BadRequestException, Param } from "@nestjs/common";

import { z } from "zod"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";

import { CommentOnQuestionUseCase } from "@/domain/forum/application/use-cases/comment-on-question";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const commentOnQuestionBodySchema = z.object({
    content: z.string(),
})

type CommentOnQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>


//Rota para criar questoes
@Controller("/questions/:questionId/comments")
export class CommentOnQuestionsController {
    constructor(private commentOnQuestion: CommentOnQuestionUseCase) { }

    @Post()
    @HttpCode(201)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Body(new ZodValidationPipe(commentOnQuestionBodySchema))
        body: CommentOnQuestionBodySchema,
        @CurrentUser() user: UserPayload,
        @Param("questionId") questionId: string
    ) {
        const { content } = body
        const { sub: userId } = user

        const result = await this.commentOnQuestion.execute({
            authorId: userId,
            questionId,
            content,
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
