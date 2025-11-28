// src/core/persons/persons.repository.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoRepository } from '../../infra/db/core.repo';
// import { PersonDto } from './dto/person.dto';
import { ObjectId, Collection } from 'mongodb';
import { PersonDto } from './dtos/person.dto';

@Injectable()
export class PersonRepository extends MongoRepository implements OnModuleInit {
  private collection: Collection<PersonDto>; // ✅ Declaración sin inicializar

  async onModuleInit() {
    await MongoRepository.connect(); // ✅ conecta primero
    this.collection = this.getCollection('persons'); // ✅ ahora sí
  }

  async findById(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async findAll() {
    return this.collection.find().toArray();
  }

  async create(data: Omit<PersonDto, '_id'>) {
    const result = await this.collection.insertOne(data);
    return { _id: result.insertedId };
  }

  async update(id: string, data: Partial<PersonDto>) {
    await this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  }

  async delete(id: string) {
    await this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}
