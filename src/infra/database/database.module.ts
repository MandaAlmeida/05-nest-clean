import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionsCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-questions-repository";
import { PrismaAnswersAttachmentsRepository } from "./prisma/repositories/prisma-answer-attachments-repository";
import { PrismaAnswersCommentsRepository } from "./prisma/repositories/prisma-answer-comments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { StudentsRepository } from "@/domain/forum/application/repositories/students-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository";
import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository";
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository";
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { AttachmentsRepository } from "@/domain/forum/application/repositories/attachments-repository";
import { PrismaAttachmentsRepository } from "./prisma/repositories/prisma-attachments-repository";

@Module({
    providers: [PrismaService,
        {
            provide: QuestionAttachmentsRepository,
            useClass: PrismaQuestionAttachmentsRepository
        },
        {
            provide: QuestionCommentsRepository,
            useClass: PrismaQuestionsCommentsRepository
        },
        {
            provide: QuestionsRepository,
            useClass: PrismaQuestionsRepository
        },
        {
            provide: StudentsRepository,
            useClass: PrismaStudentsRepository
        },
        {
            provide: AnswerAttachmentsRepository,
            useClass: PrismaAnswersAttachmentsRepository,
        },
        {
            provide: AnswerCommentsRepository,
            useClass: PrismaAnswersCommentsRepository
        },
        {
            provide: AnswersRepository,
            useClass: PrismaAnswersRepository
        },
        {
            provide: AttachmentsRepository,
            useClass: PrismaAttachmentsRepository
        }
    ],
    exports: [
        PrismaService,
        QuestionAttachmentsRepository,
        QuestionCommentsRepository,
        QuestionsRepository,
        StudentsRepository,
        AnswerAttachmentsRepository,
        AnswerCommentsRepository,
        AnswersRepository,
        AttachmentsRepository
    ]
})

export class DatabaseModule { }