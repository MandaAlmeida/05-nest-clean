import { Body, Controller, HttpCode, BadRequestException, Put, Param } from "@nestjs/common";

import { z } from "zod"
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { EditAnswerUseCase } from "@/domain/forum/application/use-cases/edit-answer";

const editAnswerBodySchema = z.object({
    content: z.string(),
    attachments: z.array(z.string().uuid()).default([])
})

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>



//Rota para criar questoes
@Controller("/answers/:id")
export class EditAnswerController {
    constructor(private editAnswer: EditAnswerUseCase) { }

    @Put()
    @HttpCode(204)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Body(bodyValidationPipe) body: EditAnswerBodySchema,
        @CurrentUser() user: UserPayload,
        @Param('id') answerId: string,) {
        const { content, attachments } = body
        const { sub: userId } = user

        const result = await this.editAnswer.execute({
            authorId: userId,
            content,
            answerId,
            attachmentsIds: attachments
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}
