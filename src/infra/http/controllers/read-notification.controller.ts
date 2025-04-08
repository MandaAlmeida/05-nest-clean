import { Controller, BadRequestException, Param, Patch, HttpCode } from "@nestjs/common";
import { ReadNotificationUseCase } from "@/domain/notification/application/use-cases/read-notification";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

//Rota para buscar questoes
@Controller("/notifications/:notificationId/read")
export class ReadNotificationController {
    constructor(private readNotification: ReadNotificationUseCase) { }

    @Patch()
    @HttpCode(204)
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @CurrentUser() user: UserPayload,
        @Param('notificationId') notificationId: string
    ) {
        const result = await this.readNotification.execute({
            notificationId,
            recipientId: user.sub,
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }
    }
}

