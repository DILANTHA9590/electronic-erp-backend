import { Injectable } from '@nestjs/common';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';

@Injectable()
export class HealthService {
  create(createHealthDto: CreateHealthDto) {

  //   const [db, redis, rabbit] = await Promise.allSettled([
  //   this.checkDatabase(),
  //   this.checkRedis(),
  //   this.checkRabbitMQ(),
  // ]);

  // return {
  //   database: db.status,
  //   redis: redis.status,
  //   rabbitmq: rabbit.status,
  // };
    
 
  }

  
}
