
import { Module } from '@nestjs/common';

import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateQuestionsController } from './controllers/create-question.controller';
import { FetchQuestionsController } from './controllers/fetch-recent-question.controller';

import { DatabaseModule } from '../database/database.module';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student';
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { EditQuestionsController } from './controllers/edit-question.controller';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { AnswerQuestionsController } from './controllers/answer-question.controller';
import { EditAnswerController } from './controllers/edit-answer.controller';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';
import { DeleteQuestionsController } from './controllers/delete-question.controller';
import { DeleteAnswersController } from './controllers/delete-answer.controller';
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers';
import { FetchQuestionsAnswersController } from './controllers/fetch-question-answer.controller';
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller';
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer';
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { CommentOnQuestionsController } from './controllers/comment-on-question.controller';
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment';
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller';
import { CommentOnAnswersController } from './controllers/comment-on-answer.controller';
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment';
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller';
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments';
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller';
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller';
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comments';
import { UploadAttachmentController } from './controllers/upload-attachment.controller';
import { StorageModule } from '../storage/storage.module';
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment';



@Module({
    imports: [
        DatabaseModule, CryptographyModule, StorageModule
    ],
    controllers: [
        CreateAccountController,
        AuthenticateController,
        CreateQuestionsController,
        FetchQuestionsController,
        GetQuestionBySlugController,
        EditQuestionsController,
        DeleteQuestionsController,
        AnswerQuestionsController,
        EditAnswerController,
        DeleteAnswersController,
        FetchQuestionsAnswersController,
        ChooseQuestionBestAnswerController,
        CommentOnQuestionsController,
        DeleteQuestionCommentController,
        CommentOnAnswersController,
        DeleteAnswerCommentController,
        FetchQuestionCommentsController,
        FetchAnswerCommentsController,
        UploadAttachmentController
    ],
    providers: [
        CreateQuestionUseCase,
        FetchRecentQuestionsUseCase,
        AuthenticateStudentUseCase,
        RegisterStudentUseCase,
        GetQuestionBySlugUseCase,
        EditQuestionUseCase,
        DeleteQuestionUseCase,
        AnswerQuestionUseCase,
        EditAnswerUseCase,
        DeleteAnswerUseCase,
        FetchQuestionAnswersUseCase,
        ChooseQuestionBestAnswerUseCase,
        CommentOnQuestionUseCase,
        DeleteQuestionCommentUseCase,
        CommentOnAnswerUseCase,
        DeleteAnswerCommentUseCase,
        FetchQuestionCommentsUseCase,
        FetchAnswerCommentsUseCase,
        UploadAndCreateAttachmentUseCase
    ]
})
export class HttpModule { }