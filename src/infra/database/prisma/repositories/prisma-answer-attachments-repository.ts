import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaAnswerAttachmentCommentMapper } from '../mappers/prisma-answer-attachment-mapper';

@Injectable()
export class PrismaAnswersAttachmentsRepository implements AnswerAttachmentsRepository {
  constructor(private prisma: PrismaService) { }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId
      }
    })

    return answerAttachments.map(PrismaAnswerAttachmentCommentMapper.toDomain)
  }
  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      }
    })
  }

}
