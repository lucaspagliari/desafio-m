import { Test, TestingModule } from '@nestjs/testing';
import { MechanicalWorkshopController } from '../mechanical-workshop.controller';
import { MechanicalWorkshopService } from '../mechanical-workshop.service';
import { CreateMechanicalWorkshopDto } from '../dto/create-mechanical-workshop.dto';
import { UpdateMechanicalWorkshopDto } from '../dto/update-mechanical-workshop.dto';

describe('MechanicalWorkshopController', () => {
  let controller: MechanicalWorkshopController;
  let service: MechanicalWorkshopService

  const workshop = 	{
    "name": "Polotto Automóveis",
    "address": "Avenida Martins",
		"location": {
			"coordinates": [
				-46.8698724,
				-23.205374
			]
		},
	}
  const mockService = {
    create: jest.fn().mockReturnValue(workshop),
    findAll: jest.fn().mockReturnValue([workshop]),
    findOne: jest.fn().mockReturnValue(workshop),
    update: jest.fn().mockReturnValue(workshop),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MechanicalWorkshopController],
      providers: [ {
        provide: MechanicalWorkshopService,
        useValue: mockService 
      }],

    }).compile();

    controller = module.get<MechanicalWorkshopController>(MechanicalWorkshopController);
    service = module.get<MechanicalWorkshopService>(MechanicalWorkshopService);
  });

  it('should create mechanical workshop', async () => {
    const output = await controller.create(workshop as CreateMechanicalWorkshopDto)

    expect(service.create).toHaveBeenCalled()
    expect(service.create).toHaveBeenCalledWith(workshop)
    expect(output).toEqual(workshop)
  });

  it('should find all mechanical workshop', async () => {
    const output = await controller.findAll()

    expect(output).toHaveLength(1)
    expect(output).toContain(workshop)
    expect(service.findAll).toHaveBeenCalled()
  });

  it('should find one mechanical workshop', async () => {
    const id = Math.random().toString()
    const output = await controller.findOne(id)
    
    expect(output).toEqual(workshop)
    expect(service.findOne).toHaveBeenCalled()
    expect(service.findOne).toHaveBeenCalledWith(id)
  });
  
  it('should update mechanical workshop', async () => {
    const id = Math.random().toString()
    const output = await controller.update(id, workshop as UpdateMechanicalWorkshopDto)

    expect(output).toEqual(workshop)
    expect(service.update).toHaveBeenCalled()
    expect(service.update).toHaveBeenCalledWith(id, workshop)
  });

  it('should remove mechanical workshop', async () => {
    const id = Math.random().toString()
    const output = await controller.remove(id)

    expect(output).toBeFalsy()
    expect(service.remove).toHaveBeenCalled()
    expect(service.remove).toHaveBeenCalledWith(id)
  });
});
