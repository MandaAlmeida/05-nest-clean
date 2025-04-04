import { Get, Controller, BadRequestException, Param } from "@nestjs/common";

import { QuestionPresenter } from "../presenters/question-presenter";
import { GetQuestionBySlugUseCase } from "@/domain/forum/application/use-cases/get-question-by-slug";

//Rota para buscar questoes
@Controller("/questions/:slug")
export class GetQuestionBySlugController {
    constructor(private getQuestionBySlug: GetQuestionBySlugUseCase) { }

    @Get()
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(@Param('slug') slug: string) {
        const result = await this.getQuestionBySlug.execute({
            slug,
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        const question = result.value.question

        return { question: QuestionPresenter.toHTTP(question) }
    }
}

