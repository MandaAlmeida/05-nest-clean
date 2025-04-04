import { Get, UseGuards, Controller, Query, BadRequestException } from "@nestjs/common";

import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { FetchRecentQuestionsUseCase } from "@/domain/forum/application/use-cases/fetch-recent-questions";
import { QuestionPresenter } from "../presenters/question-presenter";

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(
    z.number().min(1)
)

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

//Rota para buscar questoes
@Controller("/questions")
export class FetchQuestionsController {
    constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) { }

    @Get()
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(@Query("page", queryValidationPipe) page: PageQueryParamSchema) {
        const result = await this.fetchRecentQuestions.execute({
            page,
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        const questions = result.value.questions

        return { questions: questions.map(QuestionPresenter.toHTTP) }
    }
}

