import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { ConflictException } from "@nestjs/common";
import { Response } from "express";

@Catch(ConflictException)
export class MongooseExceptionFilter implements ExceptionFilter {
    catch(exception: ConflictException, host: ArgumentsHost) {

        const message = exception.message;
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                message: message,
            });
    }
}
