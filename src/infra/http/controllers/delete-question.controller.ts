import { Controller, HttpCode, BadRequestException, Param, Delete } from "@nestjs/common";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { DeleteQuestionUseCase } from "@/domain/forum/application/use-cases/delete-question";

//Rota para criar questoes
@Controller("/questions/:id")
export class DeleteQuestionsController {
    constructor(private deleteQuestion: DeleteQuestionUseCase) { }

    @Delete()
    @HttpCode(204)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @CurrentUser() user: UserPayload,
        @Param('id') questionId: string,) {

        const { sub: userId } = user

        const result = await this.deleteQuestion.execute({
            questionId,
            authorId: userId
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
