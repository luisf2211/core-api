// src/core/persons/persons.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PersonRepository } from './persons.repository';
import { PersonDto } from './dtos/person.dto';
import { CreatePersonDto } from './dtos/create-person.dto';

@Injectable()
export class PersonsService {
  constructor(private readonly personRepo: PersonRepository) {}

  async getAll(): Promise<PersonDto[]> {
    return this.personRepo.findAll();
  }

  async getById(id: string): Promise<PersonDto> {
    const person = await this.personRepo.findById(id);
    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    return person;
  }

  async create(input: CreatePersonDto): Promise<any> {
    return this.personRepo.create(input);
  }

  async update(id: string, input: Partial<CreatePersonDto>): Promise<void> {
    const existing = await this.personRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    await this.personRepo.update(id, input);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.personRepo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }
    await this.personRepo.delete(id);
  }
}
