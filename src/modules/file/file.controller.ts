import {
  Controller,
  Get,
  Res,
  NotFoundException,
  ForbiddenException,
  Param,
  Logger
} from '@nestjs/common';
import express from 'express';
import mime from 'mime-types';
import * as fs from 'fs';
import * as path from 'path';
import { FileService } from './file.service';

@Controller('stream')
export class FileController {
  private readonly logger = new Logger(FileController.name);

  constructor(private readonly fileService: FileService) {}

  @Get(':filename')
  streamImage(
    @Param('filename') filename: string,
    @Res() res: express.Response
  ) {
    const filePath = this.fileService.findFileByBaseName(filename);

    if (!filePath) {
      this.logger.warn(`${filename} not found`);
      throw new NotFoundException(`${filename} not found`);
    }

    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(this.fileService.baseDir)) {
      this.logger.warn('Client tried to access an invalid path');
      throw new ForbiddenException('Invalid path');
    }

    if (!fs.existsSync(resolvedPath) || !fs.statSync(resolvedPath).isFile()) {
      this.logger.warn(`${filename} not found`);
      throw new NotFoundException(`${filename} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const lookup = mime.lookup as (path: string) => string | false;
    let mimeType = lookup(filePath);

    if (mimeType === null || mimeType === undefined || mimeType === false) {
      mimeType = 'application/octet-stream';
    }
    res.setHeader('Content-Type', mimeType);

    fs.createReadStream(filePath).pipe(res);
  }
}
