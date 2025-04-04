import { Body, Controller, HttpCode, Post, BadRequestException, Param } from "@nestjs/common";

import { z } from "zod"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";

import { CommentOnAnswerUseCase } from "@/domain/forum/application/use-cases/comment-on-answer";
import { UserPayload } from "@/infra/auth/jwt.strategy";

const commentOnAnswerBodySchema = z.object({
    content: z.string(),
})

type CommentOnAnswerBodySchema = z.infer<typeof commentOnAnswerBodySchema>


//Rota para criar questoes
@Controller("/answers/:answerId/comments")
export class CommentOnAnswersController {
    constructor(private commentOnAnswer: CommentOnAnswerUseCase) { }

    @Post()
    @HttpCode(201)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Body(new ZodValidationPipe(commentOnAnswerBodySchema))
        body: CommentOnAnswerBodySchema,
        @CurrentUser() user: UserPayload,
        @Param("answerId") answerId: string
    ) {
        const { content } = body
        const { sub: userId } = user

        const result = await this.commentOnAnswer.execute({
            authorId: userId,
            answerId,
            content,
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
