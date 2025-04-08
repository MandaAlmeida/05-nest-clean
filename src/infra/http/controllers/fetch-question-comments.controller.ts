import { Get, Controller, Query, BadRequestException, Param } from "@nestjs/common";

import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { FetchQuestionCommentsUseCase } from "@/domain/forum/application/use-cases/fetch-question-comments";
import { CommentPresenter } from "../presenters/comment-presenter";
import { CommentWithAuthorPresenter } from "../presenters/comment-with-author-presenter";

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(
    z.number().min(1)
)

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

//Rota para buscar questoes
@Controller("/questions/:questionId/comments")
export class FetchQuestionCommentsController {
    constructor(private fetchQuestionComments: FetchQuestionCommentsUseCase) { }

    @Get()
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Query("page", queryValidationPipe) page: PageQueryParamSchema,
        @Param("questionId") questionId: string

    ) {
        const result = await this.fetchQuestionComments.execute({
            page,
            questionId
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        const comments = result.value.comments

        return { comments: comments.map(CommentWithAuthorPresenter.toHTTP) }
    }
}

