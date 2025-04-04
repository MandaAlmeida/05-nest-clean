import { Controller, HttpCode, BadRequestException, Param, Delete } from "@nestjs/common";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { DeleteAnswerCommentUseCase } from "@/domain/forum/application/use-cases/delete-answer-comment";

//Rota para criar questoes
@Controller("/answer/comments/:id")
export class DeleteAnswerCommentController {
    constructor(private deleteAnswerComment: DeleteAnswerCommentUseCase) { }

    @Delete()
    @HttpCode(204)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @CurrentUser() user: UserPayload,
        @Param('id') answerCommentId: string,) {

        const { sub: userId } = user

        const result = await this.deleteAnswerComment.execute({
            answerCommentId,
            authorId: userId
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
