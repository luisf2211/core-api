import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './core/auth/auth.controller';
import { AuthService } from './core/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { BasicAuthMiddleware } from './common/middleware/basic-auth.middleware';
import { BearerAuthMiddleware } from './common/middleware/bearer-auth.middleware';
import { PersonsController } from './core/persons/persons.controller';
import { PersonsService } from './core/persons/persons.service';
import { PersonRepository } from './core/persons/persons.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AuthController, PersonsController],
  providers: [AuthService, PersonsService, PersonRepository],
  exports: [PersonRepository],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BasicAuthMiddleware).forRoutes('auth/login');
    consumer.apply(BearerAuthMiddleware).forRoutes('persons', 'person');
  }
}
