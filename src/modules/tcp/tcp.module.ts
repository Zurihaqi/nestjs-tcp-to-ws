import { Module } from '@nestjs/common';
import { TcpService } from './tcp.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [TcpService]
})
export class TcpModule {}
