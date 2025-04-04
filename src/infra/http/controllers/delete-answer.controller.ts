import { Controller, HttpCode, BadRequestException, Param, Delete } from "@nestjs/common";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { DeleteAnswerUseCase } from "@/domain/forum/application/use-cases/delete-answer";

//Rota para criar questoes
@Controller("/answers/:id")
export class DeleteAnswersController {
    constructor(private deleteAnswer: DeleteAnswerUseCase) { }

    @Delete()
    @HttpCode(204)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @CurrentUser() user: UserPayload,
        @Param('id') answerId: string,) {

        const { sub: userId } = user

        const result = await this.deleteAnswer.execute({
            answerId,
            authorId: userId
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
