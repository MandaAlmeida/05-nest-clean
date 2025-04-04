import { Get, Controller, Query, BadRequestException, Param } from "@nestjs/common";

import { z } from "zod";
import { ZodValidationPipe } from "@/infra/http/pipes/zod-validation-pipe";
import { FetchQuestionAnswersUseCase } from "@/domain/forum/application/use-cases/fetch-question-answers";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { AnswerPresenter } from "../presenters/answer-presenter";

const pageQueryParamSchema = z.string().optional().default('1').transform(Number).pipe(
    z.number().min(1)
)

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

//Rota para buscar questoes
@Controller("/questions/:questionId/answers")
export class FetchQuestionsAnswersController {
    constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) { }

    @Get()
    //Pegar dados do corpo da requisicao @Body() body: any
    async handle(
        @Query("page", queryValidationPipe) page: PageQueryParamSchema,
        @Param("questionId") questionId: string

    ) {
        const result = await this.fetchQuestionAnswers.execute({
            page,
            questionId
        })

        if (result.isLeft()) {
            throw new BadRequestException()
        }

        const answers = result.value.answers

        return { answers: answers.map(AnswerPresenter.toHTTP) }
    }
}

