import { Controller, HttpCode, BadRequestException, Param, Patch } from "@nestjs/common";

import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { ChooseQuestionBestAnswerUseCase } from "@/domain/forum/application/use-cases/choose-question-best-answer";


//Rota para criar questoes
@Controller("/answers/:answerId/choose-as-best")
export class ChooseQuestionBestAnswerController {
    constructor(private chooseQuestionBestAnswer: ChooseQuestionBestAnswerUseCase) { }

    @Patch()
    @HttpCode(204)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @CurrentUser() user: UserPayload,
        @Param('answerId') answerId: string,) {
        const { sub: userId } = user

        const result = await this.chooseQuestionBestAnswer.execute({
            authorId: userId,
            answerId
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
