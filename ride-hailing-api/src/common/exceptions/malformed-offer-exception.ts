import { HttpException, HttpStatus } from "@nestjs/common";

export class MalformedOfferException extends HttpException {
  constructor(message: string) {
    super(`Malformed offer recieved: ${message}`, HttpStatus.BAD_GATEWAY);
  }
}