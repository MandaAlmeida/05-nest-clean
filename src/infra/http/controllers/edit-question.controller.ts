import { Body, Controller, HttpCode, BadRequestException, Put, Param } from "@nestjs/common";

import { z } from "zod"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { EditQuestionUseCase } from "@/domain/forum/application/use-cases/edit-question";

const editQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editQuestionBodySchema)

type EditQuestionBodySchema = z.infer<typeof editQuestionBodySchema>



//Rota para criar questoes
@Controller("/questions/:id")
export class EditQuestionsController {
    constructor(private editQuestion: EditQuestionUseCase) { }

    @Put()
    @HttpCode(204)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Body(bodyValidationPipe) body: EditQuestionBodySchema,
        @CurrentUser() user: UserPayload,
        @Param('id') questionId: string,) {
        const { title, content } = body
        const { sub: userId } = user

        const result = await this.editQuestion.execute({
            authorId: userId,
            title,
            content,
            attachmentsIds: [],
            questionId
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
