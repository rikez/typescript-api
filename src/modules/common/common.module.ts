import { Module } from '@nestjs/common';
import { OneSignalService } from './services/onesignal.service';

@Module({
  components: [OneSignalService],
  exports: [OneSignalService]
})
export class CommonModule {}


