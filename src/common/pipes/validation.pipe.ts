import { ValidationPipe } from '@nestjs/common';

export const GlobalValidationPipe = new ValidationPipe({
  whitelist: true, // Remove properties not defined in DTO
  transform: true, // Auto transform types
  transformOptions: {
    enableImplicitConversion: true, // Allow implicit type conversion
  },
  forbidNonWhitelisted: true, // Throw error if properties are not defined
});
