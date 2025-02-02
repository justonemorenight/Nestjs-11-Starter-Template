import { Injectable } from '@nestjs/common';
import {
  HealthCheckService as TerminusHealthCheck,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthCheckService {
  constructor(
    private health: TerminusHealthCheck,
    private http: HttpHealthIndicator,
  ) {}

  async check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
}
