import { Get, Controller, Query, BadRequestException, Param } from "@nestjs/common";

import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { FetchAnswerCommentsUseCase } from "@/domain/forum/application/use-cases/fetch-answer-comments";
import { CommentWithAuthorPresenter } from "../presenters/comment-with-author-presenter";

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(
    z.number().min(1)
)

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

//Rota para buscar questoes
@Controller("/answers/:answerId/comments")
export class FetchAnswerCommentsController {
    constructor(private fetchAnswerComments: FetchAnswerCommentsUseCase) { }

    @Get()
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Query("page", queryValidationPipe) page: PageQueryParamSchema,
        @Param("answerId") answerId: string

    ) {
        const result = await this.fetchAnswerComments.execute({
            page,
            answerId
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        const comment = result.value.comments

        return { comment: comment.map(CommentWithAuthorPresenter.toHTTP) }
    }
}

