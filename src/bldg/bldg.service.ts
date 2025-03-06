import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bldg } from './bldg.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BldgService {
  constructor(
    @InjectRepository(Bldg)
    private bldgRepository: Repository<Bldg>,
  ) {}

  async findAll(): Promise<Bldg[]> {
    return this.bldgRepository.find();
  }

  async findNearBy(x: number, y: number, radius: number): Promise<Bldg[]> {
    return this.bldgRepository
      .createQueryBuilder('bldg')
      .where(
        `
          ST_Distance(
            ST_SetSRID(ST_MakePoint(:x, :y), 4326)::geography,
            bldg.bldg_geom::geography
          ) <= :radius
        `,
        { x, y, radius },
      )
      .getMany();
  }
}
