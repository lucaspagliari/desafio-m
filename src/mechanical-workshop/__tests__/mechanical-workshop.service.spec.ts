import { Test, TestingModule } from '@nestjs/testing';
import { MechanicalWorkshopService } from '../mechanical-workshop.service';
import { Connection, connect, Model } from 'mongoose';
import {
  MechanicalWorkshop,
  MechanicalWorkshopSchema,
} from '../schemas/mechanical-workshop.schema';
import { getModelToken } from '@nestjs/mongoose';
import { CreateMechanicalWorkshopDto } from '../dto/create-mechanical-workshop.dto';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('MechanicalWorkshopController', () => {
  let db: MongoMemoryServer;
  let dbConnection: Connection;
  let service: MechanicalWorkshopService;
  let model: Model<MechanicalWorkshop>;
  let workshop = {
    name: 'Polotto Automóveis',
    address: 'Avenida Martins',
    location: {
      coordinates: [-46.8698724, -23.205374],
    },
  };
  beforeAll(async () => {
    db = await MongoMemoryServer.create();
    dbConnection = (await connect(db.getUri())).connection;

    model = dbConnection.model(
      MechanicalWorkshop.name,
      MechanicalWorkshopSchema,
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MechanicalWorkshopService,
        {
          provide: getModelToken(MechanicalWorkshop.name),
          useValue: model,
        },
      ],
    }).compile();

    service = module.get<MechanicalWorkshopService>(MechanicalWorkshopService);
    model = module.get<Model<MechanicalWorkshop>>(
      getModelToken(MechanicalWorkshop.name),
    );
  });
  afterAll(async () => {
    await dbConnection.dropDatabase();
    await dbConnection.close();
    await db.stop();
  });

  it('should create mechanical workshop', async () => {
    const item = await service.create(workshop as CreateMechanicalWorkshopDto);
    const result = model.findById(item.id);
    expect(result).toBeDefined();
  });

  it('should list all mechanical workshop', async () => {
    const result = await service.findAll();
    const modelResult = await model.find()
    expect(result).toHaveLength(modelResult.length);
  });

  it('should list one mechanical workshop', async () => {
    const item = await service.create(workshop as CreateMechanicalWorkshopDto);
    const result = await service.findOne(item.id);
    expect(result).toBeDefined();
  });

  it('should list one mechanical workshop', async () => {
    const item = await service.create(workshop as CreateMechanicalWorkshopDto);
    const result = await service.findOne(item.id);
    
    expect(result).toBeDefined();
  });

  it('should update mechanical workshop', async () => {
    const item = await service.create(workshop as CreateMechanicalWorkshopDto);
    await service.remove(item.id);
    const result = await model.findById(item.id);
    expect(result).toBeNull();
  });
});
