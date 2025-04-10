import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AnswerFactory } from 'test/factories/make-answer'
import { AnswerCommentFactory } from 'test/factories/make-answer-comment'
import { QuestionFactory } from 'test/factories/make-question'
import { StudentFactory } from 'test/factories/make-student'

describe('Delete question comments (E2E)', () => {
    let app: INestApplication
    let prisma: PrismaService
    let answerFactory: AnswerFactory
    let studentFactory: StudentFactory
    let questionFactory: QuestionFactory
    let answerCommentFactory: AnswerCommentFactory
    let jwt: JwtService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule, DatabaseModule],
            providers: [StudentFactory, QuestionFactory, AnswerFactory, AnswerCommentFactory]
        }).compile()

        app = moduleRef.createNestApplication()

        prisma = moduleRef.get(PrismaService)
        studentFactory = moduleRef.get(StudentFactory)
        questionFactory = moduleRef.get(QuestionFactory)
        answerFactory = moduleRef.get(AnswerFactory)
        answerCommentFactory = moduleRef.get(AnswerCommentFactory)
        jwt = moduleRef.get(JwtService)

        await app.init()
    })

    test('[DELETE] /answer/comments/:id', async () => {
        const user = await studentFactory.makePrismaStudent()

        const accessToken = jwt.sign({ sub: user.id.toString() })

        const question = await questionFactory.makePrismaQuestion({
            authorId: user.id
        })

        const answer = await answerFactory.makePrismaAnswer({
            questionId: question.id,
            authorId: user.id
        })

        const answerComment = await answerCommentFactory.makePrismaAnswerComment({
            answerId: answer.id,
            authorId: user.id
        })

        const answerCommentId = answerComment.id.toString()

        const response = await request(app.getHttpServer())
            .delete(`/answer/comments/${answerCommentId}`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send()

        expect(response.statusCode).toBe(204)

        const answerCommentIdOnDatabase = await prisma.comment.findUnique({
            where: {
                id: answerCommentId
            }
        })

        expect(answerCommentIdOnDatabase).toBeNull()
    })
})
