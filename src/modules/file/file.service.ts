import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  public readonly baseDir = path.join(process.cwd(), 'storage');

  findFileByBaseName(requestedName: string): string | null {
    const safeRequestedName = path.basename(requestedName);

    const files = fs.readdirSync(this.baseDir);

    const match = files.find((file) =>
      file.match(new RegExp(`^${safeRequestedName}`))
    );

    return match ? path.join(this.baseDir, match) : null;
  }
}
